"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmbossResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const fetch_service_1 = require("../../fetch/fetch.service");
const appConstants_1 = require("../../../utils/appConstants");
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const cookie_1 = __importDefault(require("cookie"));
const amboss_types_1 = require("./amboss.types");
const config_1 = require("@nestjs/config");
const async_1 = require("../../../utils/async");
const node_service_1 = require("../../node/node.service");
const security_types_1 = require("../../security/security.types");
const security_decorators_1 = require("../../security/security.decorators");
const amboss_gql_1 = require("./amboss.gql");
const amboss_service_1 = require("./amboss.service");
const ONE_MONTH_SECONDS = 60 * 60 * 24 * 30;
let AmbossResolver = class AmbossResolver {
    constructor(nodeService, configService, fetchService, ambossService, logger) {
        this.nodeService = nodeService;
        this.configService = configService;
        this.fetchService = fetchService;
        this.ambossService = ambossService;
        this.logger = logger;
    }
    async getAmbossUser({ ambossAuth }) {
        if (!ambossAuth)
            return null;
        const { data, error } = await this.fetchService.graphqlFetchWithProxy(this.configService.get('urls.amboss'), amboss_gql_1.getUserQuery, undefined, {
            authorization: `Bearer ${ambossAuth}`,
        });
        if (!(data === null || data === void 0 ? void 0 : data.getUser) || error) {
            return null;
        }
        return data.getUser;
    }
    async getAmbossLoginToken({ ambossAuth }) {
        const { data, error } = await this.fetchService.graphqlFetchWithProxy(this.configService.get('urls.amboss'), amboss_gql_1.getLoginTokenQuery, { seconds: ONE_MONTH_SECONDS }, {
            authorization: ambossAuth ? `Bearer ${ambossAuth}` : '',
        });
        if (!(data === null || data === void 0 ? void 0 : data.getLoginToken) || error) {
            throw new Error('Error getting login token from Amboss');
        }
        return data.getLoginToken;
    }
    async getLightningAddresses() {
        const { data, error } = await this.fetchService.graphqlFetchWithProxy(this.configService.get('urls.amboss'), amboss_gql_1.getLightningAddresses);
        if (!(data === null || data === void 0 ? void 0 : data.getLightningAddresses) || error) {
            if (error) {
                this.logger.error(error);
            }
            throw new Error('Error getting Lightning Addresses from Amboss');
        }
        return data.getLightningAddresses;
    }
    async getNodeSocialInfo(pubkey, { ambossAuth }) {
        const { data, error } = await this.fetchService.graphqlFetchWithProxy(this.configService.get('urls.amboss'), amboss_gql_1.getNodeSocialInfo, { pubkey }, {
            authorization: ambossAuth ? `Bearer ${ambossAuth}` : '',
        });
        if (!(data === null || data === void 0 ? void 0 : data.getNode) || error) {
            if (error) {
                this.logger.error(error);
            }
            throw new Error('Error getting node information from Amboss');
        }
        return data.getNode;
    }
    async loginAmboss({ res }, user) {
        const { data, error } = await this.fetchService.graphqlFetchWithProxy(this.configService.get('urls.amboss'), amboss_gql_1.getSignInfoQuery);
        if (!(data === null || data === void 0 ? void 0 : data.getSignInfo) || error) {
            if (error) {
                this.logger.error(error);
            }
            throw new Error('Error getting login information from Amboss');
        }
        const [message, signError] = await (0, async_1.toWithError)(this.nodeService.signMessage(user.id, data.getSignInfo.message));
        if (!(message === null || message === void 0 ? void 0 : message.signature) || signError) {
            if (signError) {
                this.logger.error(signError);
            }
            throw new Error('Error signing message to login');
        }
        this.logger.debug('Signed Amboss login message');
        const { identifier } = data.getSignInfo;
        const params = {
            details: 'ThunderHub',
            identifier,
            signature: message.signature,
            token: true,
            seconds: ONE_MONTH_SECONDS,
        };
        const { data: loginData, error: loginError } = await this.fetchService.graphqlFetchWithProxy(this.configService.get('urls.amboss'), amboss_gql_1.loginMutation, params);
        if (!loginData.login || loginError) {
            if (loginError) {
                this.logger.silly(`Error logging into Amboss: ${loginError}`);
            }
            throw new Error('Error logging into Amboss');
        }
        this.logger.debug('Got Amboss login token');
        res.setHeader('Set-Cookie', cookie_1.default.serialize(appConstants_1.appConstants.ambossCookieName, loginData.login, {
            maxAge: ONE_MONTH_SECONDS,
            httpOnly: true,
            sameSite: true,
            path: '/',
        }));
        return true;
    }
    async pushBackup({ id }) {
        const backups = await this.nodeService.getBackups(id);
        const { signature } = await this.nodeService.signMessage(id, backups.backup);
        await this.ambossService.pushBackup(backups.backup, signature);
        return true;
    }
};
__decorate([
    (0, graphql_1.Query)(() => amboss_types_1.AmbossUser, { nullable: true }),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AmbossResolver.prototype, "getAmbossUser", null);
__decorate([
    (0, graphql_1.Query)(() => String),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AmbossResolver.prototype, "getAmbossLoginToken", null);
__decorate([
    (0, graphql_1.Query)(() => [amboss_types_1.LightningAddress]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AmbossResolver.prototype, "getLightningAddresses", null);
__decorate([
    (0, graphql_1.Query)(() => amboss_types_1.LightningNodeSocialInfo),
    __param(0, (0, graphql_1.Args)('pubkey')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AmbossResolver.prototype, "getNodeSocialInfo", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], AmbossResolver.prototype, "loginAmboss", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], AmbossResolver.prototype, "pushBackup", null);
AmbossResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __param(4, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [node_service_1.NodeService,
        config_1.ConfigService,
        fetch_service_1.FetchService,
        amboss_service_1.AmbossService,
        winston_1.Logger])
], AmbossResolver);
exports.AmbossResolver = AmbossResolver;
//# sourceMappingURL=amboss.resolver.js.map
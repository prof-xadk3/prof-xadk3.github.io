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
exports.LnMarketsResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const nest_winston_1 = require("nest-winston");
const appConstants_1 = require("../../../utils/appConstants");
const node_service_1 = require("../../node/node.service");
const security_decorators_1 = require("../../security/security.decorators");
const security_types_1 = require("../../security/security.types");
const lnmarkets_service_1 = require("./lnmarkets.service");
const cookie_1 = __importDefault(require("cookie"));
const lnurl_types_1 = require("../lnurl/lnurl.types");
const lnmarkets_types_1 = require("./lnmarkets.types");
const config_1 = require("@nestjs/config");
let LnMarketsResolver = class LnMarketsResolver {
    constructor(configService, nodeService, lnmarketsService, logger) {
        this.configService = configService;
        this.nodeService = nodeService;
        this.lnmarketsService = lnmarketsService;
        this.logger = logger;
    }
    async getLnMarketsUrl(user, { lnMarketsAuth }) {
        const { cookieString } = await this.lnmarketsService.getLnMarketsAuth(user.id, lnMarketsAuth);
        if (!cookieString) {
            this.logger.error('Error getting auth cookie from lnmarkets');
            throw new Error('ProblemAuthenticatingWithLnMarkets');
        }
        return `${this.configService.get('urls.lnMarketsExchange')}/login/token?token=${cookieString}`;
    }
    async getLnMarketsStatus({ lnMarketsAuth }) {
        if (!lnMarketsAuth) {
            return 'out';
        }
        const json = await this.lnmarketsService.getUser(lnMarketsAuth);
        this.logger.debug('Get userInfo from LnMarkets', { json });
        if ((json === null || json === void 0 ? void 0 : json.code) === 'jwtExpired') {
            return 'out';
        }
        return 'in';
    }
    async getLnMarketsUserInfo({ lnMarketsAuth }) {
        if (!lnMarketsAuth) {
            this.logger.debug('Not authenticated on LnMarkets');
            throw new Error('NotAuthenticated');
        }
        const json = await this.lnmarketsService.getUser(lnMarketsAuth);
        this.logger.debug('Get userInfo from LnMarkets', { json });
        if ((json === null || json === void 0 ? void 0 : json.code) === 'jwtExpired') {
            this.logger.debug('Token for LnMarkets is expired');
            throw new Error('NotAuthenticated');
        }
        return json;
    }
    async lnMarketsDeposit(user, { lnMarketsAuth }, amount) {
        const { cookieString } = await this.lnmarketsService.getLnMarketsAuth(user.id, lnMarketsAuth);
        if (!cookieString) {
            this.logger.error('Error getting auth cookie from lnmarkets');
            throw new Error('ProblemAuthenticatingWithLnMarkets');
        }
        const info = await this.lnmarketsService.getDepositInvoice(cookieString, amount);
        this.logger.debug('Response from lnmarkets', { info });
        if (!(info === null || info === void 0 ? void 0 : info.paymentRequest)) {
            this.logger.error('Error getting deposit invoice from lnmarkets');
            throw new Error('ProblemGettingDepositInvoiceFromLnMarkets');
        }
        const decoded = await this.nodeService.decodePaymentRequest(user.id, info.paymentRequest);
        this.logger.debug('Decoded invoice from lnMarkets', { decoded });
        if (amount !== decoded.tokens) {
            this.logger.error(`Tokens in LnMarkets invoice ${decoded.tokens} is different to requested ${amount}`);
            throw new Error('WrongAmountInLnMarketsInvoice');
        }
        await this.nodeService.pay(user.id, { request: info.paymentRequest });
        return true;
    }
    async lnMarketsWithdraw(user, { lnMarketsAuth }, amount) {
        const { cookieString } = await this.lnmarketsService.getLnMarketsAuth(user.id, lnMarketsAuth);
        if (!cookieString) {
            this.logger.error('Error getting auth cookie from lnmarkets');
            throw new Error('ProblemAuthenticatingWithLnMarkets');
        }
        const invoice = await this.nodeService.createInvoice(user.id, {
            description: 'LnMarkets Withdraw',
            tokens: amount,
        });
        const response = await this.lnmarketsService.withdraw(cookieString, amount, invoice.request);
        this.logger.debug('Withdraw request from LnMarkets', { response });
        return true;
    }
    async lnMarketsLogin(user, { res }) {
        const { cookieString, json } = await this.lnmarketsService.getLnMarketsAuth(user.id);
        if (!json || !cookieString) {
            throw new Error('ProblemAuthenticatingWithLnMarkets');
        }
        if (json.status === 'ERROR') {
            return Object.assign(Object.assign({}, json), { message: json.reason || 'LnServiceError' });
        }
        res.setHeader('Set-Cookie', cookie_1.default.serialize(appConstants_1.appConstants.lnMarketsAuth, cookieString, {
            httpOnly: true,
            sameSite: true,
            path: '/',
        }));
        return Object.assign(Object.assign({}, json), { message: 'LnMarketsAuthSuccess' });
    }
    async lnMarketsLogout({ res }) {
        res.setHeader('Set-Cookie', cookie_1.default.serialize(appConstants_1.appConstants.lnMarketsAuth, '', {
            maxAge: -1,
            httpOnly: true,
            sameSite: true,
            path: '/',
        }));
        return true;
    }
};
__decorate([
    (0, graphql_1.Query)(() => String),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId, Object]),
    __metadata("design:returntype", Promise)
], LnMarketsResolver.prototype, "getLnMarketsUrl", null);
__decorate([
    (0, graphql_1.Query)(() => String),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LnMarketsResolver.prototype, "getLnMarketsStatus", null);
__decorate([
    (0, graphql_1.Query)(() => lnmarkets_types_1.LnMarketsUserInfo),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LnMarketsResolver.prototype, "getLnMarketsUserInfo", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Context)()),
    __param(2, (0, graphql_1.Args)('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId, Object, Number]),
    __metadata("design:returntype", Promise)
], LnMarketsResolver.prototype, "lnMarketsDeposit", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Context)()),
    __param(2, (0, graphql_1.Args)('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId, Object, Number]),
    __metadata("design:returntype", Promise)
], LnMarketsResolver.prototype, "lnMarketsWithdraw", null);
__decorate([
    (0, graphql_1.Mutation)(() => lnurl_types_1.AuthResponse),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId, Object]),
    __metadata("design:returntype", Promise)
], LnMarketsResolver.prototype, "lnMarketsLogin", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LnMarketsResolver.prototype, "lnMarketsLogout", null);
LnMarketsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __param(3, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        node_service_1.NodeService,
        lnmarkets_service_1.LnMarketsService,
        common_1.Logger])
], LnMarketsResolver);
exports.LnMarketsResolver = LnMarketsResolver;
//# sourceMappingURL=lnmarkets.resolver.js.map
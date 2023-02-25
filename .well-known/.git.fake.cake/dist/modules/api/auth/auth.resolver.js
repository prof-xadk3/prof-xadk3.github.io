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
exports.AuthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const accounts_service_1 = require("../../accounts/accounts.service");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const files_service_1 = require("../../files/files.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie_1 = __importDefault(require("cookie"));
const appConstants_1 = require("../../../utils/appConstants");
const node_service_1 = require("../../node/node.service");
const async_1 = require("../../../utils/async");
const crypto_1 = require("../../../utils/crypto");
const security_decorators_1 = require("../../security/security.decorators");
const security_types_1 = require("../../security/security.types");
const otplib_1 = require("otplib");
const string_1 = require("../../../utils/string");
const auth_types_1 = require("./auth.types");
const throttler_1 = require("@nestjs/throttler");
let AuthResolver = class AuthResolver {
    constructor(configService, accountsService, filesService, nodeService, logger) {
        this.configService = configService;
        this.accountsService = accountsService;
        this.filesService = filesService;
        this.nodeService = nodeService;
        this.logger = logger;
    }
    async getTwofaSecret({ id }) {
        const account = this.accountsService.getAccount(id);
        if (!account) {
            throw new Error('Account not found');
        }
        if (!!account.twofaSecret) {
            throw new Error('2FA is already enabled for this account.');
        }
        if (account.hash === 'sso') {
            throw new Error('2FA can not be enabled for SSO accounts');
        }
        const node = await this.nodeService.getWalletInfo(id);
        const secret = otplib_1.authenticator.generateSecret();
        const otpauth = otplib_1.authenticator.keyuri((0, string_1.shorten)(node.public_key), 'ThunderHub', secret);
        return { url: otpauth, secret };
    }
    async updateTwofaSecret({ id }, secret, token) {
        const account = this.accountsService.getAccount(id);
        if (!account) {
            throw new Error('Account not found');
        }
        if (!!account.twofaSecret) {
            throw new Error('2FA is already enabled for this account.');
        }
        if (account.hash === 'sso') {
            throw new Error('2FA can not be enabled for SSO accounts');
        }
        try {
            otplib_1.authenticator.options = { window: 1 };
            const isValid = otplib_1.authenticator.verify({ token, secret });
            if (!isValid) {
                throw new Error();
            }
        }
        catch (error) {
            this.logger.error('Error validating token', { error });
            throw new Error('Error validating token');
        }
        const accountConfigPath = this.configService.get('accountConfigPath');
        await this.filesService.updateTwofaSecret(accountConfigPath, account.index, secret);
        this.accountsService.updateAccountSecret(id, secret);
        return true;
    }
    async removeTwofaSecret({ id }, token) {
        const account = this.accountsService.getAccount(id);
        if (!account) {
            throw new Error('Account not found');
        }
        if (!account.twofaSecret) {
            throw new Error('2FA is not enabled for this account.');
        }
        try {
            otplib_1.authenticator.options = { window: 1 };
            const isValid = otplib_1.authenticator.verify({
                token,
                secret: account.twofaSecret,
            });
            if (!isValid) {
                throw new Error();
            }
        }
        catch (error) {
            this.logger.error('Error validating token', { error });
            throw new Error('Error validating token');
        }
        const accountConfigPath = this.configService.get('accountConfigPath');
        await this.filesService.updateTwofaSecret(accountConfigPath, account.index, '');
        this.accountsService.updateAccountSecret(id, '');
        return true;
    }
    async getAuthToken(cookie, { res }) {
        const dangerousNoSSOAuth = this.configService.get('sso.dangerousNoSSOAuth');
        const cookiePath = this.configService.get('cookiePath');
        const isProduction = this.configService.get('isProduction');
        const ssoAccount = this.accountsService.getAccount('sso');
        if (!ssoAccount) {
            this.logger.warn('No SSO account available');
            return false;
        }
        if (dangerousNoSSOAuth) {
            this.logger.warn('SSO authentication is disabled. Make sure this is what you want.');
        }
        else {
            if (!cookie) {
                return false;
            }
            if (cookiePath === '') {
                this.logger.warn('SSO auth not available since no cookie path was provided');
                return false;
            }
        }
        if (!isProduction) {
            this.logger.warn('SSO authentication is disabled in development.');
        }
        const cookieFile = this.filesService.readCookie();
        if ((cookieFile && cookieFile.trim() === cookie.trim()) ||
            !isProduction ||
            dangerousNoSSOAuth) {
            this.filesService.refreshCookie();
            const [, error] = await (0, async_1.toWithError)(this.nodeService.getWalletInfo(ssoAccount.hash));
            if (error) {
                this.logger.error('Unable to connect to this node', { error });
                throw new Error('UnableToConnectToThisNode');
            }
            const jwtSecret = this.configService.get('jwtSecret');
            const token = jsonwebtoken_1.default.sign({ sub: 'sso' }, jwtSecret);
            res.setHeader('Set-Cookie', cookie_1.default.serialize(appConstants_1.appConstants.cookieName, token, {
                httpOnly: true,
                sameSite: true,
                path: '/',
            }));
            return true;
        }
        this.logger.debug(`Cookie ${cookie} different to file ${cookieFile}`);
        return false;
    }
    async getSessionToken(id, password, token, ip, { res }) {
        const account = this.accountsService.getAccount(id);
        if (!account) {
            this.logger.debug(`Account ${id} not found`);
            throw new Error('Wrong credentials for login');
        }
        const isProduction = this.configService.get('isProduction');
        const disable2FA = this.configService.get('disable2FA');
        if (account.encrypted) {
            if (!isProduction) {
                const message = 'Encrypted accounts only work in a production environment';
                this.logger.error(message);
                throw new Error(message);
            }
            const macaroon = (0, crypto_1.decodeMacaroon)(account.encryptedMacaroon, password);
            this.accountsService.updateAccountMacaroon(id, macaroon);
            this.logger.debug(`Decrypted the macaroon for account ${id}`);
        }
        else {
            if (!(0, crypto_1.isCorrectPassword)(password, account.password)) {
                this.logger.error(`Authentication failed from ip: ${ip} - Invalid Password!`);
                throw new Error('Wrong credentials for login');
            }
            this.logger.debug(`Correct password for account ${id}`);
        }
        if (account.twofaSecret && !disable2FA) {
            if (!token) {
                this.logger.error('No 2FA token provided but is needed');
                throw new Error('Wrong credentials for login');
            }
            try {
                otplib_1.authenticator.options = { window: 1 };
                const isValid = otplib_1.authenticator.verify({
                    token,
                    secret: account.twofaSecret,
                });
                if (!isValid) {
                    throw new Error('token not valid');
                }
            }
            catch (err) {
                this.logger.error('Error verifying token validity', { err });
                throw new Error('Wrong credentials for login');
            }
        }
        const [info, error] = await (0, async_1.toWithError)(this.nodeService.getWalletInfo(account.hash));
        if (error) {
            this.logger.error('Unable to connect to this node', { error });
            throw new Error('UnableToConnectToThisNode');
        }
        const jwtSecret = this.configService.get('jwtSecret');
        const jwtToken = jsonwebtoken_1.default.sign({ sub: id }, jwtSecret);
        res.setHeader('Set-Cookie', cookie_1.default.serialize(appConstants_1.appConstants.cookieName, jwtToken, {
            httpOnly: true,
            sameSite: true,
            path: '/',
        }));
        return (info === null || info === void 0 ? void 0 : info['version']) || '';
    }
    async logout({ res }) {
        const cookies = [];
        for (const cookieName in appConstants_1.appConstants) {
            if (Object.prototype.hasOwnProperty.call(appConstants_1.appConstants, cookieName)) {
                const name = appConstants_1.appConstants[cookieName];
                cookies.push(cookie_1.default.serialize(name, '', {
                    maxAge: -1,
                    httpOnly: true,
                    sameSite: true,
                    path: '/',
                }));
            }
        }
        res.setHeader('Set-Cookie', cookies);
        return true;
    }
};
__decorate([
    (0, graphql_1.Query)(() => auth_types_1.TwofaResult),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getTwofaSecret", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('secret')),
    __param(2, (0, graphql_1.Args)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId, String, String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "updateTwofaSecret", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId, String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "removeTwofaSecret", null);
__decorate([
    (0, security_decorators_1.Public)(),
    (0, throttler_1.Throttle)(4, 10),
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('cookie', { nullable: true })),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getAuthToken", null);
__decorate([
    (0, security_decorators_1.Public)(),
    (0, throttler_1.Throttle)(4, 10),
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('password')),
    __param(2, (0, graphql_1.Args)('token', { nullable: true })),
    __param(3, (0, security_decorators_1.CurrentIp)()),
    __param(4, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getSessionToken", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "logout", null);
AuthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __param(4, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        accounts_service_1.AccountsService,
        files_service_1.FilesService,
        node_service_1.NodeService,
        winston_1.Logger])
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=auth.resolver.js.map
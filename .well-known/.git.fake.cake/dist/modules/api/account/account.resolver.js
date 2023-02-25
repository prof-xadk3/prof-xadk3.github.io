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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const accounts_service_1 = require("../../accounts/accounts.service");
const security_decorators_1 = require("../../security/security.decorators");
const account_types_1 = require("./account.types");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const common_1 = require("@nestjs/common");
const security_types_1 = require("../../security/security.types");
const throttler_1 = require("@nestjs/throttler");
let AccountResolver = class AccountResolver {
    constructor(accountsService, logger) {
        this.accountsService = accountsService;
        this.logger = logger;
    }
    async getAccount(user) {
        const currentAccount = this.accountsService.getAccount(user.id);
        if (!currentAccount) {
            this.logger.error(`No account found for id ${user.id}`);
            throw new Error('NoAccountFound');
        }
        if (user.id === 'sso') {
            return {
                name: 'SSO Account',
                id: 'sso',
                loggedIn: true,
                type: 'sso',
                twofaEnabled: false,
            };
        }
        return {
            name: currentAccount.name,
            id: user.id,
            loggedIn: true,
            type: 'server',
            twofaEnabled: !!currentAccount.twofaSecret,
        };
    }
    async getServerAccounts({ authToken }) {
        const currentAccount = this.accountsService.getAccount(authToken === null || authToken === void 0 ? void 0 : authToken.sub);
        const accounts = this.accountsService.getAllAccounts();
        const mapped = [];
        for (const key in accounts) {
            if (Object.prototype.hasOwnProperty.call(accounts, key)) {
                const account = accounts[key];
                const { name, hash } = account;
                if ((currentAccount === null || currentAccount === void 0 ? void 0 : currentAccount.hash) === 'sso' || key !== 'sso') {
                    mapped.push({
                        name,
                        id: hash,
                        loggedIn: (currentAccount === null || currentAccount === void 0 ? void 0 : currentAccount.hash) === key,
                        type: key === 'sso' ? 'sso' : 'server',
                        twofaEnabled: false,
                    });
                }
            }
        }
        return mapped;
    }
};
__decorate([
    (0, graphql_1.Query)(() => account_types_1.ServerAccount),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "getAccount", null);
__decorate([
    (0, security_decorators_1.Public)(),
    (0, throttler_1.Throttle)(4, 10),
    (0, graphql_1.Query)(() => [account_types_1.ServerAccount]),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "getServerAccounts", null);
AccountResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [accounts_service_1.AccountsService,
        winston_1.Logger])
], AccountResolver);
exports.AccountResolver = AccountResolver;
//# sourceMappingURL=account.resolver.js.map
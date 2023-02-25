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
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const files_service_1 = require("../files/files.service");
const lightning_1 = require("lightning");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
let AccountsService = class AccountsService {
    constructor(configService, filesService, logger) {
        this.configService = configService;
        this.filesService = filesService;
        this.logger = logger;
        this.accounts = {};
    }
    async onModuleInit() {
        this.filesService.readCookie();
        const macaroonPath = this.configService.get('sso.macaroonPath');
        const certPath = this.configService.get('sso.certPath');
        const accountConfigPath = this.configService.get('accountConfigPath');
        const ssoUrl = this.configService.get('sso.serverUrl');
        const ssoMacaroon = this.filesService.readMacaroons(macaroonPath);
        const ssoCert = this.filesService.readFile(certPath);
        if (ssoUrl && ssoMacaroon) {
            if (!ssoCert) {
                this.logger.warning('No certificate provided for SSO account. Make sure you do not need it to connect.');
            }
            const sso = {
                index: 999,
                name: 'SSO Account',
                id: '',
                password: '',
                encrypted: false,
                encryptedMacaroon: '',
                macaroon: ssoMacaroon,
                socket: ssoUrl,
                cert: ssoCert,
                twofaSecret: '',
            };
            const { lnd } = (0, lightning_1.authenticatedLndGrpc)(sso);
            this.accounts['sso'] = Object.assign(Object.assign({}, sso), { hash: 'sso', lnd });
        }
        const accounts = this.filesService.getAccounts(accountConfigPath);
        if (!accounts.length)
            return;
        accounts.forEach(account => {
            const { socket, cert, macaroon } = account;
            const { lnd } = (0, lightning_1.authenticatedLndGrpc)({ socket, cert, macaroon });
            this.accounts[account.hash] = Object.assign(Object.assign({}, account), { lnd });
        });
    }
    getAccount(id) {
        if (!id)
            return null;
        return this.accounts[id] || null;
    }
    getAllAccounts() {
        return this.accounts;
    }
    updateAccountMacaroon(id, macaroon) {
        var _a;
        if ((_a = this.accounts) === null || _a === void 0 ? void 0 : _a[id]) {
            const { socket, cert } = this.accounts[id];
            const { lnd } = (0, lightning_1.authenticatedLndGrpc)({ socket, cert, macaroon });
            this.accounts[id].macaroon = macaroon;
            this.accounts[id].lnd = lnd;
        }
        else {
            this.logger.error(`Account not found to update macaroon`, { id });
        }
    }
    updateAccountSecret(id, secret) {
        var _a;
        if ((_a = this.accounts) === null || _a === void 0 ? void 0 : _a[id]) {
            this.accounts[id].twofaSecret = secret;
        }
        else {
            this.logger.error(`Account not found to update 2FA secret`, { id });
            throw new Error('Error updating 2FA for account.');
        }
    }
};
AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        files_service_1.FilesService,
        winston_1.Logger])
], AccountsService);
exports.AccountsService = AccountsService;
//# sourceMappingURL=accounts.service.js.map
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
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const accounts_service_1 = require("../accounts/accounts.service");
let AuthenticationService = class AuthenticationService {
    constructor(jwtService, accountsService, logger) {
        this.jwtService = jwtService;
        this.accountsService = accountsService;
        this.logger = logger;
    }
    async getUserFromAuthToken(token) {
        try {
            const payload = this.jwtService.verify(token);
            if (payload.sub) {
                const account = this.accountsService.getAccount(payload.sub);
                if (account) {
                    return payload.sub;
                }
            }
        }
        catch (error) {
            this.logger.error('Invalid token for authentication');
        }
    }
};
AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        accounts_service_1.AccountsService,
        winston_1.Logger])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=auth.service.js.map
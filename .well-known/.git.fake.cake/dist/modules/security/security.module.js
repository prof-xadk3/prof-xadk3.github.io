"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const core_1 = require("@nestjs/core");
const jwt_strategy_1 = require("./jwt.strategy");
const roles_guard_1 = require("./guards/roles.guard");
const graphql_guard_1 = require("./guards/graphql.guard");
const throttler_guard_1 = require("./guards/throttler.guard");
const throttler_1 = require("@nestjs/throttler");
let AuthenticationModule = class AuthenticationModule {
};
AuthenticationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt', session: true }),
            throttler_1.ThrottlerModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    ttl: config.get('throttler.ttl'),
                    limit: config.get('throttler.limit'),
                }),
            }),
        ],
        providers: [
            jwt_strategy_1.JwtStrategy,
            { provide: core_1.APP_GUARD, useClass: graphql_guard_1.GqlAuthGuard },
            { provide: core_1.APP_GUARD, useClass: roles_guard_1.RolesGuard },
            { provide: core_1.APP_GUARD, useClass: throttler_guard_1.GqlThrottlerGuard },
        ],
    })
], AuthenticationModule);
exports.AuthenticationModule = AuthenticationModule;
//# sourceMappingURL=security.module.js.map
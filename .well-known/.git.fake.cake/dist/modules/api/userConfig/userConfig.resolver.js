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
exports.UserConfigResolver = exports.UserConfigStateResolver = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const graphql_1 = require("@nestjs/graphql");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const userConfig_service_1 = require("./userConfig.service");
const userConfig_types_1 = require("./userConfig.types");
(0, graphql_1.registerEnumType)(userConfig_types_1.ConfigFields, { name: 'ConfigFields' });
let UserConfigStateResolver = class UserConfigStateResolver {
    constructor(userConfigService, configService, logger) {
        this.userConfigService = userConfigService;
        this.configService = configService;
        this.logger = logger;
    }
    backup_state() {
        const { backupsEnabled } = this.userConfigService.getConfig();
        const disabled = this.configService.get('subscriptions.disableBackups');
        if (disabled) {
            if (backupsEnabled) {
                this.logger.warn('Auto backups is enabled in the config file but disabled in the env file.');
            }
            return false;
        }
        return backupsEnabled;
    }
    healthcheck_ping_state() {
        const { healthCheckPingEnabled } = this.userConfigService.getConfig();
        const disabled = this.configService.get('amboss.disableHealthCheckPings');
        if (disabled) {
            if (healthCheckPingEnabled) {
                this.logger.warn('Auto backups is enabled in the config file but disabled in the env file.');
            }
            return false;
        }
        return healthCheckPingEnabled;
    }
    onchain_push_enabled() {
        const { onchainPushEnabled } = this.userConfigService.getConfig();
        const disabled = this.configService.get('amboss.disableBalancePushes');
        if (disabled) {
            if (onchainPushEnabled) {
                this.logger.warn('Balance pushes are enabled in the config file but disabled in the env file.');
            }
            return false;
        }
        return onchainPushEnabled;
    }
    channels_push_enabled() {
        const { channelPushEnabled } = this.userConfigService.getConfig();
        const disabled = this.configService.get('amboss.disableBalancePushes');
        if (disabled) {
            if (channelPushEnabled) {
                this.logger.warn('Balance pushes are enabled in the config file but disabled in the env file.');
            }
            return false;
        }
        return channelPushEnabled;
    }
    private_channels_push_enabled() {
        const { privateChannelPushEnabled } = this.userConfigService.getConfig();
        const disabled = this.configService.get('amboss.disableBalancePushes');
        if (disabled) {
            if (privateChannelPushEnabled) {
                this.logger.warn('Balance pushes are enabled in the config file but disabled in the env file.');
            }
            return false;
        }
        return privateChannelPushEnabled;
    }
};
__decorate([
    (0, graphql_1.ResolveField)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserConfigStateResolver.prototype, "backup_state", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserConfigStateResolver.prototype, "healthcheck_ping_state", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserConfigStateResolver.prototype, "onchain_push_enabled", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserConfigStateResolver.prototype, "channels_push_enabled", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserConfigStateResolver.prototype, "private_channels_push_enabled", null);
UserConfigStateResolver = __decorate([
    (0, graphql_1.Resolver)(userConfig_types_1.ConfigState),
    __param(2, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [userConfig_service_1.UserConfigService,
        config_1.ConfigService,
        winston_1.Logger])
], UserConfigStateResolver);
exports.UserConfigStateResolver = UserConfigStateResolver;
let UserConfigResolver = class UserConfigResolver {
    constructor(userConfigService, configService) {
        this.userConfigService = userConfigService;
        this.configService = configService;
    }
    async getConfigState() {
        return {};
    }
    async toggleConfig(field) {
        switch (field) {
            case userConfig_types_1.ConfigFields.BACKUPS: {
                const disabled = this.configService.get('subscriptions.disableBackups');
                if (disabled) {
                    throw new Error('Auto backups are disabled in the server.');
                }
                this.userConfigService.toggleAutoBackups();
                break;
            }
            case userConfig_types_1.ConfigFields.HEALTHCHECKS: {
                const disabled = this.configService.get('amboss.disableHealthCheckPings');
                if (disabled) {
                    throw new Error('Healthcheck pings are disabled in the server.');
                }
                this.userConfigService.toggleHealthCheckPing();
                break;
            }
            case userConfig_types_1.ConfigFields.ONCHAIN_PUSH:
            case userConfig_types_1.ConfigFields.CHANNELS_PUSH:
            case userConfig_types_1.ConfigFields.PRIVATE_CHANNELS_PUSH: {
                const disabled = this.configService.get('amboss.disableBalancePushes');
                if (disabled) {
                    throw new Error('Balance pushes are disabled in the server.');
                }
                switch (field) {
                    case userConfig_types_1.ConfigFields.ONCHAIN_PUSH:
                        this.userConfigService.toggleOnChainPush();
                        break;
                    case userConfig_types_1.ConfigFields.CHANNELS_PUSH:
                        this.userConfigService.toggleChannelPush();
                        break;
                    case userConfig_types_1.ConfigFields.PRIVATE_CHANNELS_PUSH:
                        this.userConfigService.togglePrivateChannelPush();
                        break;
                }
                break;
            }
        }
        return true;
    }
};
__decorate([
    (0, graphql_1.Query)(() => userConfig_types_1.ConfigState),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserConfigResolver.prototype, "getConfigState", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('field', { type: () => userConfig_types_1.ConfigFields })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserConfigResolver.prototype, "toggleConfig", null);
UserConfigResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [userConfig_service_1.UserConfigService,
        config_1.ConfigService])
], UserConfigResolver);
exports.UserConfigResolver = UserConfigResolver;
//# sourceMappingURL=userConfig.resolver.js.map
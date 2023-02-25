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
exports.UserConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const files_service_1 = require("../../files/files.service");
let UserConfigService = class UserConfigService {
    constructor(filesService, configService, logger) {
        this.filesService = filesService;
        this.configService = configService;
        this.logger = logger;
    }
    async onModuleInit() {
        this.config = this.getConfig();
    }
    getConfig() {
        const accountConfigPath = this.configService.get('accountConfigPath');
        const yaml = this.filesService.parseYaml(accountConfigPath);
        if (!yaml) {
            this.logger.info(`No account config file found at path ${accountConfigPath}`);
            return {
                backupsEnabled: false,
                healthCheckPingEnabled: false,
                onchainPushEnabled: false,
                channelPushEnabled: false,
                privateChannelPushEnabled: false,
            };
        }
        return {
            backupsEnabled: !!yaml.backupsEnabled,
            healthCheckPingEnabled: !!yaml.healthCheckPingEnabled,
            onchainPushEnabled: !!yaml.onchainPushEnabled,
            channelPushEnabled: !!yaml.channelPushEnabled,
            privateChannelPushEnabled: !!yaml.privateChannelPushEnabled,
        };
    }
    toggleValue(field) {
        const accountConfigPath = this.configService.get('accountConfigPath');
        if (!accountConfigPath) {
            this.logger.verbose('No config file path provided');
            throw new Error('Error enabling auto backups');
        }
        const accountConfig = this.filesService.parseYaml(accountConfigPath);
        if (!accountConfig) {
            this.logger.info(`No config file found at path ${accountConfigPath}`);
            throw new Error('Error enabling auto backups');
        }
        const currentStatus = accountConfig[field];
        const configCopy = Object.assign(Object.assign({}, accountConfig), { [field]: !currentStatus });
        this.config = configCopy;
        this.filesService.saveHashedYaml(configCopy, accountConfigPath);
    }
    togglePrivateChannelPush() {
        this.toggleValue('privateChannelPushEnabled');
    }
    toggleChannelPush() {
        this.toggleValue('channelPushEnabled');
    }
    toggleOnChainPush() {
        this.toggleValue('onchainPushEnabled');
    }
    toggleHealthCheckPing() {
        this.toggleValue('healthCheckPingEnabled');
    }
    toggleAutoBackups() {
        this.toggleValue('backupsEnabled');
    }
};
UserConfigService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [files_service_1.FilesService,
        config_1.ConfigService,
        winston_1.Logger])
], UserConfigService);
exports.UserConfigService = UserConfigService;
//# sourceMappingURL=userConfig.service.js.map
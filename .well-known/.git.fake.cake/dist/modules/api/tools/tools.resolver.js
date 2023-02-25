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
exports.ToolsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const node_service_1 = require("../../node/node.service");
const security_decorators_1 = require("../../security/security.decorators");
const security_types_1 = require("../../security/security.types");
let ToolsResolver = class ToolsResolver {
    constructor(nodeService, logger) {
        this.nodeService = nodeService;
        this.logger = logger;
    }
    async verifyBackups(backupString, { id }) {
        const { channels } = await this.nodeService.getChannels(id);
        if (!channels.length)
            throw new Error('No channels to verify found.');
        const channelInfo = channels.map(({ transaction_id, transaction_vout }) => ({
            transaction_id,
            transaction_vout,
        }));
        const { is_valid } = await this.nodeService.verifyBackups(id, {
            backup: backupString,
            channels: channelInfo,
        });
        return is_valid;
    }
    async verifyBackup(backup, { id }) {
        const { is_valid } = await this.nodeService.verifyBackup(id, backup);
        return is_valid;
    }
    async recoverFunds(backup, { id }) {
        await this.nodeService.recoverFundsFromChannels(id, backup);
        return true;
    }
    async getBackups({ id }) {
        const { backup } = await this.nodeService.getBackups(id);
        return backup;
    }
    async verifyMessage(message, signature, { id }) {
        const messageSignature = await this.nodeService.verifyMessage(id, message, signature);
        return messageSignature.signed_by;
    }
    async signMessage(message, { id }) {
        const signature = await this.nodeService.signMessage(id, message);
        return signature.signature;
    }
};
__decorate([
    (0, graphql_1.Query)(() => Boolean),
    __param(0, (0, graphql_1.Args)('backup')),
    __param(1, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], ToolsResolver.prototype, "verifyBackups", null);
__decorate([
    (0, graphql_1.Query)(() => Boolean),
    __param(0, (0, graphql_1.Args)('backup')),
    __param(1, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], ToolsResolver.prototype, "verifyBackup", null);
__decorate([
    (0, graphql_1.Query)(() => Boolean),
    __param(0, (0, graphql_1.Args)('backup')),
    __param(1, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], ToolsResolver.prototype, "recoverFunds", null);
__decorate([
    (0, graphql_1.Query)(() => String),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], ToolsResolver.prototype, "getBackups", null);
__decorate([
    (0, graphql_1.Query)(() => String),
    __param(0, (0, graphql_1.Args)('message')),
    __param(1, (0, graphql_1.Args)('signature')),
    __param(2, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], ToolsResolver.prototype, "verifyMessage", null);
__decorate([
    (0, graphql_1.Query)(() => String),
    __param(0, (0, graphql_1.Args)('message')),
    __param(1, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], ToolsResolver.prototype, "signMessage", null);
ToolsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [node_service_1.NodeService,
        winston_1.Logger])
], ToolsResolver);
exports.ToolsResolver = ToolsResolver;
//# sourceMappingURL=tools.resolver.js.map
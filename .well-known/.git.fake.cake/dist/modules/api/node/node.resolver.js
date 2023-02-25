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
exports.NodeFieldResolver = exports.NodeResolver = exports.BalancesResolver = exports.OnChainBalanceResolver = exports.LightningBalanceResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const node_service_1 = require("../../node/node.service");
const security_decorators_1 = require("../../security/security.decorators");
const security_types_1 = require("../../security/security.types");
const node_types_1 = require("./node.types");
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const async_1 = require("../../../utils/async");
const fetch_service_1 = require("../../fetch/fetch.service");
const config_1 = require("@nestjs/config");
const graphql_tag_1 = require("graphql-tag");
let LightningBalanceResolver = class LightningBalanceResolver {
    constructor(nodeService) {
        this.nodeService = nodeService;
    }
    async pending({ id }) {
        const channelBalance = await this.nodeService.getChannelBalance(id);
        return channelBalance.pending_balance;
    }
};
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], LightningBalanceResolver.prototype, "pending", null);
LightningBalanceResolver = __decorate([
    (0, graphql_1.Resolver)(node_types_1.LightningBalance),
    __metadata("design:paramtypes", [node_service_1.NodeService])
], LightningBalanceResolver);
exports.LightningBalanceResolver = LightningBalanceResolver;
let OnChainBalanceResolver = class OnChainBalanceResolver {
    constructor(nodeService) {
        this.nodeService = nodeService;
    }
    async confirmed({ id }) {
        const value = await this.nodeService.getChainBalance(id);
        return value.chain_balance || 0;
    }
    async pending({ id }) {
        const pendingValue = await this.nodeService.getPendingChainBalance(id);
        return pendingValue.pending_chain_balance || 0;
    }
    async closing({ id }) {
        const { pending_channels } = await this.nodeService.getPendingChannels(id);
        const closing = pending_channels
            .filter(p => p.is_timelocked)
            .reduce((p, c) => p + c.local_balance, 0) || 0;
        return closing || 0;
    }
};
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], OnChainBalanceResolver.prototype, "confirmed", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], OnChainBalanceResolver.prototype, "pending", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], OnChainBalanceResolver.prototype, "closing", null);
OnChainBalanceResolver = __decorate([
    (0, graphql_1.Resolver)(node_types_1.OnChainBalance),
    __metadata("design:paramtypes", [node_service_1.NodeService])
], OnChainBalanceResolver);
exports.OnChainBalanceResolver = OnChainBalanceResolver;
let BalancesResolver = class BalancesResolver {
    constructor(nodeService) {
        this.nodeService = nodeService;
    }
    async onchain() {
        return 0;
    }
    async lightning({ id }) {
        const { channels } = await this.nodeService.getChannels(id);
        const confirmed = channels
            .map(c => c.local_balance)
            .reduce((total, size) => total + size, 0);
        const active = channels
            .filter(c => c.is_active)
            .map(c => c.local_balance)
            .reduce((total, size) => total + size, 0);
        const commit = channels
            .filter(c => !c.is_partner_initiated)
            .map(c => c.commit_transaction_fee)
            .reduce((total, fee) => total + fee, 0);
        return {
            confirmed,
            active,
            commit,
        };
    }
};
__decorate([
    (0, graphql_1.ResolveField)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BalancesResolver.prototype, "onchain", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], BalancesResolver.prototype, "lightning", null);
BalancesResolver = __decorate([
    (0, graphql_1.Resolver)(node_types_1.Balances),
    __metadata("design:paramtypes", [node_service_1.NodeService])
], BalancesResolver);
exports.BalancesResolver = BalancesResolver;
let NodeResolver = class NodeResolver {
    constructor(nodeService, logger) {
        this.nodeService = nodeService;
        this.logger = logger;
    }
    async getNodeBalances() {
        return {};
    }
    async getNode(withoutChannels, publicKey) {
        return { publicKey, withoutChannels };
    }
    async getNodeInfo({ id }) {
        var _a;
        const info = await this.nodeService.getWalletInfo(id);
        const closedChannels = await this.nodeService.getClosedChannels(id);
        const { pending_channels } = await this.nodeService.getPendingChannels(id);
        const pending_channels_count = pending_channels.length;
        return Object.assign(Object.assign({}, info), { pending_channels_count, closed_channels_count: ((_a = closedChannels === null || closedChannels === void 0 ? void 0 : closedChannels.channels) === null || _a === void 0 ? void 0 : _a.length) || 0 });
    }
};
__decorate([
    (0, graphql_1.Query)(() => node_types_1.Balances),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NodeResolver.prototype, "getNodeBalances", null);
__decorate([
    (0, graphql_1.Query)(() => node_types_1.Node),
    __param(0, (0, graphql_1.Args)('withoutChannels', { nullable: true })),
    __param(1, (0, graphql_1.Args)('publicKey')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String]),
    __metadata("design:returntype", Promise)
], NodeResolver.prototype, "getNode", null);
__decorate([
    (0, graphql_1.Query)(() => node_types_1.NodeInfo),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], NodeResolver.prototype, "getNodeInfo", null);
NodeResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [node_service_1.NodeService,
        winston_1.Logger])
], NodeResolver);
exports.NodeResolver = NodeResolver;
let NodeFieldResolver = class NodeFieldResolver {
    constructor(nodeService, fetchService, configService, logger) {
        this.nodeService = nodeService;
        this.fetchService = fetchService;
        this.configService = configService;
        this.logger = logger;
    }
    async node({ publicKey }, { id }) {
        if (!publicKey) {
            this.logger.error('No public key to get node');
            return null;
        }
        const { data, error } = await this.fetchService.graphqlFetchWithProxy(this.configService.get('urls.amboss'), (0, graphql_tag_1.gql) `
        query GetNodeAlias($pubkey: String!) {
          getNodeAlias(pubkey: $pubkey)
        }
      `, { pubkey: publicKey });
        if ((data === null || data === void 0 ? void 0 : data.getNodeAlias) && !error) {
            return { alias: data.getNodeAlias, public_key: publicKey };
        }
        const [info, nodeError] = await (0, async_1.toWithError)(this.nodeService.getNode(id, publicKey, true));
        if (nodeError || !info)
            return null;
        return Object.assign(Object.assign({}, info), { public_key: publicKey });
    }
};
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], NodeFieldResolver.prototype, "node", null);
NodeFieldResolver = __decorate([
    (0, graphql_1.Resolver)(node_types_1.Node),
    __param(3, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [node_service_1.NodeService,
        fetch_service_1.FetchService,
        config_1.ConfigService,
        winston_1.Logger])
], NodeFieldResolver);
exports.NodeFieldResolver = NodeFieldResolver;
//# sourceMappingURL=node.resolver.js.map
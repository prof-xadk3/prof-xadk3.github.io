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
exports.NetworkResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const node_service_1 = require("../../node/node.service");
const security_decorators_1 = require("../../security/security.decorators");
const security_types_1 = require("../../security/security.types");
const network_types_1 = require("./network.types");
let NetworkResolver = class NetworkResolver {
    constructor(nodeService) {
        this.nodeService = nodeService;
    }
    async getNetworkInfo({ id }) {
        const info = await this.nodeService.getNetworkInfo(id);
        return {
            averageChannelSize: info.average_channel_size,
            channelCount: info.channel_count,
            maxChannelSize: info.max_channel_size,
            medianChannelSize: info.median_channel_size,
            minChannelSize: info.min_channel_size,
            nodeCount: info.node_count,
            notRecentlyUpdatedPolicyCount: info.not_recently_updated_policy_count,
            totalCapacity: info.total_capacity,
        };
    }
};
__decorate([
    (0, graphql_1.Query)(() => network_types_1.NetworkInfo),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], NetworkResolver.prototype, "getNetworkInfo", null);
NetworkResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [node_service_1.NodeService])
], NetworkResolver);
exports.NetworkResolver = NetworkResolver;
//# sourceMappingURL=network.resolver.js.map
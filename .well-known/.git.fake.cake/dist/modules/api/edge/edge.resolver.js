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
exports.EdgeResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const node_service_1 = require("../../node/node.service");
const security_decorators_1 = require("../../security/security.decorators");
const security_types_1 = require("../../security/security.types");
const edge_types_1 = require("./edge.types");
let EdgeResolver = class EdgeResolver {
    constructor(nodeService) {
        this.nodeService = nodeService;
    }
    async getChannelReport({ id }) {
        const { channels } = await this.nodeService.getChannels(id);
        if (!(channels === null || channels === void 0 ? void 0 : channels.length))
            return;
        const pending = channels.reduce((prev, current) => {
            const { pending_payments } = current;
            const total = pending_payments.length;
            const outgoing = pending_payments.filter(p => p.is_outgoing).length;
            const incoming = total - outgoing;
            return {
                totalPendingHtlc: prev.totalPendingHtlc + total,
                outgoingPendingHtlc: prev.outgoingPendingHtlc + outgoing,
                incomingPendingHtlc: prev.incomingPendingHtlc + incoming,
            };
        }, {
            totalPendingHtlc: 0,
            outgoingPendingHtlc: 0,
            incomingPendingHtlc: 0,
        });
        const commit = channels
            .filter(c => !c.is_partner_initiated)
            .map(c => c.commit_transaction_fee)
            .reduce((total, fee) => total + fee, 0);
        const localBalances = channels
            .filter(c => c.is_active)
            .map(c => c.local_balance);
        const remoteBalances = channels
            .filter(c => c.is_active)
            .map(c => c.remote_balance);
        const local = localBalances.reduce((total, size) => total + size, 0) - commit;
        const remote = remoteBalances.reduce((total, size) => total + size, 0);
        const maxOut = Math.max(...localBalances);
        const maxIn = Math.max(...remoteBalances);
        return Object.assign({ local,
            remote,
            maxIn,
            maxOut,
            commit }, pending);
    }
};
__decorate([
    (0, graphql_1.Query)(() => edge_types_1.ChannelReport),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], EdgeResolver.prototype, "getChannelReport", null);
EdgeResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [node_service_1.NodeService])
], EdgeResolver);
exports.EdgeResolver = EdgeResolver;
//# sourceMappingURL=edge.resolver.js.map
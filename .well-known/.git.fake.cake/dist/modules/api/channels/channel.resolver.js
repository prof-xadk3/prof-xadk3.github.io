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
exports.ChannelResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const nest_winston_1 = require("nest-winston");
const async_1 = require("../../../utils/async");
const winston_1 = require("winston");
const node_service_1 = require("../../node/node.service");
const security_decorators_1 = require("../../security/security.decorators");
const security_types_1 = require("../../security/security.types");
const channels_types_1 = require("./channels.types");
let ChannelResolver = class ChannelResolver {
    constructor(nodeService, logger) {
        this.nodeService = nodeService;
        this.logger = logger;
    }
    async time_offline({ time_offline }) {
        return Math.round((time_offline || 0) / 1000);
    }
    async time_online({ time_online }) {
        return Math.round((time_online || 0) / 1000);
    }
    async pending_resume({ pending_payments }) {
        const total = pending_payments.reduce((prev, current) => {
            const { is_outgoing, tokens } = current;
            return {
                incoming_tokens: is_outgoing
                    ? prev.incoming_tokens
                    : prev.incoming_tokens + tokens,
                outgoing_tokens: is_outgoing
                    ? prev.outgoing_tokens + tokens
                    : prev.outgoing_tokens,
                incoming_amount: is_outgoing
                    ? prev.incoming_amount
                    : prev.incoming_amount + 1,
                outgoing_amount: is_outgoing
                    ? prev.incoming_amount + 1
                    : prev.incoming_amount,
            };
        }, {
            incoming_tokens: 0,
            outgoing_tokens: 0,
            incoming_amount: 0,
            outgoing_amount: 0,
        });
        return Object.assign(Object.assign({}, total), { total_tokens: total.incoming_tokens + total.outgoing_tokens, total_amount: total.incoming_amount + total.outgoing_amount });
    }
    async partner_fee_info(user, { id, partner_fee_info: { localKey } }) {
        const [channel, error] = await (0, async_1.toWithError)(this.nodeService.getChannel(user.id, id));
        if (error) {
            this.logger.debug(`Error getting channel with id ${id}`, { error });
            return null;
        }
        let node_policies = null;
        let partner_node_policies = null;
        if (channel) {
            channel.policies.forEach(policy => {
                if (localKey && localKey === policy.public_key) {
                    node_policies = Object.assign(Object.assign({}, policy), { node: { publicKey: policy.public_key } });
                }
                else {
                    partner_node_policies = Object.assign(Object.assign({}, policy), { node: { publicKey: policy.public_key } });
                }
            });
        }
        return Object.assign(Object.assign({}, channel), { node_policies,
            partner_node_policies });
    }
};
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [channels_types_1.Channel]),
    __metadata("design:returntype", Promise)
], ChannelResolver.prototype, "time_offline", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [channels_types_1.Channel]),
    __metadata("design:returntype", Promise)
], ChannelResolver.prototype, "time_online", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [channels_types_1.Channel]),
    __metadata("design:returntype", Promise)
], ChannelResolver.prototype, "pending_resume", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId, Object]),
    __metadata("design:returntype", Promise)
], ChannelResolver.prototype, "partner_fee_info", null);
ChannelResolver = __decorate([
    (0, graphql_1.Resolver)(channels_types_1.Channel),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [node_service_1.NodeService,
        winston_1.Logger])
], ChannelResolver);
exports.ChannelResolver = ChannelResolver;
//# sourceMappingURL=channel.resolver.js.map
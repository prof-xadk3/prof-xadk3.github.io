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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRoutingFeesParams = exports.OpenOrCloseChannel = exports.PendingChannel = exports.ClosedChannel = exports.Channel = exports.SingleChannel = exports.NodePolicy = exports.Policy = exports.PendingPayment = exports.PendingResume = void 0;
const graphql_1 = require("@nestjs/graphql");
const node_types_1 = require("../node/node.types");
let PendingResume = class PendingResume {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PendingResume.prototype, "incoming_tokens", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PendingResume.prototype, "outgoing_tokens", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PendingResume.prototype, "incoming_amount", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PendingResume.prototype, "outgoing_amount", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PendingResume.prototype, "total_tokens", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PendingResume.prototype, "total_amount", void 0);
PendingResume = __decorate([
    (0, graphql_1.ObjectType)()
], PendingResume);
exports.PendingResume = PendingResume;
let PendingPayment = class PendingPayment {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PendingPayment.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], PendingPayment.prototype, "is_outgoing", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PendingPayment.prototype, "timeout", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PendingPayment.prototype, "tokens", void 0);
PendingPayment = __decorate([
    (0, graphql_1.ObjectType)()
], PendingPayment);
exports.PendingPayment = PendingPayment;
let Policy = class Policy {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Policy.prototype, "base_fee_mtokens", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], Policy.prototype, "cltv_delta", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], Policy.prototype, "fee_rate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], Policy.prototype, "is_disabled", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Policy.prototype, "max_htlc_mtokens", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Policy.prototype, "min_htlc_mtokens", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Policy.prototype, "public_key", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Policy.prototype, "updated_at", void 0);
Policy = __decorate([
    (0, graphql_1.ObjectType)()
], Policy);
exports.Policy = Policy;
let NodePolicy = class NodePolicy {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NodePolicy.prototype, "base_fee_mtokens", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], NodePolicy.prototype, "cltv_delta", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], NodePolicy.prototype, "fee_rate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], NodePolicy.prototype, "is_disabled", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NodePolicy.prototype, "max_htlc_mtokens", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NodePolicy.prototype, "min_htlc_mtokens", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NodePolicy.prototype, "updated_at", void 0);
__decorate([
    (0, graphql_1.Field)(() => node_types_1.Node, { nullable: true }),
    __metadata("design:type", node_types_1.Node)
], NodePolicy.prototype, "node", void 0);
NodePolicy = __decorate([
    (0, graphql_1.ObjectType)()
], NodePolicy);
exports.NodePolicy = NodePolicy;
let SingleChannel = class SingleChannel {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], SingleChannel.prototype, "capacity", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SingleChannel.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Policy]),
    __metadata("design:type", Array)
], SingleChannel.prototype, "policies", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SingleChannel.prototype, "transaction_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], SingleChannel.prototype, "transaction_vout", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], SingleChannel.prototype, "updated_at", void 0);
__decorate([
    (0, graphql_1.Field)(() => NodePolicy, { nullable: true }),
    __metadata("design:type", NodePolicy)
], SingleChannel.prototype, "node_policies", void 0);
__decorate([
    (0, graphql_1.Field)(() => NodePolicy, { nullable: true }),
    __metadata("design:type", NodePolicy)
], SingleChannel.prototype, "partner_node_policies", void 0);
SingleChannel = __decorate([
    (0, graphql_1.ObjectType)()
], SingleChannel);
exports.SingleChannel = SingleChannel;
let Channel = class Channel {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Channel.prototype, "capacity", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Channel.prototype, "commit_transaction_fee", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Channel.prototype, "commit_transaction_weight", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Channel.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Channel.prototype, "is_active", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Channel.prototype, "is_closing", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Channel.prototype, "is_opening", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Channel.prototype, "is_partner_initiated", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Channel.prototype, "is_private", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Channel.prototype, "local_balance", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Channel.prototype, "local_reserve", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Channel.prototype, "partner_public_key", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Channel.prototype, "past_states", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Channel.prototype, "received", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Channel.prototype, "remote_balance", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Channel.prototype, "remote_reserve", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Channel.prototype, "sent", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], Channel.prototype, "time_offline", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], Channel.prototype, "time_online", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Channel.prototype, "transaction_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Channel.prototype, "transaction_vout", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Channel.prototype, "unsettled_balance", void 0);
__decorate([
    (0, graphql_1.Field)(() => node_types_1.Node),
    __metadata("design:type", node_types_1.Node)
], Channel.prototype, "partner_node_info", void 0);
__decorate([
    (0, graphql_1.Field)(() => SingleChannel, { nullable: true }),
    __metadata("design:type", SingleChannel)
], Channel.prototype, "partner_fee_info", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Channel.prototype, "channel_age", void 0);
__decorate([
    (0, graphql_1.Field)(() => [PendingPayment]),
    __metadata("design:type", Array)
], Channel.prototype, "pending_payments", void 0);
__decorate([
    (0, graphql_1.Field)(() => PendingResume),
    __metadata("design:type", PendingResume)
], Channel.prototype, "pending_resume", void 0);
Channel = __decorate([
    (0, graphql_1.ObjectType)()
], Channel);
exports.Channel = Channel;
let ClosedChannel = class ClosedChannel {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], ClosedChannel.prototype, "capacity", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], ClosedChannel.prototype, "close_confirm_height", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ClosedChannel.prototype, "close_transaction_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], ClosedChannel.prototype, "final_local_balance", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], ClosedChannel.prototype, "final_time_locked_balance", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ClosedChannel.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], ClosedChannel.prototype, "is_breach_close", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], ClosedChannel.prototype, "is_cooperative_close", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], ClosedChannel.prototype, "is_funding_cancel", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], ClosedChannel.prototype, "is_local_force_close", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], ClosedChannel.prototype, "is_remote_force_close", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ClosedChannel.prototype, "partner_public_key", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ClosedChannel.prototype, "transaction_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], ClosedChannel.prototype, "transaction_vout", void 0);
__decorate([
    (0, graphql_1.Field)(() => node_types_1.Node),
    __metadata("design:type", node_types_1.Node)
], ClosedChannel.prototype, "partner_node_info", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], ClosedChannel.prototype, "channel_age", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], ClosedChannel.prototype, "closed_for_blocks", void 0);
ClosedChannel = __decorate([
    (0, graphql_1.ObjectType)()
], ClosedChannel);
exports.ClosedChannel = ClosedChannel;
let PendingChannel = class PendingChannel {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PendingChannel.prototype, "close_transaction_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], PendingChannel.prototype, "is_active", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], PendingChannel.prototype, "is_closing", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], PendingChannel.prototype, "is_opening", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], PendingChannel.prototype, "is_timelocked", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PendingChannel.prototype, "local_balance", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PendingChannel.prototype, "local_reserve", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PendingChannel.prototype, "partner_public_key", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PendingChannel.prototype, "received", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PendingChannel.prototype, "remote_balance", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PendingChannel.prototype, "remote_reserve", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PendingChannel.prototype, "sent", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], PendingChannel.prototype, "transaction_fee", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PendingChannel.prototype, "transaction_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PendingChannel.prototype, "transaction_vout", void 0);
__decorate([
    (0, graphql_1.Field)(() => node_types_1.Node),
    __metadata("design:type", node_types_1.Node)
], PendingChannel.prototype, "partner_node_info", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], PendingChannel.prototype, "timelock_blocks", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], PendingChannel.prototype, "timelock_expiration", void 0);
PendingChannel = __decorate([
    (0, graphql_1.ObjectType)()
], PendingChannel);
exports.PendingChannel = PendingChannel;
let OpenOrCloseChannel = class OpenOrCloseChannel {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], OpenOrCloseChannel.prototype, "transactionId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], OpenOrCloseChannel.prototype, "transactionOutputIndex", void 0);
OpenOrCloseChannel = __decorate([
    (0, graphql_1.ObjectType)()
], OpenOrCloseChannel);
exports.OpenOrCloseChannel = OpenOrCloseChannel;
let UpdateRoutingFeesParams = class UpdateRoutingFeesParams {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateRoutingFeesParams.prototype, "transaction_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], UpdateRoutingFeesParams.prototype, "transaction_vout", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateRoutingFeesParams.prototype, "base_fee_mtokens", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], UpdateRoutingFeesParams.prototype, "base_fee_tokens", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], UpdateRoutingFeesParams.prototype, "cltv_delta", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], UpdateRoutingFeesParams.prototype, "fee_rate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateRoutingFeesParams.prototype, "max_htlc_mtokens", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateRoutingFeesParams.prototype, "min_htlc_mtokens", void 0);
UpdateRoutingFeesParams = __decorate([
    (0, graphql_1.InputType)()
], UpdateRoutingFeesParams);
exports.UpdateRoutingFeesParams = UpdateRoutingFeesParams;
//# sourceMappingURL=channels.types.js.map
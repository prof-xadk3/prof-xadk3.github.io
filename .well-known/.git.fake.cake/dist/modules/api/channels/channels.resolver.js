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
exports.ChannelsResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const nest_winston_1 = require("nest-winston");
const async_1 = require("../../../utils/async");
const winston_1 = require("winston");
const node_service_1 = require("../../node/node.service");
const security_decorators_1 = require("../../security/security.decorators");
const security_types_1 = require("../../security/security.types");
const channels_helpers_1 = require("./channels.helpers");
const channels_types_1 = require("./channels.types");
let ChannelsResolver = class ChannelsResolver {
    constructor(nodeService, logger) {
        this.nodeService = nodeService;
        this.logger = logger;
    }
    async getChannel(user, id) {
        const { public_key } = await this.nodeService.getWalletInfo(user.id);
        const channel = await this.nodeService.getChannel(user.id, id);
        let node_policies = null;
        let partner_node_policies = null;
        channel.policies.forEach(policy => {
            if (public_key && public_key === policy.public_key) {
                node_policies = Object.assign(Object.assign({}, policy), { node: { publicKey: policy.public_key } });
            }
            else {
                partner_node_policies = Object.assign(Object.assign({}, policy), { node: { publicKey: policy.public_key } });
            }
        });
        return Object.assign(Object.assign({}, channel), { node_policies,
            partner_node_policies });
    }
    async getChannels({ id }, is_active) {
        const { public_key, current_block_height } = await this.nodeService.getWalletInfo(id);
        const { channels } = await this.nodeService.getChannels(id, { is_active });
        return channels.map(channel => (Object.assign(Object.assign({}, channel), { partner_fee_info: { localKey: public_key }, channel_age: (0, channels_helpers_1.getChannelAge)(channel.id, current_block_height), partner_node_info: { publicKey: channel.partner_public_key } })));
    }
    async getClosedChannels({ id }) {
        const { current_block_height } = await this.nodeService.getWalletInfo(id);
        const { channels } = await this.nodeService.getClosedChannels(id);
        return channels.map(channel => (Object.assign(Object.assign({}, channel), { partner_node_info: { publicKey: channel.partner_public_key }, channel_age: channel.close_confirm_height
                ? (0, channels_helpers_1.getChannelAge)(channel.id, channel.close_confirm_height)
                : null, closed_for_blocks: channel.close_confirm_height
                ? current_block_height - channel.close_confirm_height
                : null })));
    }
    async getPendingChannels({ id }) {
        const { pending_channels } = await this.nodeService.getPendingChannels(id);
        return pending_channels.map(channel => (Object.assign(Object.assign({}, channel), { partner_node_info: { publicKey: channel.partner_public_key } })));
    }
    async closeChannel(user, id, target_confirmations, tokens_per_vbyte, is_force_close) {
        const closeParams = {
            id,
            target_confirmations,
            tokens_per_vbyte,
            is_force_close,
        };
        this.logger.info('Closing channel with params', { closeParams });
        const info = await this.nodeService.closeChannel(user.id, closeParams);
        this.logger.info('Channel closed', { id });
        return {
            transactionId: info.transaction_id,
            transactionOutputIndex: info.transaction_vout,
        };
    }
    async openChannel(user, local_tokens, partner_public_key, is_private, pushTokens, chain_fee_tokens_per_vbyte) {
        let public_key = partner_public_key;
        if (partner_public_key.indexOf('@') >= 0) {
            const parts = partner_public_key.split('@');
            public_key = parts[0];
            await this.nodeService.addPeer(user.id, public_key, parts[1], false);
        }
        const openParams = {
            is_private,
            local_tokens,
            chain_fee_tokens_per_vbyte,
            partner_public_key: public_key,
            give_tokens: Math.min(pushTokens, local_tokens),
        };
        this.logger.info('Opening channel with params', { openParams });
        const info = await this.nodeService.openChannel(user.id, openParams);
        this.logger.info('Channel opened');
        return {
            transactionId: info.transaction_id,
            transactionOutputIndex: info.transaction_vout,
        };
    }
    async updateFees(user, transaction_id, transaction_vout, base_fee_tokens, fee_rate, cltv_delta, max_htlc_mtokens, min_htlc_mtokens) {
        const hasBaseFee = base_fee_tokens >= 0;
        const hasFee = fee_rate >= 0;
        if (!hasBaseFee &&
            !hasFee &&
            !cltv_delta &&
            !max_htlc_mtokens &&
            !min_htlc_mtokens) {
            throw new Error('NoDetailsToUpdateChannel');
        }
        const baseFee = base_fee_tokens === 0
            ? { base_fee_tokens: 0 }
            : { base_fee_mtokens: `${Math.trunc((base_fee_tokens || 0) * 1000)}` };
        const props = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ transaction_id,
            transaction_vout }, (hasBaseFee && baseFee)), (hasFee && { fee_rate })), (cltv_delta && { cltv_delta })), (max_htlc_mtokens && { max_htlc_mtokens })), (min_htlc_mtokens && { min_htlc_mtokens }));
        this.logger.debug('Updating channel details with props', props);
        await this.nodeService.updateRoutingFees(user.id, props);
        return true;
    }
    async updateMultipleFees(user, channels) {
        let errors = 0;
        for (let i = 0; i < channels.length; i++) {
            const channel = channels[i];
            const { transaction_id, transaction_vout, base_fee_tokens, fee_rate, cltv_delta, max_htlc_mtokens, min_htlc_mtokens, } = channel;
            const hasBaseFee = base_fee_tokens >= 0;
            const hasFee = fee_rate >= 0;
            if (!hasBaseFee &&
                !hasFee &&
                !cltv_delta &&
                !max_htlc_mtokens &&
                !min_htlc_mtokens) {
                throw new Error('NoDetailsToUpdateChannel');
            }
            const baseFee = base_fee_tokens === 0
                ? { base_fee_tokens: 0 }
                : {
                    base_fee_mtokens: `${Math.trunc((base_fee_tokens || 0) * 1000)}`,
                };
            const props = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ transaction_id,
                transaction_vout }, (hasBaseFee && baseFee)), (hasFee && { fee_rate })), (cltv_delta && { cltv_delta })), (max_htlc_mtokens && { max_htlc_mtokens })), (min_htlc_mtokens && { min_htlc_mtokens }));
            const [, error] = await (0, async_1.toWithError)(this.nodeService.updateRoutingFees(user.id, props));
            if (error) {
                this.logger.error('Error updating channel', { error });
                errors = errors + 1;
            }
        }
        return errors ? false : true;
    }
};
__decorate([
    (0, graphql_1.Query)(() => channels_types_1.SingleChannel),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId, String]),
    __metadata("design:returntype", Promise)
], ChannelsResolver.prototype, "getChannel", null);
__decorate([
    (0, graphql_1.Query)(() => [channels_types_1.Channel]),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('active', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId, Boolean]),
    __metadata("design:returntype", Promise)
], ChannelsResolver.prototype, "getChannels", null);
__decorate([
    (0, graphql_1.Query)(() => [channels_types_1.ClosedChannel]),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], ChannelsResolver.prototype, "getClosedChannels", null);
__decorate([
    (0, graphql_1.Query)(() => [channels_types_1.PendingChannel]),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], ChannelsResolver.prototype, "getPendingChannels", null);
__decorate([
    (0, graphql_1.Mutation)(() => channels_types_1.OpenOrCloseChannel),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('id')),
    __param(2, (0, graphql_1.Args)('targetConfirmations', { nullable: true })),
    __param(3, (0, graphql_1.Args)('tokensPerVByte', { nullable: true })),
    __param(4, (0, graphql_1.Args)('forceClose', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId, String, Number, Number, Boolean]),
    __metadata("design:returntype", Promise)
], ChannelsResolver.prototype, "closeChannel", null);
__decorate([
    (0, graphql_1.Mutation)(() => channels_types_1.OpenOrCloseChannel),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('amount')),
    __param(2, (0, graphql_1.Args)('partnerPublicKey')),
    __param(3, (0, graphql_1.Args)('isPrivate', { nullable: true })),
    __param(4, (0, graphql_1.Args)('pushTokens', { nullable: true, defaultValue: 0 })),
    __param(5, (0, graphql_1.Args)('tokensPerVByte', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId, Number, String, Boolean, Number, Number]),
    __metadata("design:returntype", Promise)
], ChannelsResolver.prototype, "openChannel", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('transaction_id', { nullable: true })),
    __param(2, (0, graphql_1.Args)('transaction_vout', { nullable: true })),
    __param(3, (0, graphql_1.Args)('base_fee_tokens', { nullable: true })),
    __param(4, (0, graphql_1.Args)('fee_rate', { nullable: true })),
    __param(5, (0, graphql_1.Args)('cltv_delta', { nullable: true })),
    __param(6, (0, graphql_1.Args)('max_htlc_mtokens', { nullable: true })),
    __param(7, (0, graphql_1.Args)('min_htlc_mtokens', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId, String, Number, Number, Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], ChannelsResolver.prototype, "updateFees", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('channels', { type: () => [channels_types_1.UpdateRoutingFeesParams] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId, Array]),
    __metadata("design:returntype", Promise)
], ChannelsResolver.prototype, "updateMultipleFees", null);
ChannelsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [node_service_1.NodeService,
        winston_1.Logger])
], ChannelsResolver);
exports.ChannelsResolver = ChannelsResolver;
//# sourceMappingURL=channels.resolver.js.map
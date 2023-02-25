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
exports.HealthResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const nest_winston_1 = require("nest-winston");
const async_1 = require("../../../utils/async");
const winston_1 = require("winston");
const node_service_1 = require("../../node/node.service");
const security_decorators_1 = require("../../security/security.decorators");
const security_types_1 = require("../../security/security.types");
const health_helpers_1 = require("./health.helpers");
const health_types_1 = require("./health.types");
const date_fns_1 = require("date-fns");
const halfMonthInMilliSeconds = 1296000000;
const monthInBlocks = 4380;
let HealthResolver = class HealthResolver {
    constructor(nodeService, logger) {
        this.nodeService = nodeService;
        this.logger = logger;
    }
    async getFeeHealth(user) {
        const { public_key } = await this.nodeService.getWalletInfo(user.id);
        const { channels } = await this.nodeService.getChannels(user.id);
        const getChannelList = () => Promise.all(channels
            .map(async (channel) => {
            const { id, partner_public_key: publicKey } = channel;
            const [channelInfo, channelError] = await (0, async_1.toWithError)(this.nodeService.getChannel(user.id, id));
            if (channelError || !channelInfo) {
                this.logger.debug(`Error getting channel with id ${id}`, {
                    error: channelError,
                });
                return null;
            }
            const policies = channelInfo.policies;
            let partnerBaseFee = 0;
            let partnerFeeRate = 0;
            let myBaseFee = 0;
            let myFeeRate = 0;
            if (!channelError && policies) {
                for (let i = 0; i < policies.length; i++) {
                    const policy = policies[i];
                    if (policy.public_key === public_key) {
                        myBaseFee = Number(policy.base_fee_mtokens) || 0;
                        myFeeRate = policy.fee_rate || 0;
                    }
                    else {
                        partnerBaseFee = Number(policy.base_fee_mtokens) || 0;
                        partnerFeeRate = policy.fee_rate || 0;
                    }
                }
            }
            return {
                id,
                publicKey,
                partnerBaseFee,
                partnerFeeRate,
                myBaseFee,
                myFeeRate,
            };
        })
            .filter(Boolean));
        const list = await getChannelList();
        const health = list.map((channel) => {
            const partnerRateScore = (0, health_helpers_1.getFeeScore)(2000, channel.partnerFeeRate);
            const partnerBaseScore = (0, health_helpers_1.getFeeScore)(100000, channel.partnerBaseFee);
            const myRateScore = (0, health_helpers_1.getMyFeeScore)(2000, channel.myFeeRate, 200);
            const myBaseScore = (0, health_helpers_1.getMyFeeScore)(100000, channel.myBaseFee, 1000);
            const partnerScore = Math.round((0, health_helpers_1.getAverage)([partnerBaseScore, partnerRateScore]));
            const myScore = Math.round((0, health_helpers_1.getAverage)([myRateScore.score, myBaseScore.score]));
            const mySide = {
                score: myScore,
                rate: channel.myFeeRate,
                base: Math.round(channel.myBaseFee / 1000),
                rateScore: myRateScore.score,
                baseScore: myBaseScore.score,
                rateOver: myRateScore.over,
                baseOver: myBaseScore.over,
            };
            const partnerSide = {
                score: partnerScore,
                rate: channel.partnerFeeRate,
                base: Math.round(channel.partnerBaseFee / 1000),
                rateScore: partnerRateScore,
                baseScore: partnerBaseScore,
                rateOver: true,
                baseOver: true,
            };
            return {
                id: channel.id,
                partnerSide,
                mySide,
                partner: { publicKey: channel.publicKey },
            };
        });
        const score = Math.round((0, health_helpers_1.getAverage)([
            ...health.map(c => c.partnerSide.score),
            ...health.map(c => c.mySide.score),
        ]));
        return {
            score,
            channels: health,
        };
    }
    async getTimeHealth(user) {
        const { channels } = await this.nodeService.getChannels(user.id);
        const health = channels.map(channel => {
            const { time_offline = 1, time_online = 1, id, partner_public_key, } = channel;
            const significant = time_offline + time_online > halfMonthInMilliSeconds;
            const defaultProps = {
                id,
                significant,
                monitoredTime: Math.round((time_online + time_offline) / 1000),
                monitoredUptime: Math.round(time_online / 1000),
                monitoredDowntime: Math.round(time_offline / 1000),
                partner: { publicKey: partner_public_key },
            };
            const percentOnline = time_online / (time_online + time_offline);
            return Object.assign({ score: Math.round(percentOnline * 100) }, defaultProps);
        });
        const average = Math.round((0, health_helpers_1.getAverage)(health.map(c => c.score)));
        return {
            score: average,
            channels: health,
        };
    }
    async getVolumeHealth(user) {
        const before = new Date().toISOString();
        const after = (0, date_fns_1.subMonths)(new Date(), 1).toISOString();
        const { current_block_height } = await this.nodeService.getWalletInfo(user.id);
        const { channels } = await this.nodeService.getChannels(user.id);
        const { forwards } = await this.nodeService.getForwards(user.id, {
            after,
            before,
        });
        const channelVolume = (0, health_helpers_1.getChannelVolume)(forwards);
        const channelDetails = channels
            .map(channel => {
            const { tokens } = channelVolume.find(c => c.channel === channel.id) || {
                tokens: 0,
            };
            const info = (0, health_helpers_1.getChannelIdInfo)(channel.id);
            if (!info)
                return;
            const age = Math.min(current_block_height - info.blockHeight, monthInBlocks);
            return {
                id: channel.id,
                volume: tokens,
                volumeNormalized: Math.round(tokens / age) || 0,
                publicKey: channel.partner_public_key,
            };
        })
            .filter(Boolean);
        const average = (0, health_helpers_1.getAverage)(channelDetails.map(c => (c === null || c === void 0 ? void 0 : c.volumeNormalized) || 0));
        const health = channelDetails
            .map(channel => {
            if (!channel)
                return null;
            const diff = (channel.volumeNormalized - average) / average || -1;
            const score = Math.round((diff + 1) * 100);
            return {
                id: channel.id,
                score,
                volumeNormalized: channel.volumeNormalized,
                averageVolumeNormalized: average,
                partner: { publicKey: channel.publicKey },
            };
        })
            .filter(Boolean);
        const globalAverage = Math.round((0, health_helpers_1.getAverage)(health.map(c => Math.min((c === null || c === void 0 ? void 0 : c.score) || 0, 100))));
        return { score: globalAverage, channels: health };
    }
};
__decorate([
    (0, graphql_1.Query)(() => health_types_1.ChannelsFeeHealth),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], HealthResolver.prototype, "getFeeHealth", null);
__decorate([
    (0, graphql_1.Query)(() => health_types_1.ChannelsTimeHealth),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], HealthResolver.prototype, "getTimeHealth", null);
__decorate([
    (0, graphql_1.Query)(() => health_types_1.ChannelsHealth),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], HealthResolver.prototype, "getVolumeHealth", null);
HealthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [node_service_1.NodeService,
        winston_1.Logger])
], HealthResolver);
exports.HealthResolver = HealthResolver;
//# sourceMappingURL=health.resolver.js.map
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
exports.AmbossService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const lightning_1 = require("lightning");
const nest_winston_1 = require("nest-winston");
const network_1 = require("../../../utils/network");
const winston_1 = require("winston");
const accounts_service_1 = require("../../accounts/accounts.service");
const fetch_service_1 = require("../../fetch/fetch.service");
const amboss_gql_1 = require("./amboss.gql");
const async_1 = require("async");
const node_service_1 = require("../../node/node.service");
const userConfig_service_1 = require("../userConfig/userConfig.service");
const crypto_1 = require("../../../utils/crypto");
const lodash_1 = require("lodash");
const ONE_MINUTE = 60 * 1000;
let AmbossService = class AmbossService {
    constructor(nodeService, fetchService, configService, accountsService, userConfigService, logger) {
        this.nodeService = nodeService;
        this.fetchService = fetchService;
        this.configService = configService;
        this.accountsService = accountsService;
        this.userConfigService = userConfigService;
        this.logger = logger;
        this.ambossUrl = this.configService.get('urls.amboss');
    }
    async pushBackup(backup, signature) {
        const { data, error } = await this.fetchService.graphqlFetchWithProxy(this.ambossUrl, amboss_gql_1.saveBackupMutation, { backup, signature });
        if (!(data === null || data === void 0 ? void 0 : data.saveBackup) || error) {
            this.logger.error('Error pushing backup to Amboss', { error, data });
            throw new Error('Error pushing backup to Amboss');
        }
    }
    async pingHealthCheck(timestamp, signature) {
        const { data, error } = await this.fetchService.graphqlFetchWithProxy(this.ambossUrl, amboss_gql_1.pingHealthCheckMutation, { timestamp, signature });
        if (!(data === null || data === void 0 ? void 0 : data.healthCheck) || error) {
            this.logger.error('Error pinging Amboss for a healthcheck', {
                error,
                data,
            });
            throw new Error('Error pinging Amboss for a healthcheck');
        }
    }
    async pushBalancesToAmboss(input) {
        const { data, error } = await this.fetchService.graphqlFetchWithProxy(this.ambossUrl, amboss_gql_1.pushNodeBalancesMutation, { input });
        if (!(data === null || data === void 0 ? void 0 : data.pushNodeBalances) || error) {
            this.logger.error('Error pushing balances to Amboss', {
                error,
                data,
            });
            throw new Error('Error pushing balances to Amboss');
        }
    }
    async ping() {
        const isProduction = this.configService.get('isProduction');
        const disabled = this.configService.get('amboss.disableHealthCheckPings');
        if (!isProduction) {
            this.logger.silly('Health check pings are only sent in production');
            return;
        }
        if (disabled) {
            this.logger.silly('Healthchecks are disabled in the server.');
            return;
        }
        const { healthCheckPingEnabled } = this.userConfigService.getConfig();
        if (!healthCheckPingEnabled) {
            this.logger.silly('Healthchecks are disabled.');
            return;
        }
        await (0, async_1.auto)({
            getNodes: async () => {
                const accounts = this.accountsService.getAllAccounts();
                const validAccounts = [];
                for (const key in accounts) {
                    if (accounts.hasOwnProperty(key)) {
                        const account = accounts[key];
                        if (!account.encrypted) {
                            validAccounts.push({ id: account.hash, lnd: account.lnd });
                        }
                    }
                }
                return validAccounts;
            },
            checkNodes: [
                'getNodes',
                async ({ getNodes }) => {
                    return (0, async_1.map)(getNodes, async ({ lnd, id }) => {
                        var _a;
                        try {
                            const info = await (0, lightning_1.getWalletInfo)({ lnd });
                            const network = (0, network_1.getNetwork)(((_a = info === null || info === void 0 ? void 0 : info.chains) === null || _a === void 0 ? void 0 : _a[0]) || '');
                            const sliced = info.public_key.slice(0, 10);
                            const name = `${info.alias}(${sliced})[${network}]`;
                            return {
                                id,
                                name,
                                pubkey: info.public_key,
                                lnd,
                                network,
                            };
                        }
                        catch (err) {
                            this.logger.error('Error connecting to node', {
                                id,
                                err,
                            });
                        }
                    });
                },
            ],
            checkAvailable: [
                'checkNodes',
                async ({ checkNodes }) => {
                    const unique = checkNodes.filter(Boolean);
                    if (!unique.length) {
                        throw new Error('No node available for healthcheck ping');
                    }
                    const names = unique.map(a => a.name);
                    this.logger.silly(`Connected to ${names.join(', ')} for healthcheck ping`);
                    return unique;
                },
            ],
            pingAmboss: [
                'checkAvailable',
                async ({ checkAvailable }) => {
                    await (0, async_1.each)(checkAvailable, async (node) => {
                        if (node.network !== 'btc') {
                            this.logger.silly('Health check pings are only sent for mainnet', { node: node.name });
                            return;
                        }
                        const timestamp = new Date().toISOString();
                        const { signature } = await this.nodeService.signMessage(node.id, timestamp);
                        await this.pingHealthCheck(timestamp, signature);
                    });
                },
            ],
        })
            .then(result => {
            const nodes = result.checkAvailable.length;
            this.logger.silly(`Finished healthcheck pings for ${nodes} node${nodes.length > 1 ? 's' : ''}.`);
        })
            .catch(error => {
            this.logger.error(error.message);
        });
    }
    async pushBalances() {
        const isProduction = this.configService.get('isProduction');
        const disabled = this.configService.get('amboss.disableBalancePushes');
        if (!isProduction) {
            this.logger.silly('Balance pushes are only sent in production');
            return;
        }
        if (disabled) {
            this.logger.silly('Balance pushes are disabled in the server.');
            return;
        }
        const { onchainPushEnabled, channelPushEnabled, privateChannelPushEnabled, } = this.userConfigService.getConfig();
        if (!channelPushEnabled &&
            !privateChannelPushEnabled &&
            !onchainPushEnabled) {
            this.logger.silly('Balance pushes are disabled.');
            return;
        }
        await (0, async_1.auto)({
            getNodes: async () => {
                const accounts = this.accountsService.getAllAccounts();
                const validAccounts = [];
                for (const key in accounts) {
                    if (accounts.hasOwnProperty(key)) {
                        const account = accounts[key];
                        if (!account.encrypted) {
                            validAccounts.push({ id: account.hash, lnd: account.lnd });
                        }
                    }
                }
                return validAccounts;
            },
            checkNodes: [
                'getNodes',
                async ({ getNodes }) => {
                    return (0, async_1.map)(getNodes, async ({ lnd, id }) => {
                        var _a;
                        try {
                            const info = await (0, lightning_1.getWalletInfo)({ lnd });
                            const network = (0, network_1.getNetwork)(((_a = info === null || info === void 0 ? void 0 : info.chains) === null || _a === void 0 ? void 0 : _a[0]) || '');
                            const sliced = info.public_key.slice(0, 10);
                            const name = `${info.alias}(${sliced})[${network}]`;
                            return {
                                id,
                                name,
                                pubkey: info.public_key,
                                lnd,
                                network,
                            };
                        }
                        catch (err) {
                            this.logger.error('Error connecting to node', {
                                id,
                                err,
                            });
                        }
                    });
                },
            ],
            checkAvailable: [
                'checkNodes',
                async ({ checkNodes }) => {
                    const unique = checkNodes.filter(Boolean);
                    if (!unique.length) {
                        throw new Error('No node available for balance pushes');
                    }
                    const names = unique.map(a => a.name);
                    this.logger.silly(`Connected to ${names.join(', ')} for balance pushes`);
                    return unique;
                },
            ],
            pingAmboss: [
                'checkAvailable',
                async ({ checkAvailable }) => {
                    await (0, async_1.each)(checkAvailable, async (node) => {
                        if (node.network !== 'btc') {
                            this.logger.silly('Balance pushes are only sent for mainnet', {
                                node: node.name,
                            });
                            return;
                        }
                        let onchain;
                        let message = '';
                        if (onchainPushEnabled) {
                            const { chain_balance } = await this.nodeService.getChainBalance(node.id);
                            const { pending_chain_balance } = await this.nodeService.getPendingChainBalance(node.id);
                            onchain = {
                                confirmed: chain_balance + '',
                                pending: pending_chain_balance + '',
                            };
                            message += `${chain_balance}${pending_chain_balance}`;
                        }
                        let pendingChannelBalance;
                        if (channelPushEnabled) {
                            pendingChannelBalance = {
                                local: '0',
                                total: '0',
                            };
                            const { pending_channels } = await this.nodeService.getPendingChannels(node.id);
                            if (pending_channels.length) {
                                const amounts = pending_channels.reduce((p, c) => {
                                    if (!c)
                                        return p;
                                    const local = p.local + c.local_balance;
                                    const total = p.total + c.capacity;
                                    return { local, total };
                                }, { local: 0, total: 0 });
                                pendingChannelBalance = {
                                    local: amounts.local + '',
                                    total: amounts.total + '',
                                };
                            }
                            message += `${pendingChannelBalance.local}${pendingChannelBalance.total}`;
                        }
                        const allChannels = [];
                        if (channelPushEnabled) {
                            const channels = await this.nodeService.getChannels(node.id, {
                                is_public: true,
                            });
                            if (!channels.channels.length)
                                return;
                            const mapped = channels.channels.map(c => {
                                const heldAmount = c.pending_payments.reduce((p, pp) => {
                                    if (!pp)
                                        return p;
                                    if (!pp.is_outgoing)
                                        return p;
                                    return p + pp.tokens;
                                }, 0);
                                return {
                                    chan_id: c.id,
                                    balance: (c.local_balance + heldAmount).toString(),
                                    capacity: c.capacity + '',
                                };
                            });
                            allChannels.push(...mapped);
                        }
                        if (privateChannelPushEnabled) {
                            const privateChannels = await this.nodeService.getChannels(node.id, { is_private: true });
                            if (!privateChannels.channels.length)
                                return;
                            const mapped = privateChannels.channels.map(c => {
                                const heldAmount = c.pending_payments.reduce((p, pp) => {
                                    if (!pp)
                                        return p;
                                    if (!pp.is_outgoing)
                                        return p;
                                    return p + pp.tokens;
                                }, 0);
                                return {
                                    chan_id: c.id,
                                    balance: (c.local_balance + heldAmount).toString(),
                                    capacity: c.capacity + '',
                                };
                            });
                            allChannels.push(...mapped);
                        }
                        const sortedChannels = (0, lodash_1.orderBy)(allChannels, ['chan_id'], ['desc']);
                        if (sortedChannels.length) {
                            const infoString = sortedChannels.reduce((p, c) => {
                                return p + `${c.chan_id}${c.balance}${c.capacity || ''}`;
                            }, '');
                            message += (0, crypto_1.getSHA256Hash)(infoString);
                        }
                        const timestamp = new Date().toISOString();
                        const finalMessage = timestamp + message;
                        const { signature } = await this.nodeService.signMessage(node.id, finalMessage);
                        this.logger.info('Push Info', {
                            onchainBalance: !!onchain,
                            pendingChannelBalance: !!pendingChannelBalance,
                            amountOfChannels: sortedChannels.length,
                            finalMessage,
                            signature,
                        });
                        await this.pushBalancesToAmboss({
                            timestamp,
                            signature,
                            pendingChannelBalance,
                            onchainBalance: onchain,
                            channels: sortedChannels,
                        });
                    });
                },
            ],
        })
            .then(result => {
            const nodes = result.checkAvailable.length;
            this.logger.silly(`Finished balance pushes for ${nodes} node${nodes.length > 1 ? 's' : ''}.`);
        })
            .catch(error => {
            this.logger.error(error.message);
        });
    }
};
__decorate([
    (0, schedule_1.Interval)(ONE_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AmbossService.prototype, "ping", null);
__decorate([
    (0, schedule_1.Interval)(ONE_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AmbossService.prototype, "pushBalances", null);
AmbossService = __decorate([
    (0, common_1.Injectable)(),
    __param(5, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [node_service_1.NodeService,
        fetch_service_1.FetchService,
        config_1.ConfigService,
        accounts_service_1.AccountsService,
        userConfig_service_1.UserConfigService,
        winston_1.Logger])
], AmbossService);
exports.AmbossService = AmbossService;
//# sourceMappingURL=amboss.service.js.map
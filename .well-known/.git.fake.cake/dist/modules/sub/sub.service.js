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
exports.SubService = void 0;
const common_1 = require("@nestjs/common");
const lightning_1 = require("lightning");
const async_1 = require("async");
const winston_1 = require("winston");
const nest_winston_1 = require("nest-winston");
const accounts_service_1 = require("../accounts/accounts.service");
const ws_service_1 = require("../ws/ws.service");
const config_1 = require("@nestjs/config");
const node_service_1 = require("../node/node.service");
const userConfig_service_1 = require("../api/userConfig/userConfig.service");
const network_1 = require("../../utils/network");
const amboss_service_1 = require("../api/amboss/amboss.service");
const restartSubscriptionTimeMs = 1000 * 30;
let SubService = class SubService {
    constructor(ambossService, accountsService, wsService, configService, nodeService, userConfigService, logger) {
        this.ambossService = ambossService;
        this.accountsService = accountsService;
        this.wsService = wsService;
        this.configService = configService;
        this.nodeService = nodeService;
        this.userConfigService = userConfigService;
        this.logger = logger;
        this.subscriptions = [];
        this.retryCount = 0;
    }
    async onApplicationBootstrap() {
        const disabled = this.configService.get('subscriptions.disableAll');
        if (disabled) {
            this.logger.info('All subscriptions are disabled');
            return;
        }
        this.startSubscription();
    }
    async startSubscription() {
        return (0, async_1.forever)(next => {
            return (0, async_1.auto)({
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
                            this.logger.error(`Unable to connect to any node.`);
                            throw new Error('UnableToConnectToAnyNode');
                        }
                        const names = unique.map(a => a.name);
                        this.logger.info(`Connected to ${names.join(', ')}`);
                        return unique;
                    },
                ],
                invoices: [
                    'checkAvailable',
                    async ({ checkAvailable }, callback) => {
                        const disabled = this.configService.get('subscriptions.disableInvoices');
                        if (disabled) {
                            this.logger.info('Invoice subscriptions are disabled');
                            return;
                        }
                        const names = checkAvailable.map(a => a.name);
                        this.logger.info('Invoice subscription', {
                            connections: names.join(', '),
                        });
                        return (0, async_1.each)(checkAvailable, (node, cbk) => {
                            const sub = (0, lightning_1.subscribeToInvoices)({ lnd: node.lnd });
                            this.subscriptions.push(sub);
                            sub.on('invoice_updated', data => {
                                this.logger.info('invoice_updated', { node: node.name });
                                this.wsService.emit(node.id, 'invoice_updated', data);
                                return;
                            });
                            sub.on('error', async (err) => {
                                sub.removeAllListeners();
                                this.logger.error(`ErrorInInvoiceSubscribe: ${node.name}`, { err });
                                cbk([
                                    'ErrorInInvoiceSubscribe',
                                    { node: node.name, err },
                                ]);
                            });
                        }, callback);
                    },
                ],
                payments: [
                    'checkAvailable',
                    async ({ checkAvailable }, callback) => {
                        const disabled = this.configService.get('subscriptions.disablePayments');
                        if (disabled) {
                            this.logger.info('Payment subscriptions are disabled');
                            return;
                        }
                        const names = checkAvailable.map(a => a.name);
                        this.logger.info('Payment subscription', {
                            connections: names.join(', '),
                        });
                        return (0, async_1.each)(checkAvailable, (node, cbk) => {
                            const sub = (0, lightning_1.subscribeToPastPayments)({ lnd: node.lnd });
                            this.subscriptions.push(sub);
                            sub.on('payment', data => {
                                this.logger.info('payment', { node: node.name });
                                this.wsService.emit(node.id, 'payment', data);
                                return;
                            });
                            sub.on('error', async (err) => {
                                sub.removeAllListeners();
                                this.logger.error(`ErrorInPaymentSubscribe: ${node.name}`, { err });
                                cbk([
                                    'ErrorInPaymentSubscribe',
                                    { node: node.name, err },
                                ]);
                            });
                        }, callback);
                    },
                ],
                forwards: [
                    'checkAvailable',
                    async ({ checkAvailable }, callback) => {
                        const disabled = this.configService.get('subscriptions.disableForwards');
                        if (disabled) {
                            this.logger.info('Forward subscriptions are disabled');
                            return;
                        }
                        const names = checkAvailable.map(a => a.name);
                        this.logger.info('Forward subscription', {
                            connections: names.join(', '),
                        });
                        return (0, async_1.each)(checkAvailable, (node, cbk) => {
                            const sub = (0, lightning_1.subscribeToForwards)({ lnd: node.lnd });
                            this.subscriptions.push(sub);
                            sub.on('forward', data => {
                                this.logger.info('forward', { node: node.name });
                                this.wsService.emit(node.id, 'forward', data);
                                return;
                            });
                            sub.on('error', async (err) => {
                                sub.removeAllListeners();
                                this.logger.error(`ErrorInForwardSubscribe: ${node.name}`, { err });
                                cbk([
                                    'ErrorInForwardSubscribe',
                                    { node: node.name, err },
                                ]);
                            });
                        }, callback);
                    },
                ],
                channels: [
                    'checkAvailable',
                    async ({ checkAvailable }, callback) => {
                        const disabled = this.configService.get('subscriptions.disableChannels');
                        if (disabled) {
                            this.logger.info('Channel subscriptions are disabled');
                            return;
                        }
                        const names = checkAvailable.map(a => a.name);
                        this.logger.info('Channels subscription', {
                            connections: names.join(', '),
                        });
                        return (0, async_1.each)(checkAvailable, (node, cbk) => {
                            const sub = (0, lightning_1.subscribeToChannels)({ lnd: node.lnd });
                            this.subscriptions.push(sub);
                            sub.on('channel_active_changed', data => {
                                this.logger.info('channel_active_changed', {
                                    node: node.name,
                                });
                                this.wsService.emit(node.id, 'channel_active_changed', data);
                                return;
                            });
                            sub.on('channel_closed', data => {
                                this.logger.info('channel_closed', { node: node.name });
                                this.wsService.emit(node.id, 'channel_closed', data);
                                return;
                            });
                            sub.on('channel_opened', data => {
                                this.logger.info('channel_opened', { node: node.name });
                                this.wsService.emit(node.id, 'channel_opened', data);
                                return;
                            });
                            sub.on('channel_opening', data => {
                                this.logger.info('channel_opening', { node: node.name });
                                this.wsService.emit(node.id, 'channel_opening', data);
                                return;
                            });
                            sub.on('error', async (err) => {
                                sub.removeAllListeners();
                                this.logger.error(`ErrorInChannelSubscribe: ${node.name}`, { err });
                                cbk([
                                    'ErrorInChannelSubscribe',
                                    { node: node.name, err },
                                ]);
                            });
                        }, callback);
                    },
                ],
                backups: [
                    'checkAvailable',
                    ({ checkAvailable }, callback) => {
                        const disabled = this.configService.get('subscriptions.disableBackups');
                        if (disabled) {
                            this.logger.info('Backup subscriptions are disabled');
                            return;
                        }
                        const names = checkAvailable.map(a => a.name);
                        this.logger.info('Backup subscription', {
                            connections: names.join(', '),
                        });
                        return (0, async_1.each)(checkAvailable, (node, cbk) => {
                            let postBackupTimeoutHandle;
                            const sub = (0, lightning_1.subscribeToBackups)({ lnd: node.lnd });
                            this.subscriptions.push(sub);
                            sub.on('backup', ({ backup }) => {
                                if (!!postBackupTimeoutHandle) {
                                    clearTimeout(postBackupTimeoutHandle);
                                }
                                const { backupsEnabled } = this.userConfigService.getConfig();
                                if (!backupsEnabled) {
                                    this.logger.info('ignoring backup', {
                                        node: node.name,
                                    });
                                    return;
                                }
                                postBackupTimeoutHandle = setTimeout(async () => {
                                    const isProduction = this.configService.get('isProduction');
                                    if (!isProduction) {
                                        this.logger.info('Backups are only sent in production', { node: node.name });
                                        return;
                                    }
                                    if (node.network !== 'btc') {
                                        this.logger.info('Backups are only sent for mainnet', { node: node.name });
                                        return;
                                    }
                                    this.logger.info('backup', {
                                        node: node.name,
                                    });
                                    const { signature } = await this.nodeService.signMessage(node.id, backup);
                                    await this.ambossService.pushBackup(backup, signature);
                                }, restartSubscriptionTimeMs);
                                return;
                            });
                            sub.on('error', async (err) => {
                                sub.removeAllListeners();
                                this.logger.error(`ErrorInBackupSubscribe: ${node.name}`);
                                cbk(['ErrorInBackupSubscribe', { node: node.name, err }]);
                            });
                        }, callback);
                    },
                ],
            }, async (err, results) => {
                this.subscriptions.forEach(sub => sub.removeAllListeners());
                this.subscriptions = [];
                this.logger.error((err === null || err === void 0 ? void 0 : err.message) || '.....');
                if ((err === null || err === void 0 ? void 0 : err.message) === 'UnableToConnectToAnyNode') {
                    next('UnableToConnectToAnyNode');
                    return;
                }
                if (err) {
                    this.logger.error('AsyncAuto error:', err);
                }
                else {
                    this.logger.error('AsyncAuto results:', results);
                }
                this.retryCount = this.retryCount + 1;
                if (this.retryCount >= 4) {
                    next('Max retries attempted');
                    return;
                }
                const retryTime = restartSubscriptionTimeMs * this.retryCount;
                const message = `Restarting subscription (Retry: ${this.retryCount}) after ${retryTime} ms`;
                this.logger.warn(message);
                setTimeout(async () => {
                    this.logger.warn('Restarting...');
                    next(null, 'retry');
                }, retryTime);
            });
        }, async (err) => {
            this.logger.error('Initiating subscriptions failed: ', err);
        });
    }
};
SubService = __decorate([
    (0, common_1.Injectable)(),
    __param(6, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [amboss_service_1.AmbossService,
        accounts_service_1.AccountsService,
        ws_service_1.WsService,
        config_1.ConfigService,
        node_service_1.NodeService,
        userConfig_service_1.UserConfigService,
        winston_1.Logger])
], SubService);
exports.SubService = SubService;
//# sourceMappingURL=sub.service.js.map
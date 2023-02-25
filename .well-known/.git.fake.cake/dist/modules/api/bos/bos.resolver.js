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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BosResolver = void 0;
const fs_1 = __importDefault(require("fs"));
const network_1 = require("balanceofsatoshis/network");
const swaps_1 = require("balanceofsatoshis/swaps");
const balances_1 = require("balanceofsatoshis/balances");
const commands_1 = require("balanceofsatoshis/commands");
const graphql_1 = require("@nestjs/graphql");
const accounts_service_1 = require("../../accounts/accounts.service");
const security_decorators_1 = require("../../security/security.decorators");
const security_types_1 = require("../../security/security.types");
const winston_1 = require("winston");
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const async_1 = require("../../../utils/async");
const bos_types_1 = require("./bos.types");
const ws_service_1 = require("../../ws/ws.service");
const string_1 = require("../../../utils/string");
const async_2 = require("async");
const lightning_1 = require("lightning");
let BosResolver = class BosResolver {
    constructor(wsService, accountsService, logger) {
        this.wsService = wsService;
        this.accountsService = accountsService;
        this.logger = logger;
    }
    async getAccountingReport(user, category, currency, fiat, month, year) {
        const account = this.accountsService.getAccount(user.id);
        if (!account)
            throw new Error('Node account not found');
        this.logger.info('Generating accounting report', {
            category,
            currency,
            fiat,
            month,
            year,
        });
        const response = await (0, async_1.to)((0, balances_1.getAccountingReport)({
            lnd: account.lnd,
            logger: this.logger,
            request: commands_1.simpleRequest,
            is_csv: true,
            category,
            currency,
            fiat,
            month,
            year,
            rate_provider: 'coingecko',
        }));
        return response;
    }
    async bosRebalance(user, avoid, in_through, max_fee, max_fee_rate, max_rebalance, timeout_minutes, node, out_through, out_inbound) {
        const account = this.accountsService.getAccount(user.id);
        if (!account)
            throw new Error('Node account not found');
        const filteredParams = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ out_channels: [], avoid }, (in_through && { in_through })), (max_fee && max_fee > 0 && { max_fee })), (max_fee_rate && max_fee_rate > 0 && { max_fee_rate })), (timeout_minutes ? { timeout_minutes } : { timeout_minutes: 5 })), (max_rebalance && max_rebalance > 0
            ? { max_rebalance: `${max_rebalance}` }
            : {})), (node && { node })), (out_through && { out_through })), (out_inbound && out_inbound > 0
            ? { out_inbound: `${out_inbound}` }
            : {}));
        this.logger.info('Rebalance Params', { filteredParams });
        const logger = {
            info: (message, ...args) => {
                var _a;
                let payload = message;
                if ((_a = payload === null || payload === void 0 ? void 0 : payload.evaluating) === null || _a === void 0 ? void 0 : _a.length) {
                    payload = {
                        evaluating: payload.evaluating.map((m) => (0, string_1.stripAnsi)(m)),
                    };
                }
                this.wsService.emit(user.id, 'rebalance', payload);
                this.logger.info(message, args);
            },
            warn: (message, ...args) => {
                this.wsService.emit(user.id, 'rebalance', message);
                this.logger.warn(message, args);
            },
            error: (message, ...args) => {
                this.wsService.emit(user.id, 'rebalance', message);
                this.logger.error(message, args);
            },
        };
        const response = await (0, async_1.to)((0, swaps_1.rebalance)(Object.assign({ lnd: account.lnd, logger, fs: { getFile: fs_1.default.readFile } }, filteredParams)));
        const result = {
            increase: response.rebalance[0],
            decrease: response.rebalance[1],
            result: response.rebalance[2],
        };
        return result;
    }
    async reconnectToPeers() {
        this.logger.debug('Reconnecting to disconnected peers for all nodes.');
        await (0, async_2.auto)({
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
                    return (0, async_2.map)(getNodes, async ({ lnd, id }) => {
                        try {
                            const info = await (0, lightning_1.getWalletInfo)({ lnd });
                            const sliced = info.public_key.slice(0, 10);
                            const name = `${info.alias}(${sliced})`;
                            return {
                                id,
                                name,
                                pubkey: info.public_key,
                                lnd,
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
                        throw new Error('No nodes available to try reconnecting to disconnected peers.');
                    }
                    const names = unique.map(a => a.name);
                    this.logger.silly(`Connected to ${names.join(', ')} for peer reconnection`);
                    return unique;
                },
            ],
            reconnectToNodes: [
                'checkAvailable',
                async ({ checkAvailable }) => {
                    await (0, async_2.each)(checkAvailable, async ({ lnd, name }) => {
                        try {
                            await (0, network_1.reconnect)({ lnd });
                        }
                        catch (error) {
                            this.logger.error('Error reconnecting to peers', {
                                node: name,
                                error,
                            });
                        }
                    });
                },
            ],
        })
            .then(result => {
            const nodes = result.checkAvailable.length;
            this.logger.silly(`Finished reconnecting to peers for ${nodes} node${nodes.length > 1 ? 's' : ''}.`);
        })
            .catch(error => {
            this.logger.error(error.message);
        });
    }
};
__decorate([
    (0, graphql_1.Query)(() => String),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('category', { nullable: true })),
    __param(2, (0, graphql_1.Args)('currency', { nullable: true })),
    __param(3, (0, graphql_1.Args)('fiat', { nullable: true })),
    __param(4, (0, graphql_1.Args)('month', { nullable: true })),
    __param(5, (0, graphql_1.Args)('year', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], BosResolver.prototype, "getAccountingReport", null);
__decorate([
    (0, graphql_1.Mutation)(() => bos_types_1.BosRebalanceResult),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('avoid', { nullable: true, type: () => [String] })),
    __param(2, (0, graphql_1.Args)('in_through', { nullable: true })),
    __param(3, (0, graphql_1.Args)('max_fee', { nullable: true })),
    __param(4, (0, graphql_1.Args)('max_fee_rate', { nullable: true })),
    __param(5, (0, graphql_1.Args)('max_rebalance', { nullable: true })),
    __param(6, (0, graphql_1.Args)('timeout_minutes', { nullable: true })),
    __param(7, (0, graphql_1.Args)('node', { nullable: true })),
    __param(8, (0, graphql_1.Args)('out_through', { nullable: true })),
    __param(9, (0, graphql_1.Args)('out_inbound', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId, Array, String, Number, Number, Number, Number, String, String, Number]),
    __metadata("design:returntype", Promise)
], BosResolver.prototype, "bosRebalance", null);
BosResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __param(2, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [ws_service_1.WsService,
        accounts_service_1.AccountsService,
        winston_1.Logger])
], BosResolver);
exports.BosResolver = BosResolver;
//# sourceMappingURL=bos.resolver.js.map
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
exports.ChainResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const node_service_1 = require("../../node/node.service");
const security_decorators_1 = require("../../security/security.decorators");
const security_types_1 = require("../../security/security.types");
const lodash_1 = require("lodash");
const chain_types_1 = require("./chain.types");
const winston_1 = require("winston");
const nest_winston_1 = require("nest-winston");
const common_1 = require("@nestjs/common");
let ChainResolver = class ChainResolver {
    constructor(nodeService, logger) {
        this.nodeService = nodeService;
        this.logger = logger;
    }
    async getChainTransactions({ id }) {
        const transactionList = await this.nodeService.getChainTransactions(id);
        const transactions = (0, lodash_1.sortBy)(transactionList.transactions, 'created_at').reverse();
        return transactions;
    }
    async getUtxos({ id }) {
        const info = await this.nodeService.getUtxos(id);
        return info === null || info === void 0 ? void 0 : info.utxos;
    }
    async createAddress(type, { id }) {
        const isValidType = ['np2wpkh', 'p2tr', 'p2wpkh'].includes(type);
        this.logger.debug('Creating onchain address', { type });
        const { address } = await this.nodeService.createChainAddress(id, true, (isValidType ? type : 'p2wpkh'));
        return address;
    }
    async sendToAddress(address, tokens, fee, target, sendAllFlag, { id }) {
        const props = fee
            ? { fee_tokens_per_vbyte: fee }
            : target
                ? { target_confirmations: target }
                : {};
        const hasTokens = tokens && !sendAllFlag ? { tokens } : {};
        const sendAll = sendAllFlag ? { is_send_all: true } : {};
        const options = Object.assign(Object.assign(Object.assign({ address }, hasTokens), props), sendAll);
        const send = await this.nodeService.sendToChainAddress(id, options);
        return Object.assign({ confirmationCount: send.confirmation_count, id: send.id, isConfirmed: send.is_confirmed, isOutgoing: send.is_outgoing }, (send.tokens && { tokens: send.tokens }));
    }
};
__decorate([
    (0, graphql_1.Query)(() => [chain_types_1.ChainTransaction]),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], ChainResolver.prototype, "getChainTransactions", null);
__decorate([
    (0, graphql_1.Query)(() => [chain_types_1.Utxo]),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], ChainResolver.prototype, "getUtxos", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('type', { defaultValue: 'p2wpkh' })),
    __param(1, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], ChainResolver.prototype, "createAddress", null);
__decorate([
    (0, graphql_1.Mutation)(() => chain_types_1.ChainAddressSend),
    __param(0, (0, graphql_1.Args)('address')),
    __param(1, (0, graphql_1.Args)('tokens', { nullable: true })),
    __param(2, (0, graphql_1.Args)('fee', { nullable: true })),
    __param(3, (0, graphql_1.Args)('target', { nullable: true })),
    __param(4, (0, graphql_1.Args)('sendAll', { nullable: true })),
    __param(5, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Number, Boolean, security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], ChainResolver.prototype, "sendToAddress", null);
ChainResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [node_service_1.NodeService,
        winston_1.Logger])
], ChainResolver);
exports.ChainResolver = ChainResolver;
//# sourceMappingURL=chain.resolver.js.map
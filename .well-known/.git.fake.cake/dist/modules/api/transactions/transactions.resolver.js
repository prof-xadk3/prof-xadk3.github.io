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
exports.TransactionsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const customRecords_1 = require("../../../utils/customRecords");
const node_service_1 = require("../../node/node.service");
const security_decorators_1 = require("../../security/security.decorators");
const security_types_1 = require("../../security/security.types");
const transactions_types_1 = require("./transactions.types");
let TransactionsResolver = class TransactionsResolver {
    constructor(nodeService) {
        this.nodeService = nodeService;
    }
    async getInvoices(user, token) {
        const { next, invoices } = await this.nodeService.getInvoices(user.id, Object.assign({}, (token ? { token } : { limit: 50 })));
        const mapped = invoices.map(invoice => (Object.assign(Object.assign({}, invoice), { type: 'invoice', date: invoice.confirmed_at || invoice.created_at, payments: invoice.payments.map(p => (Object.assign(Object.assign({}, p), { messages: (0, customRecords_1.decodeMessages)(p.messages) }))) })));
        return { next, invoices: mapped };
    }
    async getPayments(user, token) {
        const { next, payments } = await this.nodeService.getPayments(user.id, Object.assign({}, (token ? { token } : { limit: 10 })));
        const mapped = payments.map(payment => (Object.assign(Object.assign({}, payment), { type: 'payment', date: payment.created_at, destination_node: { publicKey: payment.destination }, hops: [...payment.hops.map(hop => ({ publicKey: hop }))] })));
        return { next, payments: mapped };
    }
};
__decorate([
    (0, graphql_1.Query)(() => transactions_types_1.GetInvoicesType),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('token', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId, String]),
    __metadata("design:returntype", Promise)
], TransactionsResolver.prototype, "getInvoices", null);
__decorate([
    (0, graphql_1.Query)(() => transactions_types_1.GetPaymentsType),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('token', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId, String]),
    __metadata("design:returntype", Promise)
], TransactionsResolver.prototype, "getPayments", null);
TransactionsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [node_service_1.NodeService])
], TransactionsResolver);
exports.TransactionsResolver = TransactionsResolver;
//# sourceMappingURL=transactions.resolver.js.map
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
exports.GetPaymentsType = exports.GetInvoicesType = exports.PaymentType = exports.InvoiceType = exports.InvoicePayment = exports.MessageType = void 0;
const graphql_1 = require("@nestjs/graphql");
const node_types_1 = require("../node/node.types");
let MessageType = class MessageType {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], MessageType.prototype, "message", void 0);
MessageType = __decorate([
    (0, graphql_1.ObjectType)()
], MessageType);
exports.MessageType = MessageType;
let InvoicePayment = class InvoicePayment {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], InvoicePayment.prototype, "canceled_at", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], InvoicePayment.prototype, "confirmed_at", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], InvoicePayment.prototype, "created_at", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], InvoicePayment.prototype, "created_height", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], InvoicePayment.prototype, "is_canceled", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], InvoicePayment.prototype, "is_confirmed", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], InvoicePayment.prototype, "is_held", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], InvoicePayment.prototype, "mtokens", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], InvoicePayment.prototype, "pending_index", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], InvoicePayment.prototype, "timeout", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], InvoicePayment.prototype, "tokens", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], InvoicePayment.prototype, "total_mtokens", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], InvoicePayment.prototype, "in_channel", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", MessageType)
], InvoicePayment.prototype, "messages", void 0);
InvoicePayment = __decorate([
    (0, graphql_1.ObjectType)()
], InvoicePayment);
exports.InvoicePayment = InvoicePayment;
let InvoiceType = class InvoiceType {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], InvoiceType.prototype, "chain_address", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], InvoiceType.prototype, "confirmed_at", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], InvoiceType.prototype, "created_at", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], InvoiceType.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], InvoiceType.prototype, "description_hash", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], InvoiceType.prototype, "expires_at", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], InvoiceType.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], InvoiceType.prototype, "is_canceled", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], InvoiceType.prototype, "is_confirmed", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], InvoiceType.prototype, "is_held", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], InvoiceType.prototype, "is_private", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], InvoiceType.prototype, "is_push", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], InvoiceType.prototype, "received", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], InvoiceType.prototype, "received_mtokens", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], InvoiceType.prototype, "request", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], InvoiceType.prototype, "secret", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], InvoiceType.prototype, "tokens", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], InvoiceType.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], InvoiceType.prototype, "date", void 0);
__decorate([
    (0, graphql_1.Field)(() => [InvoicePayment]),
    __metadata("design:type", Array)
], InvoiceType.prototype, "payments", void 0);
InvoiceType = __decorate([
    (0, graphql_1.ObjectType)()
], InvoiceType);
exports.InvoiceType = InvoiceType;
let PaymentType = class PaymentType {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PaymentType.prototype, "created_at", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PaymentType.prototype, "destination", void 0);
__decorate([
    (0, graphql_1.Field)(() => node_types_1.Node),
    __metadata("design:type", node_types_1.Node)
], PaymentType.prototype, "destination_node", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PaymentType.prototype, "fee", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PaymentType.prototype, "fee_mtokens", void 0);
__decorate([
    (0, graphql_1.Field)(() => [node_types_1.Node]),
    __metadata("design:type", Array)
], PaymentType.prototype, "hops", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PaymentType.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], PaymentType.prototype, "index", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], PaymentType.prototype, "is_confirmed", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], PaymentType.prototype, "is_outgoing", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PaymentType.prototype, "mtokens", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PaymentType.prototype, "request", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PaymentType.prototype, "safe_fee", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], PaymentType.prototype, "safe_tokens", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PaymentType.prototype, "secret", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PaymentType.prototype, "tokens", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PaymentType.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PaymentType.prototype, "date", void 0);
PaymentType = __decorate([
    (0, graphql_1.ObjectType)()
], PaymentType);
exports.PaymentType = PaymentType;
let GetInvoicesType = class GetInvoicesType {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], GetInvoicesType.prototype, "next", void 0);
__decorate([
    (0, graphql_1.Field)(() => [InvoiceType]),
    __metadata("design:type", Array)
], GetInvoicesType.prototype, "invoices", void 0);
GetInvoicesType = __decorate([
    (0, graphql_1.ObjectType)()
], GetInvoicesType);
exports.GetInvoicesType = GetInvoicesType;
let GetPaymentsType = class GetPaymentsType {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], GetPaymentsType.prototype, "next", void 0);
__decorate([
    (0, graphql_1.Field)(() => [PaymentType]),
    __metadata("design:type", Array)
], GetPaymentsType.prototype, "payments", void 0);
GetPaymentsType = __decorate([
    (0, graphql_1.ObjectType)()
], GetPaymentsType);
exports.GetPaymentsType = GetPaymentsType;
//# sourceMappingURL=transactions.types.js.map
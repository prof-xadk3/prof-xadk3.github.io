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
exports.PayInvoice = exports.Hops = exports.CreateInvoice = exports.DecodeInvoice = exports.Route = void 0;
const graphql_1 = require("@nestjs/graphql");
const node_types_1 = require("../node/node.types");
let Route = class Route {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Route.prototype, "base_fee_mtokens", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Route.prototype, "channel", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], Route.prototype, "cltv_delta", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], Route.prototype, "fee_rate", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Route.prototype, "public_key", void 0);
Route = __decorate([
    (0, graphql_1.ObjectType)()
], Route);
exports.Route = Route;
let DecodeInvoice = class DecodeInvoice {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DecodeInvoice.prototype, "chain_address", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], DecodeInvoice.prototype, "cltv_delta", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], DecodeInvoice.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DecodeInvoice.prototype, "description_hash", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], DecodeInvoice.prototype, "destination", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], DecodeInvoice.prototype, "expires_at", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], DecodeInvoice.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], DecodeInvoice.prototype, "mtokens", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DecodeInvoice.prototype, "payment", void 0);
__decorate([
    (0, graphql_1.Field)(() => [[Route]]),
    __metadata("design:type", Array)
], DecodeInvoice.prototype, "routes", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], DecodeInvoice.prototype, "safe_tokens", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], DecodeInvoice.prototype, "tokens", void 0);
__decorate([
    (0, graphql_1.Field)(() => node_types_1.Node, { nullable: true }),
    __metadata("design:type", node_types_1.Node)
], DecodeInvoice.prototype, "destination_node", void 0);
DecodeInvoice = __decorate([
    (0, graphql_1.ObjectType)()
], DecodeInvoice);
exports.DecodeInvoice = DecodeInvoice;
let CreateInvoice = class CreateInvoice {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateInvoice.prototype, "chain_address", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateInvoice.prototype, "created_at", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateInvoice.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateInvoice.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateInvoice.prototype, "mtokens", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateInvoice.prototype, "request", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateInvoice.prototype, "secret", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], CreateInvoice.prototype, "tokens", void 0);
CreateInvoice = __decorate([
    (0, graphql_1.ObjectType)()
], CreateInvoice);
exports.CreateInvoice = CreateInvoice;
let Hops = class Hops {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Hops.prototype, "channel", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Hops.prototype, "channel_capacity", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Hops.prototype, "fee_mtokens", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Hops.prototype, "forward_mtokens", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Hops.prototype, "timeout", void 0);
Hops = __decorate([
    (0, graphql_1.ObjectType)()
], Hops);
exports.Hops = Hops;
let PayInvoice = class PayInvoice {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PayInvoice.prototype, "fee", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PayInvoice.prototype, "fee_mtokens", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Hops]),
    __metadata("design:type", Array)
], PayInvoice.prototype, "hops", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PayInvoice.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], PayInvoice.prototype, "is_confirmed", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], PayInvoice.prototype, "is_outgoing", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PayInvoice.prototype, "mtokens", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PayInvoice.prototype, "secret", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PayInvoice.prototype, "safe_fee", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PayInvoice.prototype, "safe_tokens", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PayInvoice.prototype, "tokens", void 0);
PayInvoice = __decorate([
    (0, graphql_1.ObjectType)()
], PayInvoice);
exports.PayInvoice = PayInvoice;
//# sourceMappingURL=invoices.types.js.map
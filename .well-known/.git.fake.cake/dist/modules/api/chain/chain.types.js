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
exports.ChainAddressSend = exports.ChainTransaction = exports.Utxo = void 0;
const graphql_1 = require("@nestjs/graphql");
let Utxo = class Utxo {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Utxo.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Utxo.prototype, "address_format", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Utxo.prototype, "confirmation_count", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Utxo.prototype, "output_script", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Utxo.prototype, "tokens", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Utxo.prototype, "transaction_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Utxo.prototype, "transaction_vout", void 0);
Utxo = __decorate([
    (0, graphql_1.ObjectType)()
], Utxo);
exports.Utxo = Utxo;
let ChainTransaction = class ChainTransaction {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ChainTransaction.prototype, "block_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], ChainTransaction.prototype, "confirmation_count", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], ChainTransaction.prototype, "confirmation_height", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ChainTransaction.prototype, "created_at", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ChainTransaction.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], ChainTransaction.prototype, "fee", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ChainTransaction.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], ChainTransaction.prototype, "is_confirmed", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], ChainTransaction.prototype, "is_outgoing", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], ChainTransaction.prototype, "output_addresses", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], ChainTransaction.prototype, "tokens", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ChainTransaction.prototype, "transaction", void 0);
ChainTransaction = __decorate([
    (0, graphql_1.ObjectType)()
], ChainTransaction);
exports.ChainTransaction = ChainTransaction;
let ChainAddressSend = class ChainAddressSend {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], ChainAddressSend.prototype, "confirmationCount", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ChainAddressSend.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], ChainAddressSend.prototype, "isConfirmed", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], ChainAddressSend.prototype, "isOutgoing", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], ChainAddressSend.prototype, "tokens", void 0);
ChainAddressSend = __decorate([
    (0, graphql_1.ObjectType)()
], ChainAddressSend);
exports.ChainAddressSend = ChainAddressSend;
//# sourceMappingURL=chain.types.js.map
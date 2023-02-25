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
exports.CreateBoltzReverseSwapType = exports.BoltzSwap = exports.BoltzSwapStatus = exports.BoltzSwapTransaction = exports.BoltzInfoType = void 0;
const graphql_1 = require("@nestjs/graphql");
const invoices_types_1 = require("../invoices/invoices.types");
let BoltzInfoType = class BoltzInfoType {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], BoltzInfoType.prototype, "max", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], BoltzInfoType.prototype, "min", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], BoltzInfoType.prototype, "feePercent", void 0);
BoltzInfoType = __decorate([
    (0, graphql_1.ObjectType)()
], BoltzInfoType);
exports.BoltzInfoType = BoltzInfoType;
let BoltzSwapTransaction = class BoltzSwapTransaction {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BoltzSwapTransaction.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BoltzSwapTransaction.prototype, "hex", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], BoltzSwapTransaction.prototype, "eta", void 0);
BoltzSwapTransaction = __decorate([
    (0, graphql_1.ObjectType)()
], BoltzSwapTransaction);
exports.BoltzSwapTransaction = BoltzSwapTransaction;
let BoltzSwapStatus = class BoltzSwapStatus {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BoltzSwapStatus.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => BoltzSwapTransaction, { nullable: true }),
    __metadata("design:type", BoltzSwapTransaction)
], BoltzSwapStatus.prototype, "transaction", void 0);
BoltzSwapStatus = __decorate([
    (0, graphql_1.ObjectType)()
], BoltzSwapStatus);
exports.BoltzSwapStatus = BoltzSwapStatus;
let BoltzSwap = class BoltzSwap {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BoltzSwap.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => BoltzSwapStatus, { nullable: true }),
    __metadata("design:type", BoltzSwapStatus)
], BoltzSwap.prototype, "boltz", void 0);
BoltzSwap = __decorate([
    (0, graphql_1.ObjectType)()
], BoltzSwap);
exports.BoltzSwap = BoltzSwap;
let CreateBoltzReverseSwapType = class CreateBoltzReverseSwapType {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateBoltzReverseSwapType.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateBoltzReverseSwapType.prototype, "invoice", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateBoltzReverseSwapType.prototype, "redeemScript", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateBoltzReverseSwapType.prototype, "onchainAmount", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateBoltzReverseSwapType.prototype, "timeoutBlockHeight", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateBoltzReverseSwapType.prototype, "lockupAddress", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateBoltzReverseSwapType.prototype, "minerFeeInvoice", void 0);
__decorate([
    (0, graphql_1.Field)(() => invoices_types_1.DecodeInvoice, { nullable: true }),
    __metadata("design:type", invoices_types_1.DecodeInvoice)
], CreateBoltzReverseSwapType.prototype, "decodedInvoice", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateBoltzReverseSwapType.prototype, "receivingAddress", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateBoltzReverseSwapType.prototype, "preimage", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateBoltzReverseSwapType.prototype, "preimageHash", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateBoltzReverseSwapType.prototype, "privateKey", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateBoltzReverseSwapType.prototype, "publicKey", void 0);
CreateBoltzReverseSwapType = __decorate([
    (0, graphql_1.ObjectType)()
], CreateBoltzReverseSwapType);
exports.CreateBoltzReverseSwapType = CreateBoltzReverseSwapType;
//# sourceMappingURL=boltz.types.js.map
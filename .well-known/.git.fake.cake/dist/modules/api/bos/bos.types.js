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
exports.BosRebalanceResult = void 0;
const graphql_1 = require("@nestjs/graphql");
let BosIncrease = class BosIncrease {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BosIncrease.prototype, "increased_inbound_on", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BosIncrease.prototype, "liquidity_inbound", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BosIncrease.prototype, "liquidity_inbound_opening", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BosIncrease.prototype, "liquidity_inbound_pending", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BosIncrease.prototype, "liquidity_outbound", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BosIncrease.prototype, "liquidity_outbound_opening", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BosIncrease.prototype, "liquidity_outbound_pending", void 0);
BosIncrease = __decorate([
    (0, graphql_1.ObjectType)()
], BosIncrease);
let BosDecrease = class BosDecrease {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BosDecrease.prototype, "decreased_inbound_on", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BosDecrease.prototype, "liquidity_inbound", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BosDecrease.prototype, "liquidity_inbound_opening", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BosDecrease.prototype, "liquidity_inbound_pending", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BosDecrease.prototype, "liquidity_outbound", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BosDecrease.prototype, "liquidity_outbound_opening", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BosDecrease.prototype, "liquidity_outbound_pending", void 0);
BosDecrease = __decorate([
    (0, graphql_1.ObjectType)()
], BosDecrease);
let BosResult = class BosResult {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BosResult.prototype, "rebalanced", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BosResult.prototype, "rebalance_fees_spent", void 0);
BosResult = __decorate([
    (0, graphql_1.ObjectType)()
], BosResult);
let BosRebalanceResult = class BosRebalanceResult {
};
__decorate([
    (0, graphql_1.Field)(() => BosIncrease, { nullable: true }),
    __metadata("design:type", BosIncrease)
], BosRebalanceResult.prototype, "increase", void 0);
__decorate([
    (0, graphql_1.Field)(() => BosDecrease, { nullable: true }),
    __metadata("design:type", BosDecrease)
], BosRebalanceResult.prototype, "decrease", void 0);
__decorate([
    (0, graphql_1.Field)(() => BosResult, { nullable: true }),
    __metadata("design:type", BosResult)
], BosRebalanceResult.prototype, "result", void 0);
BosRebalanceResult = __decorate([
    (0, graphql_1.ObjectType)()
], BosRebalanceResult);
exports.BosRebalanceResult = BosRebalanceResult;
//# sourceMappingURL=bos.types.js.map
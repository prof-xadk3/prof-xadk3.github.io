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
exports.ChannelsFeeHealth = exports.ChannelFeeHealth = exports.FeeHealth = exports.ChannelsTimeHealth = exports.ChannelTimeHealth = exports.ChannelsHealth = exports.ChannelHealth = void 0;
const graphql_1 = require("@nestjs/graphql");
const node_types_1 = require("../node/node.types");
let ChannelHealth = class ChannelHealth {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ChannelHealth.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], ChannelHealth.prototype, "score", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ChannelHealth.prototype, "volumeNormalized", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ChannelHealth.prototype, "averageVolumeNormalized", void 0);
__decorate([
    (0, graphql_1.Field)(() => node_types_1.Node, { nullable: true }),
    __metadata("design:type", node_types_1.Node)
], ChannelHealth.prototype, "partner", void 0);
ChannelHealth = __decorate([
    (0, graphql_1.ObjectType)()
], ChannelHealth);
exports.ChannelHealth = ChannelHealth;
let ChannelsHealth = class ChannelsHealth {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], ChannelsHealth.prototype, "score", void 0);
__decorate([
    (0, graphql_1.Field)(() => [ChannelHealth], { nullable: true }),
    __metadata("design:type", Array)
], ChannelsHealth.prototype, "channels", void 0);
ChannelsHealth = __decorate([
    (0, graphql_1.ObjectType)()
], ChannelsHealth);
exports.ChannelsHealth = ChannelsHealth;
let ChannelTimeHealth = class ChannelTimeHealth {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ChannelTimeHealth.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], ChannelTimeHealth.prototype, "score", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], ChannelTimeHealth.prototype, "significant", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], ChannelTimeHealth.prototype, "monitoredTime", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], ChannelTimeHealth.prototype, "monitoredUptime", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], ChannelTimeHealth.prototype, "monitoredDowntime", void 0);
__decorate([
    (0, graphql_1.Field)(() => node_types_1.Node, { nullable: true }),
    __metadata("design:type", node_types_1.Node)
], ChannelTimeHealth.prototype, "partner", void 0);
ChannelTimeHealth = __decorate([
    (0, graphql_1.ObjectType)()
], ChannelTimeHealth);
exports.ChannelTimeHealth = ChannelTimeHealth;
let ChannelsTimeHealth = class ChannelsTimeHealth {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], ChannelsTimeHealth.prototype, "score", void 0);
__decorate([
    (0, graphql_1.Field)(() => [ChannelTimeHealth], { nullable: true }),
    __metadata("design:type", Array)
], ChannelsTimeHealth.prototype, "channels", void 0);
ChannelsTimeHealth = __decorate([
    (0, graphql_1.ObjectType)()
], ChannelsTimeHealth);
exports.ChannelsTimeHealth = ChannelsTimeHealth;
let FeeHealth = class FeeHealth {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], FeeHealth.prototype, "score", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], FeeHealth.prototype, "rate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], FeeHealth.prototype, "base", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], FeeHealth.prototype, "rateScore", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], FeeHealth.prototype, "baseScore", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], FeeHealth.prototype, "rateOver", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], FeeHealth.prototype, "baseOver", void 0);
FeeHealth = __decorate([
    (0, graphql_1.ObjectType)()
], FeeHealth);
exports.FeeHealth = FeeHealth;
let ChannelFeeHealth = class ChannelFeeHealth {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ChannelFeeHealth.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => FeeHealth, { nullable: true }),
    __metadata("design:type", FeeHealth)
], ChannelFeeHealth.prototype, "partnerSide", void 0);
__decorate([
    (0, graphql_1.Field)(() => FeeHealth, { nullable: true }),
    __metadata("design:type", FeeHealth)
], ChannelFeeHealth.prototype, "mySide", void 0);
__decorate([
    (0, graphql_1.Field)(() => node_types_1.Node, { nullable: true }),
    __metadata("design:type", node_types_1.Node)
], ChannelFeeHealth.prototype, "partner", void 0);
ChannelFeeHealth = __decorate([
    (0, graphql_1.ObjectType)()
], ChannelFeeHealth);
exports.ChannelFeeHealth = ChannelFeeHealth;
let ChannelsFeeHealth = class ChannelsFeeHealth {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], ChannelsFeeHealth.prototype, "score", void 0);
__decorate([
    (0, graphql_1.Field)(() => [ChannelFeeHealth], { nullable: true }),
    __metadata("design:type", Array)
], ChannelsFeeHealth.prototype, "channels", void 0);
ChannelsFeeHealth = __decorate([
    (0, graphql_1.ObjectType)()
], ChannelsFeeHealth);
exports.ChannelsFeeHealth = ChannelsFeeHealth;
//# sourceMappingURL=health.types.js.map
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
exports.Balances = exports.LightningBalance = exports.OnChainBalance = exports.NodeInfo = exports.Node = exports.NodeType = void 0;
const graphql_1 = require("@nestjs/graphql");
let NodeType = class NodeType {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], NodeType.prototype, "alias", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], NodeType.prototype, "public_key", void 0);
NodeType = __decorate([
    (0, graphql_1.ObjectType)()
], NodeType);
exports.NodeType = NodeType;
let Node = class Node {
};
__decorate([
    (0, graphql_1.Field)(() => NodeType, { nullable: true }),
    __metadata("design:type", NodeType)
], Node.prototype, "node", void 0);
Node = __decorate([
    (0, graphql_1.ObjectType)()
], Node);
exports.Node = Node;
let NodeInfo = class NodeInfo {
};
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], NodeInfo.prototype, "chains", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], NodeInfo.prototype, "color", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], NodeInfo.prototype, "active_channels_count", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], NodeInfo.prototype, "closed_channels_count", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], NodeInfo.prototype, "alias", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], NodeInfo.prototype, "current_block_hash", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], NodeInfo.prototype, "current_block_height", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], NodeInfo.prototype, "is_synced_to_chain", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], NodeInfo.prototype, "is_synced_to_graph", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], NodeInfo.prototype, "latest_block_at", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], NodeInfo.prototype, "peers_count", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], NodeInfo.prototype, "pending_channels_count", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], NodeInfo.prototype, "public_key", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], NodeInfo.prototype, "uris", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], NodeInfo.prototype, "version", void 0);
NodeInfo = __decorate([
    (0, graphql_1.ObjectType)()
], NodeInfo);
exports.NodeInfo = NodeInfo;
let OnChainBalance = class OnChainBalance {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], OnChainBalance.prototype, "confirmed", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], OnChainBalance.prototype, "pending", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], OnChainBalance.prototype, "closing", void 0);
OnChainBalance = __decorate([
    (0, graphql_1.ObjectType)()
], OnChainBalance);
exports.OnChainBalance = OnChainBalance;
let LightningBalance = class LightningBalance {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LightningBalance.prototype, "confirmed", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LightningBalance.prototype, "active", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LightningBalance.prototype, "commit", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LightningBalance.prototype, "pending", void 0);
LightningBalance = __decorate([
    (0, graphql_1.ObjectType)()
], LightningBalance);
exports.LightningBalance = LightningBalance;
let Balances = class Balances {
};
__decorate([
    (0, graphql_1.Field)(() => OnChainBalance),
    __metadata("design:type", OnChainBalance)
], Balances.prototype, "onchain", void 0);
__decorate([
    (0, graphql_1.Field)(() => LightningBalance),
    __metadata("design:type", LightningBalance)
], Balances.prototype, "lightning", void 0);
Balances = __decorate([
    (0, graphql_1.ObjectType)()
], Balances);
exports.Balances = Balances;
//# sourceMappingURL=node.types.js.map
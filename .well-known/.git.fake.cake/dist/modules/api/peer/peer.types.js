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
exports.Peer = void 0;
const graphql_1 = require("@nestjs/graphql");
const node_types_1 = require("../node/node.types");
let Peer = class Peer {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Peer.prototype, "bytes_received", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Peer.prototype, "bytes_sent", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Peer.prototype, "is_inbound", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], Peer.prototype, "is_sync_peer", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Peer.prototype, "ping_time", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Peer.prototype, "public_key", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Peer.prototype, "socket", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Peer.prototype, "tokens_received", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Peer.prototype, "tokens_sent", void 0);
__decorate([
    (0, graphql_1.Field)(() => node_types_1.Node),
    __metadata("design:type", node_types_1.Node)
], Peer.prototype, "partner_node_info", void 0);
Peer = __decorate([
    (0, graphql_1.ObjectType)()
], Peer);
exports.Peer = Peer;
//# sourceMappingURL=peer.types.js.map
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
exports.Wallet = void 0;
const graphql_1 = require("@nestjs/graphql");
let Wallet = class Wallet {
};
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], Wallet.prototype, "build_tags", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Wallet.prototype, "commit_hash", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Wallet.prototype, "is_autopilotrpc_enabled", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Wallet.prototype, "is_chainrpc_enabled", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Wallet.prototype, "is_invoicesrpc_enabled", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Wallet.prototype, "is_signrpc_enabled", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Wallet.prototype, "is_walletrpc_enabled", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Wallet.prototype, "is_watchtowerrpc_enabled", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Wallet.prototype, "is_wtclientrpc_enabled", void 0);
Wallet = __decorate([
    (0, graphql_1.ObjectType)()
], Wallet);
exports.Wallet = Wallet;
//# sourceMappingURL=wallet.types.js.map
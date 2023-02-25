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
exports.WalletResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const node_service_1 = require("../../node/node.service");
const security_decorators_1 = require("../../security/security.decorators");
const security_types_1 = require("../../security/security.types");
const wallet_types_1 = require("./wallet.types");
let WalletResolver = class WalletResolver {
    constructor(nodeService) {
        this.nodeService = nodeService;
    }
    async getWalletInfo({ id }) {
        return this.nodeService.getWalletVersion(id);
    }
};
__decorate([
    (0, graphql_1.Query)(() => wallet_types_1.Wallet),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], WalletResolver.prototype, "getWalletInfo", null);
WalletResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [node_service_1.NodeService])
], WalletResolver);
exports.WalletResolver = WalletResolver;
//# sourceMappingURL=wallet.resolver.js.map
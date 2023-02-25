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
exports.PaySuccess = exports.LnUrlRequestUnion = exports.ChannelRequest = exports.WithdrawRequest = exports.AuthResponse = exports.PayRequest = void 0;
const graphql_1 = require("@nestjs/graphql");
let PayRequest = class PayRequest {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PayRequest.prototype, "callback", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PayRequest.prototype, "maxSendable", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PayRequest.prototype, "minSendable", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PayRequest.prototype, "metadata", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], PayRequest.prototype, "commentAllowed", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PayRequest.prototype, "tag", void 0);
PayRequest = __decorate([
    (0, graphql_1.ObjectType)()
], PayRequest);
exports.PayRequest = PayRequest;
let AuthResponse = class AuthResponse {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AuthResponse.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AuthResponse.prototype, "message", void 0);
AuthResponse = __decorate([
    (0, graphql_1.ObjectType)()
], AuthResponse);
exports.AuthResponse = AuthResponse;
let WithdrawRequest = class WithdrawRequest {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], WithdrawRequest.prototype, "callback", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], WithdrawRequest.prototype, "k1", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], WithdrawRequest.prototype, "maxWithdrawable", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], WithdrawRequest.prototype, "defaultDescription", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], WithdrawRequest.prototype, "minWithdrawable", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], WithdrawRequest.prototype, "tag", void 0);
WithdrawRequest = __decorate([
    (0, graphql_1.ObjectType)()
], WithdrawRequest);
exports.WithdrawRequest = WithdrawRequest;
let ChannelRequest = class ChannelRequest {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ChannelRequest.prototype, "tag", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ChannelRequest.prototype, "k1", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ChannelRequest.prototype, "callback", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ChannelRequest.prototype, "uri", void 0);
ChannelRequest = __decorate([
    (0, graphql_1.ObjectType)()
], ChannelRequest);
exports.ChannelRequest = ChannelRequest;
exports.LnUrlRequestUnion = (0, graphql_1.createUnionType)({
    name: 'LnUrlRequest',
    types: () => [WithdrawRequest, PayRequest, ChannelRequest],
    resolveType: request => {
        if ('maxSendable' in request) {
            return PayRequest;
        }
        if ('maxWithdrawable' in request) {
            return WithdrawRequest;
        }
        if ('uri' in request) {
            return ChannelRequest;
        }
        return undefined;
    },
});
let PaySuccess = class PaySuccess {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PaySuccess.prototype, "tag", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PaySuccess.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PaySuccess.prototype, "url", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PaySuccess.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PaySuccess.prototype, "ciphertext", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PaySuccess.prototype, "iv", void 0);
PaySuccess = __decorate([
    (0, graphql_1.ObjectType)()
], PaySuccess);
exports.PaySuccess = PaySuccess;
//# sourceMappingURL=lnurl.types.js.map
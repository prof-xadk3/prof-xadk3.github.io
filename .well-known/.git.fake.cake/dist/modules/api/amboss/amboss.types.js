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
exports.LightningNodeSocialInfo = exports.NodeSocial = exports.NodeSocialInfo = exports.LightningAddress = exports.AmbossUser = exports.UserBackupInfo = exports.AmbossSubscription = void 0;
const graphql_1 = require("@nestjs/graphql");
let AmbossSubscription = class AmbossSubscription {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AmbossSubscription.prototype, "end_date", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], AmbossSubscription.prototype, "subscribed", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], AmbossSubscription.prototype, "upgradable", void 0);
AmbossSubscription = __decorate([
    (0, graphql_1.ObjectType)()
], AmbossSubscription);
exports.AmbossSubscription = AmbossSubscription;
let UserBackupInfo = class UserBackupInfo {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserBackupInfo.prototype, "last_update", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserBackupInfo.prototype, "last_update_size", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserBackupInfo.prototype, "total_size_saved", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserBackupInfo.prototype, "available_size", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserBackupInfo.prototype, "remaining_size", void 0);
UserBackupInfo = __decorate([
    (0, graphql_1.ObjectType)()
], UserBackupInfo);
exports.UserBackupInfo = UserBackupInfo;
let AmbossUser = class AmbossUser {
};
__decorate([
    (0, graphql_1.Field)(() => AmbossSubscription),
    __metadata("design:type", AmbossSubscription)
], AmbossUser.prototype, "subscription", void 0);
__decorate([
    (0, graphql_1.Field)(() => UserBackupInfo),
    __metadata("design:type", UserBackupInfo)
], AmbossUser.prototype, "backups", void 0);
AmbossUser = __decorate([
    (0, graphql_1.ObjectType)()
], AmbossUser);
exports.AmbossUser = AmbossUser;
let LightningAddress = class LightningAddress {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LightningAddress.prototype, "pubkey", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LightningAddress.prototype, "lightning_address", void 0);
LightningAddress = __decorate([
    (0, graphql_1.ObjectType)()
], LightningAddress);
exports.LightningAddress = LightningAddress;
let NodeSocialInfo = class NodeSocialInfo {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], NodeSocialInfo.prototype, "private", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NodeSocialInfo.prototype, "telegram", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NodeSocialInfo.prototype, "twitter", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], NodeSocialInfo.prototype, "twitter_verified", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NodeSocialInfo.prototype, "website", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NodeSocialInfo.prototype, "email", void 0);
NodeSocialInfo = __decorate([
    (0, graphql_1.ObjectType)()
], NodeSocialInfo);
exports.NodeSocialInfo = NodeSocialInfo;
let NodeSocial = class NodeSocial {
};
__decorate([
    (0, graphql_1.Field)(() => NodeSocialInfo, { nullable: true }),
    __metadata("design:type", NodeSocialInfo)
], NodeSocial.prototype, "info", void 0);
NodeSocial = __decorate([
    (0, graphql_1.ObjectType)()
], NodeSocial);
exports.NodeSocial = NodeSocial;
let LightningNodeSocialInfo = class LightningNodeSocialInfo {
};
__decorate([
    (0, graphql_1.Field)(() => NodeSocial, { nullable: true }),
    __metadata("design:type", NodeSocial)
], LightningNodeSocialInfo.prototype, "socials", void 0);
LightningNodeSocialInfo = __decorate([
    (0, graphql_1.ObjectType)()
], LightningNodeSocialInfo);
exports.LightningNodeSocialInfo = LightningNodeSocialInfo;
//# sourceMappingURL=amboss.types.js.map
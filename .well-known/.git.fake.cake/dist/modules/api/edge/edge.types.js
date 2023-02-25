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
exports.ChannelReport = void 0;
const graphql_1 = require("@nestjs/graphql");
let ChannelReport = class ChannelReport {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], ChannelReport.prototype, "local", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], ChannelReport.prototype, "remote", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], ChannelReport.prototype, "maxIn", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], ChannelReport.prototype, "maxOut", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], ChannelReport.prototype, "commit", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], ChannelReport.prototype, "totalPendingHtlc", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], ChannelReport.prototype, "outgoingPendingHtlc", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], ChannelReport.prototype, "incomingPendingHtlc", void 0);
ChannelReport = __decorate([
    (0, graphql_1.ObjectType)()
], ChannelReport);
exports.ChannelReport = ChannelReport;
//# sourceMappingURL=edge.types.js.map
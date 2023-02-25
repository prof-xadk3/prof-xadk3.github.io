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
exports.Forward = void 0;
const graphql_1 = require("@nestjs/graphql");
let Forward = class Forward {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Forward.prototype, "created_at", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Forward.prototype, "fee", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Forward.prototype, "fee_mtokens", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Forward.prototype, "incoming_channel", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Forward.prototype, "mtokens", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Forward.prototype, "outgoing_channel", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Forward.prototype, "tokens", void 0);
Forward = __decorate([
    (0, graphql_1.ObjectType)()
], Forward);
exports.Forward = Forward;
//# sourceMappingURL=forwards.types.js.map
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
exports.BaseInvoice = exports.BasePoints = exports.BaseNode = void 0;
const graphql_1 = require("@nestjs/graphql");
let BaseNode = class BaseNode {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BaseNode.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BaseNode.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BaseNode.prototype, "public_key", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BaseNode.prototype, "socket", void 0);
BaseNode = __decorate([
    (0, graphql_1.ObjectType)()
], BaseNode);
exports.BaseNode = BaseNode;
let BasePoints = class BasePoints {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BasePoints.prototype, "alias", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], BasePoints.prototype, "amount", void 0);
BasePoints = __decorate([
    (0, graphql_1.ObjectType)()
], BasePoints);
exports.BasePoints = BasePoints;
let BaseInvoice = class BaseInvoice {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BaseInvoice.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BaseInvoice.prototype, "request", void 0);
BaseInvoice = __decorate([
    (0, graphql_1.ObjectType)()
], BaseInvoice);
exports.BaseInvoice = BaseInvoice;
//# sourceMappingURL=base.types.js.map
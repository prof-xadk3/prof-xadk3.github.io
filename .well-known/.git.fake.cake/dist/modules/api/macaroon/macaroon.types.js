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
exports.CreateMacaroon = exports.NetworkInfoInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let NetworkInfoInput = class NetworkInfoInput {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], NetworkInfoInput.prototype, "is_ok_to_adjust_peers", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], NetworkInfoInput.prototype, "is_ok_to_create_chain_addresses", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], NetworkInfoInput.prototype, "is_ok_to_create_invoices", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], NetworkInfoInput.prototype, "is_ok_to_create_macaroons", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], NetworkInfoInput.prototype, "is_ok_to_derive_keys", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], NetworkInfoInput.prototype, "is_ok_to_get_access_ids", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], NetworkInfoInput.prototype, "is_ok_to_get_chain_transactions", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], NetworkInfoInput.prototype, "is_ok_to_get_invoices", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], NetworkInfoInput.prototype, "is_ok_to_get_wallet_info", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], NetworkInfoInput.prototype, "is_ok_to_get_payments", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], NetworkInfoInput.prototype, "is_ok_to_get_peers", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], NetworkInfoInput.prototype, "is_ok_to_pay", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], NetworkInfoInput.prototype, "is_ok_to_revoke_access_ids", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], NetworkInfoInput.prototype, "is_ok_to_send_to_chain_addresses", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], NetworkInfoInput.prototype, "is_ok_to_sign_bytes", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], NetworkInfoInput.prototype, "is_ok_to_sign_messages", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], NetworkInfoInput.prototype, "is_ok_to_stop_daemon", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], NetworkInfoInput.prototype, "is_ok_to_verify_bytes_signatures", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], NetworkInfoInput.prototype, "is_ok_to_verify_messages", void 0);
NetworkInfoInput = __decorate([
    (0, graphql_1.InputType)()
], NetworkInfoInput);
exports.NetworkInfoInput = NetworkInfoInput;
let CreateMacaroon = class CreateMacaroon {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateMacaroon.prototype, "base", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateMacaroon.prototype, "hex", void 0);
CreateMacaroon = __decorate([
    (0, graphql_1.ObjectType)()
], CreateMacaroon);
exports.CreateMacaroon = CreateMacaroon;
//# sourceMappingURL=macaroon.types.js.map
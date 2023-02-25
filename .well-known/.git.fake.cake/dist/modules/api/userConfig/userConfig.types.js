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
exports.ConfigState = exports.ConfigFields = void 0;
const graphql_1 = require("@nestjs/graphql");
var ConfigFields;
(function (ConfigFields) {
    ConfigFields["BACKUPS"] = "BACKUPS";
    ConfigFields["HEALTHCHECKS"] = "HEALTHCHECKS";
    ConfigFields["ONCHAIN_PUSH"] = "ONCHAIN_PUSH";
    ConfigFields["CHANNELS_PUSH"] = "CHANNELS_PUSH";
    ConfigFields["PRIVATE_CHANNELS_PUSH"] = "PRIVATE_CHANNELS_PUSH";
})(ConfigFields = exports.ConfigFields || (exports.ConfigFields = {}));
let ConfigState = class ConfigState {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], ConfigState.prototype, "backup_state", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], ConfigState.prototype, "healthcheck_ping_state", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], ConfigState.prototype, "onchain_push_enabled", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], ConfigState.prototype, "channels_push_enabled", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], ConfigState.prototype, "private_channels_push_enabled", void 0);
ConfigState = __decorate([
    (0, graphql_1.ObjectType)()
], ConfigState);
exports.ConfigState = ConfigState;
//# sourceMappingURL=userConfig.types.js.map
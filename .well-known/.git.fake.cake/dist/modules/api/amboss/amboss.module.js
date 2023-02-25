"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmbossModule = void 0;
const common_1 = require("@nestjs/common");
const accounts_module_1 = require("../../accounts/accounts.module");
const fetch_module_1 = require("../../fetch/fetch.module");
const node_module_1 = require("../../node/node.module");
const userConfig_module_1 = require("../userConfig/userConfig.module");
const amboss_resolver_1 = require("./amboss.resolver");
const amboss_service_1 = require("./amboss.service");
let AmbossModule = class AmbossModule {
};
AmbossModule = __decorate([
    (0, common_1.Module)({
        imports: [userConfig_module_1.UserConfigModule, accounts_module_1.AccountsModule, node_module_1.NodeModule, fetch_module_1.FetchModule],
        providers: [amboss_resolver_1.AmbossResolver, amboss_service_1.AmbossService],
        exports: [amboss_service_1.AmbossService],
    })
], AmbossModule);
exports.AmbossModule = AmbossModule;
//# sourceMappingURL=amboss.module.js.map
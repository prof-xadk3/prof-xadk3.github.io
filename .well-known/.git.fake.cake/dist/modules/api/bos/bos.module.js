"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BosModule = void 0;
const common_1 = require("@nestjs/common");
const accounts_module_1 = require("../../accounts/accounts.module");
const ws_module_1 = require("../../ws/ws.module");
const bos_resolver_1 = require("./bos.resolver");
let BosModule = class BosModule {
};
BosModule = __decorate([
    (0, common_1.Module)({
        imports: [ws_module_1.WsModule, accounts_module_1.AccountsModule],
        providers: [bos_resolver_1.BosResolver],
    })
], BosModule);
exports.BosModule = BosModule;
//# sourceMappingURL=bos.module.js.map
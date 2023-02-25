"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubModule = void 0;
const common_1 = require("@nestjs/common");
const accounts_module_1 = require("../accounts/accounts.module");
const amboss_module_1 = require("../api/amboss/amboss.module");
const userConfig_module_1 = require("../api/userConfig/userConfig.module");
const node_module_1 = require("../node/node.module");
const ws_module_1 = require("../ws/ws.module");
const sub_service_1 = require("./sub.service");
let SubModule = class SubModule {
};
SubModule = __decorate([
    (0, common_1.Module)({
        imports: [
            userConfig_module_1.UserConfigModule,
            node_module_1.NodeModule,
            accounts_module_1.AccountsModule,
            ws_module_1.WsModule,
            amboss_module_1.AmbossModule,
        ],
        providers: [sub_service_1.SubService],
    })
], SubModule);
exports.SubModule = SubModule;
//# sourceMappingURL=sub.module.js.map
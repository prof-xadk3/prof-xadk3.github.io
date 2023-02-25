"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeModule = void 0;
const common_1 = require("@nestjs/common");
const accounts_module_1 = require("../accounts/accounts.module");
const lnd_module_1 = require("./lnd/lnd.module");
const node_service_1 = require("./node.service");
let NodeModule = class NodeModule {
};
NodeModule = __decorate([
    (0, common_1.Module)({
        imports: [lnd_module_1.LndModule, accounts_module_1.AccountsModule],
        providers: [node_service_1.NodeService],
        exports: [node_service_1.NodeService],
    })
], NodeModule);
exports.NodeModule = NodeModule;
//# sourceMappingURL=node.module.js.map
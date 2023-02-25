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
const fetch_module_1 = require("../../fetch/fetch.module");
const node_module_1 = require("../../node/node.module");
const node_resolver_1 = require("./node.resolver");
let NodeModule = class NodeModule {
};
NodeModule = __decorate([
    (0, common_1.Module)({
        imports: [fetch_module_1.FetchModule, node_module_1.NodeModule],
        providers: [
            node_resolver_1.NodeResolver,
            node_resolver_1.BalancesResolver,
            node_resolver_1.OnChainBalanceResolver,
            node_resolver_1.LightningBalanceResolver,
            node_resolver_1.NodeFieldResolver,
        ],
    })
], NodeModule);
exports.NodeModule = NodeModule;
//# sourceMappingURL=node.module.js.map
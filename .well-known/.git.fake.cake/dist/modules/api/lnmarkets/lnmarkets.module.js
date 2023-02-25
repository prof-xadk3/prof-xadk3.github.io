"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LnMarketsModule = void 0;
const common_1 = require("@nestjs/common");
const fetch_module_1 = require("../../fetch/fetch.module");
const node_module_1 = require("../../node/node.module");
const lnurl_module_1 = require("../lnurl/lnurl.module");
const lnmarkets_resolver_1 = require("./lnmarkets.resolver");
const lnmarkets_service_1 = require("./lnmarkets.service");
let LnMarketsModule = class LnMarketsModule {
};
LnMarketsModule = __decorate([
    (0, common_1.Module)({
        imports: [lnurl_module_1.LnUrlModule, node_module_1.NodeModule, fetch_module_1.FetchModule],
        providers: [lnmarkets_service_1.LnMarketsService, lnmarkets_resolver_1.LnMarketsResolver],
    })
], LnMarketsModule);
exports.LnMarketsModule = LnMarketsModule;
//# sourceMappingURL=lnmarkets.module.js.map
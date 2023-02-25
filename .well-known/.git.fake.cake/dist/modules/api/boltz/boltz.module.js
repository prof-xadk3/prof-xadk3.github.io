"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoltzModule = void 0;
const common_1 = require("@nestjs/common");
const fetch_module_1 = require("../../fetch/fetch.module");
const node_module_1 = require("../../node/node.module");
const boltz_resolver_1 = require("./boltz.resolver");
const boltz_service_1 = require("./boltz.service");
let BoltzModule = class BoltzModule {
};
BoltzModule = __decorate([
    (0, common_1.Module)({
        imports: [node_module_1.NodeModule, fetch_module_1.FetchModule],
        providers: [
            boltz_service_1.BoltzService,
            boltz_resolver_1.BoltzSwapResolver,
            boltz_resolver_1.CreateBoltzReverseSwapTypeResolver,
            boltz_resolver_1.BoltzResolver,
        ],
        exports: [boltz_service_1.BoltzService],
    })
], BoltzModule);
exports.BoltzModule = BoltzModule;
//# sourceMappingURL=boltz.module.js.map
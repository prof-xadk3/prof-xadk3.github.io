"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModule = void 0;
const common_1 = require("@nestjs/common");
const fetch_module_1 = require("../../fetch/fetch.module");
const base_resolver_1 = require("./base.resolver");
let BaseModule = class BaseModule {
};
BaseModule = __decorate([
    (0, common_1.Module)({ imports: [fetch_module_1.FetchModule], providers: [base_resolver_1.BaseResolver] })
], BaseModule);
exports.BaseModule = BaseModule;
//# sourceMappingURL=base.module.js.map
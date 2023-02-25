"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserConfigModule = void 0;
const common_1 = require("@nestjs/common");
const files_module_1 = require("../../files/files.module");
const userConfig_resolver_1 = require("./userConfig.resolver");
const userConfig_service_1 = require("./userConfig.service");
let UserConfigModule = class UserConfigModule {
};
UserConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [files_module_1.FilesModule],
        providers: [userConfig_service_1.UserConfigService, userConfig_resolver_1.UserConfigResolver, userConfig_resolver_1.UserConfigStateResolver],
        exports: [userConfig_service_1.UserConfigService],
    })
], UserConfigModule);
exports.UserConfigModule = UserConfigModule;
//# sourceMappingURL=userConfig.module.js.map
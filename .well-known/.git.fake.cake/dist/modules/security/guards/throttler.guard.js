"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GqlThrottlerGuard = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const throttler_1 = require("@nestjs/throttler");
const request_1 = require("../../../utils/request");
let GqlThrottlerGuard = class GqlThrottlerGuard extends throttler_1.ThrottlerGuard {
    async handleRequest(context, limit, ttl) {
        var _a;
        const gqlCtx = graphql_1.GqlExecutionContext.create(context);
        const { req, connection } = gqlCtx.getContext();
        const request = ((_a = connection === null || connection === void 0 ? void 0 : connection.context) === null || _a === void 0 ? void 0 : _a.req) ? connection.context.req : req;
        const ip = (0, request_1.getIp)(request);
        const key = this.generateKey(context, ip);
        const ttls = await this.storageService.getRecord(key);
        if (ttls.length >= limit) {
            throw new throttler_1.ThrottlerException();
        }
        await this.storageService.addRecord(key, ttl);
        return true;
    }
};
GqlThrottlerGuard = __decorate([
    (0, common_1.Injectable)()
], GqlThrottlerGuard);
exports.GqlThrottlerGuard = GqlThrottlerGuard;
//# sourceMappingURL=throttler.guard.js.map
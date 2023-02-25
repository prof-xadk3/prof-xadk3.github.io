"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MacaroonResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const node_service_1 = require("../../node/node.service");
const security_types_1 = require("../../security/security.types");
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const macaroon_types_1 = require("./macaroon.types");
const security_decorators_1 = require("../../security/security.decorators");
let MacaroonResolver = class MacaroonResolver {
    constructor(nodeService, logger) {
        this.nodeService = nodeService;
        this.logger = logger;
    }
    async createMacaroon(permissions, { id }) {
        const { macaroon, permissions: permissionList } = await this.nodeService.grantAccess(id, permissions);
        this.logger.debug('Macaroon created with the following permissions', {
            permissions: permissionList.join(', '),
        });
        const hex = Buffer.from(macaroon, 'base64').toString('hex');
        return { base: macaroon, hex };
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => macaroon_types_1.CreateMacaroon),
    __param(0, (0, graphql_1.Args)('permissions')),
    __param(1, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [macaroon_types_1.NetworkInfoInput,
        security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], MacaroonResolver.prototype, "createMacaroon", null);
MacaroonResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [node_service_1.NodeService,
        winston_1.Logger])
], MacaroonResolver);
exports.MacaroonResolver = MacaroonResolver;
//# sourceMappingURL=macaroon.resolver.js.map
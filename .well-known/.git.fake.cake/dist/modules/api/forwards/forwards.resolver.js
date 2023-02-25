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
exports.ForwardsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const lodash_1 = require("lodash");
const date_fns_1 = require("date-fns");
const node_service_1 = require("../../node/node.service");
const security_types_1 = require("../../security/security.types");
const security_decorators_1 = require("../../security/security.decorators");
const forwards_types_1 = require("./forwards.types");
let ForwardsResolver = class ForwardsResolver {
    constructor(nodeService) {
        this.nodeService = nodeService;
    }
    async getForwards(user, days) {
        const today = new Date();
        const startDate = (0, date_fns_1.subDays)(today, days);
        const forwardsList = await this.nodeService.getForwards(user.id, {
            after: startDate.toISOString(),
            before: today.toISOString(),
        });
        let forwards = forwardsList.forwards;
        let next = forwardsList.next;
        let finishedFetching = false;
        if (!next || !forwards || forwards.length <= 0) {
            finishedFetching = true;
        }
        while (!finishedFetching) {
            if (next) {
                const moreForwards = await this.nodeService.getForwards(user.id, {
                    token: next,
                });
                forwards = [...forwards, ...moreForwards.forwards];
                next = moreForwards.next;
            }
            else {
                finishedFetching = true;
            }
        }
        return (0, lodash_1.sortBy)(forwards, 'created_at').reverse();
    }
};
__decorate([
    (0, graphql_1.Query)(() => [forwards_types_1.Forward]),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('days')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId, Number]),
    __metadata("design:returntype", Promise)
], ForwardsResolver.prototype, "getForwards", null);
ForwardsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [node_service_1.NodeService])
], ForwardsResolver);
exports.ForwardsResolver = ForwardsResolver;
//# sourceMappingURL=forwards.resolver.js.map
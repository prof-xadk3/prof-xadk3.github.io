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
exports.GithubResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const async_1 = require("../../../utils/async");
const fetch_service_1 = require("../../fetch/fetch.service");
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const config_1 = require("@nestjs/config");
let GithubResolver = class GithubResolver {
    constructor(configService, fetchService, logger) {
        this.configService = configService;
        this.fetchService = fetchService;
        this.logger = logger;
    }
    async getLatestVersion() {
        const [response, error] = await (0, async_1.toWithError)(this.fetchService.fetchWithProxy(this.configService.get('urls.github')));
        if (error || !response) {
            this.logger.debug('Unable to get latest github version');
            throw new Error('NoGithubVersion');
        }
        const json = await response.json();
        return json.tag_name;
    }
};
__decorate([
    (0, graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GithubResolver.prototype, "getLatestVersion", null);
GithubResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __param(2, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        fetch_service_1.FetchService,
        winston_1.Logger])
], GithubResolver);
exports.GithubResolver = GithubResolver;
//# sourceMappingURL=github.resolver.js.map
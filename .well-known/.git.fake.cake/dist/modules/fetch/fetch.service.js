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
exports.FetchService = void 0;
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const config_1 = require("@nestjs/config");
const socks_proxy_agent_1 = require("socks-proxy-agent");
const graphql_1 = require("graphql");
let FetchService = class FetchService {
    constructor(configService, logger) {
        this.configService = configService;
        this.logger = logger;
        this.agent = null;
        const torProxy = this.configService.get('torProxy');
        if (torProxy) {
            this.logger.info(`Using tor proxy for external requests: ${torProxy}`);
            this.agent = new socks_proxy_agent_1.SocksProxyAgent(torProxy);
        }
    }
    async fetchWithProxy(url, options) {
        return this.agent
            ? fetch(url, Object.assign({ agent: this.agent }, options))
            : fetch(url, options);
    }
    async graphqlFetchWithProxy(url, query, variables, headers) {
        const needsHeaders = url === this.configService.get('urls.amboss');
        return this.fetchWithProxy(url, {
            method: 'post',
            headers: Object.assign(Object.assign({ Accept: 'application/json', 'Content-Type': 'application/json' }, (needsHeaders ? this.configService.get('headers') : {})), (headers || {})),
            body: JSON.stringify({ query: (0, graphql_1.print)(query), variables }),
        })
            .then(res => res.json())
            .then(result => {
            var _a;
            const { data, errors } = result;
            return {
                data,
                error: (_a = errors === null || errors === void 0 ? void 0 : errors[0]) === null || _a === void 0 ? void 0 : _a.message,
            };
        })
            .catch(error => {
            this.logger.error('Error doing graphql fetch', { error });
            return { data: undefined, error };
        });
    }
};
FetchService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        winston_1.Logger])
], FetchService);
exports.FetchService = FetchService;
//# sourceMappingURL=fetch.service.js.map
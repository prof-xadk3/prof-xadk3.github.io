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
exports.BitcoinResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const fetch_service_1 = require("../../fetch/fetch.service");
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const bitcoin_types_1 = require("./bitcoin.types");
const config_1 = require("@nestjs/config");
let BitcoinResolver = class BitcoinResolver {
    constructor(configService, fetchService, logger) {
        this.configService = configService;
        this.fetchService = fetchService;
        this.logger = logger;
    }
    async getBitcoinPrice() {
        try {
            const response = await this.fetchService.fetchWithProxy(this.configService.get('urls.ticker'));
            const json = await response.json();
            return JSON.stringify(json);
        }
        catch (error) {
            this.logger.error('Error getting bitcoin price', { error });
            throw new Error('Problem getting Bitcoin price.');
        }
    }
    async getBitcoinFees() {
        try {
            const response = await this.fetchService.fetchWithProxy(this.configService.get('urls.fees'));
            const json = (await response.json());
            if (json) {
                const { fastestFee, halfHourFee, hourFee, minimumFee } = json;
                return {
                    fast: fastestFee,
                    halfHour: halfHourFee,
                    hour: hourFee,
                    minimum: minimumFee,
                };
            }
            throw new Error('Problem getting Bitcoin fees.');
        }
        catch (error) {
            this.logger.error('Error getting bitcoin fees', { error });
            throw new Error('Problem getting Bitcoin fees.');
        }
    }
};
__decorate([
    (0, graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BitcoinResolver.prototype, "getBitcoinPrice", null);
__decorate([
    (0, graphql_1.Query)(() => bitcoin_types_1.BitcoinFee),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BitcoinResolver.prototype, "getBitcoinFees", null);
BitcoinResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __param(2, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        fetch_service_1.FetchService,
        winston_1.Logger])
], BitcoinResolver);
exports.BitcoinResolver = BitcoinResolver;
//# sourceMappingURL=bitcoin.resolver.js.map
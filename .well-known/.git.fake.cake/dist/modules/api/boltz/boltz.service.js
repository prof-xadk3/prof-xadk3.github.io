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
exports.BoltzService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const fetch_service_1 = require("../../fetch/fetch.service");
let BoltzService = class BoltzService {
    constructor(configService, fetchService, logger) {
        this.configService = configService;
        this.fetchService = fetchService;
        this.logger = logger;
    }
    async getPairs() {
        try {
            const response = await this.fetchService.fetchWithProxy(`${this.configService.get('urls.boltz')}/getpairs`);
            return response.json();
        }
        catch (error) {
            this.logger.error('Error getting pairs from Boltz', { error });
            throw new Error('ErrorGettingBoltzPairs');
        }
    }
    async getFeeEstimations() {
        try {
            const response = await this.fetchService.fetchWithProxy(`${this.configService.get('urls.boltz')}/getfeeestimation`);
            return response.json();
        }
        catch (error) {
            this.logger.error('Error getting fee estimations from Boltz', { error });
            throw new Error(error);
        }
    }
    async getSwapStatus(id) {
        try {
            const body = { id };
            const response = await this.fetchService.fetchWithProxy(`${this.configService.get('urls.boltz')}/swapstatus`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
            });
            return response.json();
        }
        catch (error) {
            this.logger.error('Error getting fee estimations from Boltz', { error });
            throw new Error(error);
        }
    }
    async createReverseSwap(invoiceAmount, preimageHash, claimPublicKey) {
        try {
            const body = {
                type: 'reversesubmarine',
                pairId: 'BTC/BTC',
                orderSide: 'buy',
                referralId: 'thunderhub',
                invoiceAmount,
                preimageHash,
                claimPublicKey,
            };
            const response = await this.fetchService.fetchWithProxy(`${this.configService.get('urls.boltz')}/createswap`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
            });
            return response.json();
        }
        catch (error) {
            this.logger.error('Error getting fee estimations from Boltz', { error });
            throw new Error(error);
        }
    }
    async broadcastTransaction(transactionHex) {
        try {
            const body = {
                currency: 'BTC',
                transactionHex,
            };
            const response = await this.fetchService.fetchWithProxy(`${this.configService.get('urls.boltz')}/broadcasttransaction`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
            });
            return response.json();
        }
        catch (error) {
            this.logger.error('Error broadcasting transaction from Boltz', { error });
            throw new Error(error);
        }
    }
};
BoltzService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        fetch_service_1.FetchService,
        winston_1.Logger])
], BoltzService);
exports.BoltzService = BoltzService;
//# sourceMappingURL=boltz.service.js.map
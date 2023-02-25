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
exports.LnMarketsService = void 0;
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const fetch_service_1 = require("../../fetch/fetch.service");
const bech32_1 = require("bech32");
const config_1 = require("@nestjs/config");
const lnurl_service_1 = require("../lnurl/lnurl.service");
const decodeLnUrl = (url) => {
    const cleanUrl = url.toLowerCase().replace('lightning:', '');
    const { words } = bech32_1.bech32.decode(cleanUrl, 500);
    const bytes = bech32_1.bech32.fromWords(words);
    return new String(Buffer.from(bytes)).toString();
};
let LnMarketsService = class LnMarketsService {
    constructor(configService, fetchService, lnUrlService, logger) {
        this.configService = configService;
        this.fetchService = fetchService;
        this.lnUrlService = lnUrlService;
        this.logger = logger;
    }
    async getUser(token) {
        try {
            const response = await this.fetchService.fetchWithProxy(`${this.configService.get('urls.lnMarkets')}/user`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            return (await response.json());
        }
        catch (error) {
            this.logger.error(`Error getting user info from ${this.configService.get('urls.lnMarkets')}/user`, { error });
            throw new Error('ProblemAuthenticatingWithLnMarkets');
        }
    }
    async getDepositInvoice(token, amount) {
        try {
            const response = await this.fetchService.fetchWithProxy(`${this.configService.get('urls.lnMarkets')}/user/deposit`, {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ amount, unit: 'sat' }),
            });
            return (await response.json());
        }
        catch (error) {
            this.logger.error(`Error getting invoice to deposit from LnMarkets`, {
                error,
            });
            throw new Error('ProblemGettingDepositInvoice');
        }
    }
    async withdraw(token, amount, invoice) {
        try {
            const response = await this.fetchService.fetchWithProxy(`${this.configService.get('urls.lnMarkets')}/user/withdraw`, {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ amount, unit: 'sat', invoice }),
            });
            return (await response.json());
        }
        catch (error) {
            this.logger.error(`Error withdrawing from LnMarkets`, { error });
            throw new Error('ProblemWithdrawingFromLnMarkets');
        }
    }
    async getLnMarketsAuth(id, cookie) {
        if (cookie) {
            return { newCookie: false, cookieString: cookie };
        }
        if (!id) {
            this.logger.error('Error getting authenticated LND instance in lnUrlAuth');
            throw new Error('ProblemAuthenticatingWithLnUrlService');
        }
        let lnUrl = '';
        try {
            const response = await this.fetchService.fetchWithProxy(`${this.configService.get('urls.lnMarkets')}/lnurl/auth`, {
                method: 'post',
            });
            const json = (await response.json());
            this.logger.debug('Get lnUrl from LnMarkets response', { json });
            lnUrl = json === null || json === void 0 ? void 0 : json.lnurl;
            if (!lnUrl)
                throw new Error();
        }
        catch (error) {
            this.logger.error(`Error getting lnAuth url from ${this.configService.get('urls.lnMarkets')}`, {
                error,
            });
            throw new Error('ProblemAuthenticatingWithLnMarkets');
        }
        const decoded = decodeLnUrl(lnUrl);
        const finalUrl = await this.lnUrlService.lnAuthUrlGenerator(id, decoded);
        try {
            const response = await this.fetchService.fetchWithProxy(`${finalUrl}&jwt=true&expiry=3600`);
            const json = (await response.json());
            this.logger.debug('LnUrlAuth response', { json });
            if (!(json === null || json === void 0 ? void 0 : json.token)) {
                throw new Error('No token in response');
            }
            return { newCookie: true, cookieString: json.token, json };
        }
        catch (error) {
            this.logger.error('Error authenticating with LnUrl service', { error });
            throw new Error('ProblemAuthenticatingWithLnUrlService');
        }
    }
};
LnMarketsService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        fetch_service_1.FetchService,
        lnurl_service_1.LnUrlService,
        winston_1.Logger])
], LnMarketsService);
exports.LnMarketsService = LnMarketsService;
//# sourceMappingURL=lnmarkets.service.js.map
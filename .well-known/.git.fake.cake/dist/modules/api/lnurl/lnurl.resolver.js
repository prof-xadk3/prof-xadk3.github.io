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
exports.LnUrlResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const nest_winston_1 = require("nest-winston");
const fetch_service_1 = require("../../fetch/fetch.service");
const security_decorators_1 = require("../../security/security.decorators");
const security_types_1 = require("../../security/security.types");
const lnurl_service_1 = require("./lnurl.service");
const lnurl_types_1 = require("./lnurl.types");
const winston_1 = require("winston");
const crypto_1 = require("crypto");
const node_service_1 = require("../../node/node.service");
let LnUrlResolver = class LnUrlResolver {
    constructor(fetchService, lnUrlService, nodeService, logger) {
        this.fetchService = fetchService;
        this.lnUrlService = lnUrlService;
        this.nodeService = nodeService;
        this.logger = logger;
    }
    async getLightningAddressInfo(address) {
        const split = address.split('@');
        if (split.length !== 2) {
            throw new Error('Invalid lightning address');
        }
        try {
            const response = await this.fetchService.fetchWithProxy(`https://${split[1]}/.well-known/lnurlp/${split[0]}`);
            const result = await response.json();
            let valid = true;
            if (!result.callback)
                valid = false;
            if (!result.maxSendable)
                valid = false;
            if (!result.minSendable)
                valid = false;
            if (!valid) {
                throw new Error('Invalid lightning address');
            }
            return result;
        }
        catch (error) {
            throw new Error('Invalid lightning address');
        }
    }
    async lnUrlAuth({ id }, url) {
        const finalUrl = await this.lnUrlService.lnAuthUrlGenerator(id, url);
        try {
            const response = await this.fetchService.fetchWithProxy(finalUrl);
            const json = (await response.json());
            this.logger.debug('LnUrlAuth response', { json });
            if (json.status === 'ERROR') {
                return Object.assign(Object.assign({}, json), { message: json.reason || 'LnServiceError' });
            }
            return Object.assign(Object.assign({}, json), { message: json.event || 'LnServiceSuccess' });
        }
        catch (error) {
            this.logger.error('Error authenticating with LnUrl service', { error });
            throw new Error('ProblemAuthenticatingWithLnUrlService');
        }
    }
    async fetchLnUrl(url) {
        try {
            const response = await this.fetchService.fetchWithProxy(url);
            const json = (await response.json());
            if (json.status === 'ERROR') {
                throw new Error(json.reason || 'LnServiceError');
            }
            return json;
        }
        catch (error) {
            this.logger.error('Error fetching from LnUrl service', { error });
            throw new Error('ProblemFetchingFromLnUrlService');
        }
    }
    async lnUrlPay({ id }, callback, amount, comment) {
        this.logger.debug('LnUrlPay initiated with params', {
            callback,
            amount,
            comment,
        });
        const random8byteNonce = (0, crypto_1.randomBytes)(8).toString('hex');
        const initialIdentifier = callback.indexOf('?') != -1 ? '&' : '?';
        const finalUrl = `${callback}${initialIdentifier}amount=${amount * 1000}&nonce=${random8byteNonce}&comment=${comment}`;
        let lnServiceResponse = {
            status: 'ERROR',
            reason: 'FailedToFetchLnService',
        };
        try {
            const response = await this.fetchService.fetchWithProxy(finalUrl);
            lnServiceResponse = (await response.json());
            if (lnServiceResponse.status === 'ERROR') {
                throw new Error(lnServiceResponse.reason || 'LnServiceError');
            }
        }
        catch (error) {
            this.logger.error('Error paying to LnUrl service', { error });
            throw new Error('ProblemPayingLnUrlService');
        }
        this.logger.debug('LnUrlPay response', { response: lnServiceResponse });
        if (!lnServiceResponse.pr) {
            this.logger.error('No invoice in response from LnUrlService');
            throw new Error('ProblemPayingLnUrlService');
        }
        if (lnServiceResponse.successAction) {
            const { tag } = lnServiceResponse.successAction;
            if (tag !== 'url' && tag !== 'message' && tag !== 'aes') {
                this.logger.error('LnUrlService provided an invalid tag', { tag });
                throw new Error('InvalidTagFromLnUrlService');
            }
        }
        const decoded = await this.nodeService.decodePaymentRequest(id, lnServiceResponse.pr);
        if (decoded.tokens > amount) {
            this.logger.error(`Invoice amount ${decoded.tokens} is higher than amount defined ${amount}`);
            throw new Error('LnServiceInvoiceAmountToHigh');
        }
        const info = await this.nodeService.pay(id, {
            request: lnServiceResponse.pr,
        });
        if (!info.is_confirmed) {
            this.logger.error(`Failed to pay invoice: ${lnServiceResponse.pr}`);
            throw new Error('FailedToPayInvoiceToLnUrlService');
        }
        return (lnServiceResponse.successAction || {
            tag: 'message',
            message: 'Succesfully Paid',
        });
    }
    async lnUrlWithdraw({ id }, callback, amount, description, k1) {
        this.logger.debug('LnUrlWithdraw initiated with params', {
            callback,
            amount,
            k1,
            description,
        });
        const info = await this.nodeService.createInvoice(id, {
            tokens: amount,
            description,
        });
        const initialIdentifier = callback.indexOf('?') != -1 ? '&' : '?';
        const finalUrl = `${callback}${initialIdentifier}k1=${k1}&pr=${info.request}`;
        try {
            const response = await this.fetchService.fetchWithProxy(finalUrl);
            const json = (await response.json());
            this.logger.debug('LnUrlWithdraw response', { json });
            if (json.status === 'ERROR') {
                throw new Error(json.reason || 'LnServiceError');
            }
            return info.id;
        }
        catch (error) {
            this.logger.error('Error withdrawing from LnUrl service', { error });
            throw new Error('ProblemWithdrawingFromLnUrlService');
        }
    }
    async lnUrlChannel({ id }, callback, uri, k1) {
        this.logger.debug('LnUrlChannel initiated with params', {
            callback,
            uri,
            k1,
        });
        const split = uri.split('@');
        await this.nodeService.addPeer(id, split[0], split[1], false);
        const info = await this.nodeService.getWalletInfo(id);
        const initialIdentifier = callback.indexOf('?') != -1 ? '&' : '?';
        const finalUrl = `${callback}${initialIdentifier}k1=${k1}&remoteid=${info.public_key}&private=0`;
        try {
            const response = await this.fetchService.fetchWithProxy(finalUrl);
            const json = (await response.json());
            this.logger.debug('LnUrlChannel response', { json });
            if (json.status === 'ERROR') {
                throw new Error(json.reason || 'LnServiceError');
            }
            return 'Successfully requested a channel open';
        }
        catch (error) {
            this.logger.error('Error requesting channel from LnUrl service', {
                error,
            });
            throw new Error(`Error requesting channel from LnUrl service: ${error}`);
        }
    }
};
__decorate([
    (0, graphql_1.Query)(() => lnurl_types_1.PayRequest),
    __param(0, (0, graphql_1.Args)('address')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LnUrlResolver.prototype, "getLightningAddressInfo", null);
__decorate([
    (0, graphql_1.Mutation)(() => lnurl_types_1.AuthResponse),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('url')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId, String]),
    __metadata("design:returntype", Promise)
], LnUrlResolver.prototype, "lnUrlAuth", null);
__decorate([
    (0, graphql_1.Mutation)(() => lnurl_types_1.LnUrlRequestUnion),
    __param(0, (0, graphql_1.Args)('url')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LnUrlResolver.prototype, "fetchLnUrl", null);
__decorate([
    (0, graphql_1.Mutation)(() => lnurl_types_1.PaySuccess),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('callback')),
    __param(2, (0, graphql_1.Args)('amount')),
    __param(3, (0, graphql_1.Args)('comment', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId, String, Number, String]),
    __metadata("design:returntype", Promise)
], LnUrlResolver.prototype, "lnUrlPay", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('callback')),
    __param(2, (0, graphql_1.Args)('amount')),
    __param(3, (0, graphql_1.Args)('description', { nullable: true })),
    __param(4, (0, graphql_1.Args)('k1')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId, String, Number, String, String]),
    __metadata("design:returntype", Promise)
], LnUrlResolver.prototype, "lnUrlWithdraw", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('callback')),
    __param(2, (0, graphql_1.Args)('uri')),
    __param(3, (0, graphql_1.Args)('k1')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId, String, String, String]),
    __metadata("design:returntype", Promise)
], LnUrlResolver.prototype, "lnUrlChannel", null);
LnUrlResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __param(3, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [fetch_service_1.FetchService,
        lnurl_service_1.LnUrlService,
        node_service_1.NodeService,
        winston_1.Logger])
], LnUrlResolver);
exports.LnUrlResolver = LnUrlResolver;
//# sourceMappingURL=lnurl.resolver.js.map
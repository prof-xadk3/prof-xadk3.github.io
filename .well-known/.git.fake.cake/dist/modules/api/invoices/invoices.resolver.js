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
exports.InvoicesResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const node_service_1 = require("../../node/node.service");
const security_decorators_1 = require("../../security/security.decorators");
const security_types_1 = require("../../security/security.types");
const invoices_types_1 = require("./invoices.types");
const crypto_1 = require("crypto");
const KEYSEND_TYPE = '5482373484';
let InvoicesResolver = class InvoicesResolver {
    constructor(nodeService, logger) {
        this.nodeService = nodeService;
        this.logger = logger;
    }
    async getInvoiceStatusChange(user, id) {
        const sub = this.nodeService.subscribeToInvoice(user.id, id);
        return Promise.race([
            new Promise(resolve => {
                sub.on('invoice_updated', (data) => {
                    if (data.is_confirmed) {
                        resolve(true);
                    }
                });
            }),
            new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 90000)),
        ])
            .then((res) => {
            if (res) {
                return 'paid';
            }
            return 'not_paid';
        })
            .catch(e => {
            if (e)
                return 'timeout';
        });
    }
    async decodeRequest(user, request) {
        const decoded = await this.nodeService.decodePaymentRequest(user.id, request);
        return Object.assign(Object.assign({}, decoded), { destination_node: { publicKey: decoded.destination } });
    }
    async createInvoice(user, amount, description, secondsUntil, includePrivate) {
        const getDate = (secondsUntil) => {
            const date = new Date();
            date.setSeconds(date.getSeconds() + secondsUntil);
            return date.toISOString();
        };
        const invoiceParams = Object.assign(Object.assign(Object.assign({ tokens: amount }, (description && { description })), (!!secondsUntil && { expires_at: getDate(secondsUntil) })), (includePrivate && { is_including_private_channels: true }));
        this.logger.info('Creating invoice with params', invoiceParams);
        return await this.nodeService.createInvoice(user.id, invoiceParams);
    }
    async keysend(user, tokens, destination) {
        const preimage = (0, crypto_1.randomBytes)(32);
        const secret = preimage.toString('hex');
        const id = (0, crypto_1.createHash)('sha256').update(preimage).digest().toString('hex');
        return await this.nodeService.payViaPaymentDetails(user.id, {
            id,
            tokens,
            destination,
            messages: [
                {
                    type: KEYSEND_TYPE,
                    value: secret,
                },
            ],
        });
    }
    async pay(user, max_fee, max_paths, request, outgoing_channels) {
        const props = {
            max_fee,
            max_paths,
            request,
            outgoing_channels,
        };
        this.logger.debug('Paying invoice with params', props);
        const response = await this.nodeService.pay(user.id, props);
        this.logger.debug('Paid invoice', response);
        return true;
    }
};
__decorate([
    (0, graphql_1.Query)(() => String),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId, String]),
    __metadata("design:returntype", Promise)
], InvoicesResolver.prototype, "getInvoiceStatusChange", null);
__decorate([
    (0, graphql_1.Query)(() => invoices_types_1.DecodeInvoice),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('request')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId, String]),
    __metadata("design:returntype", Promise)
], InvoicesResolver.prototype, "decodeRequest", null);
__decorate([
    (0, graphql_1.Mutation)(() => invoices_types_1.CreateInvoice),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('amount')),
    __param(2, (0, graphql_1.Args)('description', { nullable: true })),
    __param(3, (0, graphql_1.Args)('secondsUntil', { nullable: true })),
    __param(4, (0, graphql_1.Args)('includePrivate', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId, Number, String, Number, Boolean]),
    __metadata("design:returntype", Promise)
], InvoicesResolver.prototype, "createInvoice", null);
__decorate([
    (0, graphql_1.Mutation)(() => invoices_types_1.PayInvoice),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('tokens')),
    __param(2, (0, graphql_1.Args)('destination', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId, Number, String]),
    __metadata("design:returntype", Promise)
], InvoicesResolver.prototype, "keysend", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('max_fee')),
    __param(2, (0, graphql_1.Args)('max_paths')),
    __param(3, (0, graphql_1.Args)('request')),
    __param(4, (0, graphql_1.Args)('out', { nullable: true, type: () => [String] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId, Number, Number, String, Array]),
    __metadata("design:returntype", Promise)
], InvoicesResolver.prototype, "pay", null);
InvoicesResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [node_service_1.NodeService,
        winston_1.Logger])
], InvoicesResolver);
exports.InvoicesResolver = InvoicesResolver;
//# sourceMappingURL=invoices.resolver.js.map
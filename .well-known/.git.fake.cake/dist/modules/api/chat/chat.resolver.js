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
exports.ChatResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const nest_winston_1 = require("nest-winston");
const async_1 = require("../../../utils/async");
const customRecords_1 = require("../../../utils/customRecords");
const winston_1 = require("winston");
const node_service_1 = require("../../node/node.service");
const security_decorators_1 = require("../../security/security.decorators");
const security_types_1 = require("../../security/security.types");
const crypto_1 = require("crypto");
const chat_types_1 = require("./chat.types");
let ChatResolver = class ChatResolver {
    constructor(nodeService, logger) {
        this.nodeService = nodeService;
        this.logger = logger;
    }
    async getMessages(user, initialize) {
        const invoiceList = await this.nodeService.getInvoices(user.id, {
            limit: initialize ? 100 : 5,
        });
        const getFiltered = () => Promise.all(invoiceList.invoices.map(async (invoice) => {
            if (!invoice.is_confirmed) {
                return;
            }
            const messages = invoice.payments[0].messages;
            let customRecords = {};
            messages.map(message => {
                const { type, value } = message;
                const obj = (0, customRecords_1.decodeMessage)({ type, value });
                customRecords = Object.assign(Object.assign({}, customRecords), obj);
            });
            if (Object.keys(customRecords).length <= 0) {
                return;
            }
            let isVerified = false;
            if (customRecords.signature) {
                const messageToVerify = JSON.stringify({
                    sender: customRecords.sender,
                    message: customRecords.message,
                });
                const [verified, error] = await (0, async_1.toWithError)(this.nodeService.verifyMessage(user.id, messageToVerify, customRecords.signature));
                if (error) {
                    this.logger.debug(`Error verifying message: ${messageToVerify}`);
                }
                if (!error &&
                    (verified === null || verified === void 0 ? void 0 : verified.signed_by) ===
                        customRecords.sender) {
                    isVerified = true;
                }
            }
            return Object.assign({ date: invoice.confirmed_at, id: invoice.id, tokens: invoice.tokens, verified: isVerified }, customRecords);
        }));
        const filtered = await getFiltered();
        const final = filtered.filter(Boolean) || [];
        return { token: invoiceList.next, messages: final };
    }
    async sendMessage(user, publicKey, message, messageType, tokens, maxFee) {
        let satsToSend = tokens || 1;
        let messageToSend = message;
        if (messageType === 'paymentrequest') {
            satsToSend = 1;
            messageToSend = `${tokens},${message}`;
        }
        const nodeInfo = await this.nodeService.getWalletInfo(user.id);
        const userAlias = nodeInfo.alias;
        const userKey = nodeInfo.public_key;
        const preimage = (0, crypto_1.randomBytes)(32);
        const secret = preimage.toString('hex');
        const id = (0, crypto_1.createHash)('sha256').update(preimage).digest().toString('hex');
        const messageToSign = JSON.stringify({
            sender: userKey,
            message: messageToSend,
        });
        const { signature } = await this.nodeService.signMessage(user.id, messageToSign);
        const customRecords = (0, customRecords_1.createCustomRecords)({
            message: messageToSend,
            sender: userKey,
            alias: userAlias,
            contentType: messageType || 'text',
            requestType: messageType || 'text',
            signature,
            secret,
        });
        const { safe_fee } = await this.nodeService.payViaPaymentDetails(user.id, Object.assign(Object.assign({ id, tokens: satsToSend, destination: publicKey }, (maxFee ? { max_fee: maxFee } : {})), { messages: customRecords }));
        return safe_fee + 1;
    }
};
__decorate([
    (0, graphql_1.Query)(() => chat_types_1.GetMessages),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('initialize', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId, Boolean]),
    __metadata("design:returntype", Promise)
], ChatResolver.prototype, "getMessages", null);
__decorate([
    (0, graphql_1.Mutation)(() => Number),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('publicKey')),
    __param(2, (0, graphql_1.Args)('message')),
    __param(3, (0, graphql_1.Args)('messageType', { nullable: true })),
    __param(4, (0, graphql_1.Args)('tokens', { nullable: true })),
    __param(5, (0, graphql_1.Args)('maxFee', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId, String, String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], ChatResolver.prototype, "sendMessage", null);
ChatResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [node_service_1.NodeService,
        winston_1.Logger])
], ChatResolver);
exports.ChatResolver = ChatResolver;
//# sourceMappingURL=chat.resolver.js.map
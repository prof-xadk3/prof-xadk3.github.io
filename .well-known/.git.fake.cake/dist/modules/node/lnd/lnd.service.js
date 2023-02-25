"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LndService = void 0;
const common_1 = require("@nestjs/common");
const lightning_1 = require("lightning");
const lnd_helpers_1 = require("./lnd.helpers");
let LndService = class LndService {
    async getWalletInfo(account) {
        return (0, lnd_helpers_1.to)((0, lightning_1.getWalletInfo)({
            lnd: account.lnd,
        }));
    }
    async getWalletVersion(account) {
        return (0, lnd_helpers_1.to)((0, lightning_1.getWalletVersion)({
            lnd: account.lnd,
        }));
    }
    async getHeight(account) {
        return (0, lnd_helpers_1.to)((0, lightning_1.getHeight)({
            lnd: account.lnd,
        }));
    }
    async getClosedChannels(account) {
        return (0, lnd_helpers_1.to)((0, lightning_1.getClosedChannels)({
            lnd: account.lnd,
        }));
    }
    async getPendingChannels(account) {
        return (0, lnd_helpers_1.to)((0, lightning_1.getPendingChannels)({
            lnd: account.lnd,
        }));
    }
    async getChannels(account, options) {
        return (0, lnd_helpers_1.to)((0, lightning_1.getChannels)(Object.assign({ lnd: account.lnd }, options)));
    }
    async getChannelBalance(account) {
        return (0, lnd_helpers_1.to)((0, lightning_1.getChannelBalance)({
            lnd: account.lnd,
        }));
    }
    async getChainBalance(account) {
        return (0, lnd_helpers_1.to)((0, lightning_1.getChainBalance)({
            lnd: account.lnd,
        }));
    }
    async getPendingChainBalance(account) {
        return (0, lnd_helpers_1.to)((0, lightning_1.getPendingChainBalance)({
            lnd: account.lnd,
        }));
    }
    async getNode(account, public_key, is_omitting_channels = true) {
        return (0, lnd_helpers_1.to)((0, lightning_1.getNode)({
            lnd: account.lnd,
            public_key,
            is_omitting_channels,
        }));
    }
    async verifyBackup(account, backup) {
        const result = await (0, lnd_helpers_1.to)((0, lightning_1.verifyBackup)({
            lnd: account.lnd,
            backup,
        }));
        console.log(result);
        return result;
    }
    async verifyBackups(account, args) {
        return (0, lnd_helpers_1.to)((0, lightning_1.verifyBackups)(Object.assign({ lnd: account.lnd }, args)));
    }
    async recoverFundsFromChannels(account, backup) {
        return (0, lnd_helpers_1.to)((0, lightning_1.recoverFundsFromChannels)({
            lnd: account.lnd,
            backup,
        }));
    }
    async getBackups(account) {
        return (0, lnd_helpers_1.to)((0, lightning_1.getBackups)({ lnd: account.lnd }));
    }
    async verifyMessage(account, message, signature) {
        return (0, lnd_helpers_1.to)((0, lightning_1.verifyMessage)({ lnd: account.lnd, message, signature }));
    }
    async signMessage(account, message) {
        return (0, lnd_helpers_1.to)((0, lightning_1.signMessage)({ lnd: account.lnd, message }));
    }
    async grantAccess(account, permissions) {
        return (0, lnd_helpers_1.to)((0, lightning_1.grantAccess)(Object.assign({ lnd: account.lnd }, permissions)));
    }
    async getNetworkInfo(account) {
        return (0, lnd_helpers_1.to)((0, lightning_1.getNetworkInfo)({ lnd: account.lnd }));
    }
    async getPeers(account) {
        return (0, lnd_helpers_1.to)((0, lightning_1.getPeers)({ lnd: account.lnd }));
    }
    async addPeer(account, public_key, socket, is_temporary) {
        return (0, lnd_helpers_1.to)((0, lightning_1.addPeer)({ lnd: account.lnd, public_key, socket, is_temporary }));
    }
    async removePeer(account, public_key) {
        return (0, lnd_helpers_1.to)((0, lightning_1.removePeer)({ lnd: account.lnd, public_key }));
    }
    async getChainTransactions(account) {
        return (0, lnd_helpers_1.to)((0, lightning_1.getChainTransactions)({ lnd: account.lnd }));
    }
    async getUtxos(account) {
        return (0, lnd_helpers_1.to)((0, lightning_1.getUtxos)({ lnd: account.lnd }));
    }
    async createChainAddress(account, is_unused, format) {
        return (0, lnd_helpers_1.to)((0, lightning_1.createChainAddress)({
            lnd: account.lnd,
            is_unused,
            format,
        }));
    }
    async sendToChainAddress(account, options) {
        return (0, lnd_helpers_1.to)((0, lightning_1.sendToChainAddress)(Object.assign({ lnd: account.lnd }, options)));
    }
    async diffieHellmanComputeSecret(account, options) {
        return (0, lnd_helpers_1.to)((0, lightning_1.diffieHellmanComputeSecret)(Object.assign({ lnd: account.lnd }, options)));
    }
    async decodePaymentRequest(account, request) {
        return (0, lnd_helpers_1.to)((0, lightning_1.decodePaymentRequest)({ lnd: account.lnd, request }));
    }
    async pay(account, options) {
        return (0, lnd_helpers_1.to)((0, lightning_1.pay)(Object.assign({ lnd: account.lnd }, options)));
    }
    async createInvoice(account, options) {
        return (0, lnd_helpers_1.to)((0, lightning_1.createInvoice)(Object.assign({ lnd: account.lnd }, options)));
    }
    async getChannel(account, id) {
        return (0, lnd_helpers_1.to)((0, lightning_1.getChannel)({ lnd: account.lnd, id }));
    }
    async closeChannel(account, options) {
        return (0, lnd_helpers_1.to)((0, lightning_1.closeChannel)(Object.assign({ lnd: account.lnd }, options)));
    }
    async openChannel(account, options) {
        return (0, lnd_helpers_1.to)((0, lightning_1.openChannel)(Object.assign({ lnd: account.lnd }, options)));
    }
    async updateRoutingFees(account, options) {
        return (0, lnd_helpers_1.to)((0, lightning_1.updateRoutingFees)(Object.assign({ lnd: account.lnd }, options)));
    }
    async getForwards(account, options) {
        return (0, lnd_helpers_1.to)((0, lightning_1.getForwards)(Object.assign({ lnd: account.lnd }, options)));
    }
    async getPayments(account, options) {
        return (0, lnd_helpers_1.to)((0, lightning_1.getPayments)(Object.assign({ lnd: account.lnd }, options)));
    }
    async getInvoices(account, options) {
        return (0, lnd_helpers_1.to)((0, lightning_1.getInvoices)(Object.assign({ lnd: account.lnd }, options)));
    }
    async payViaPaymentDetails(account, options) {
        return (0, lnd_helpers_1.to)((0, lightning_1.payViaPaymentDetails)(Object.assign({ lnd: account.lnd }, options)));
    }
    subscribeToInvoice(account, id) {
        return (0, lightning_1.subscribeToInvoice)({ lnd: account.lnd, id });
    }
};
LndService = __decorate([
    (0, common_1.Injectable)()
], LndService);
exports.LndService = LndService;
//# sourceMappingURL=lnd.service.js.map
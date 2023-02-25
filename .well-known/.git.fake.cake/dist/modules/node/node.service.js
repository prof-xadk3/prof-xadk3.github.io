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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeService = void 0;
const common_1 = require("@nestjs/common");
const accounts_service_1 = require("../accounts/accounts.service");
const lnd_service_1 = require("./lnd/lnd.service");
let NodeService = class NodeService {
    constructor(accountsService, lndService) {
        this.accountsService = accountsService;
        this.lndService = lndService;
    }
    async getWalletInfo(id) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.getWalletInfo(account);
    }
    async getWalletVersion(id) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.getWalletVersion(account);
    }
    async getHeight(id) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.getHeight(account);
    }
    async getClosedChannels(id) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.getClosedChannels(account);
    }
    async getPendingChannels(id) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.getPendingChannels(account);
    }
    async getChannels(id, options) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.getChannels(account, options);
    }
    async getChannelBalance(id) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.getChannelBalance(account);
    }
    async getChainBalance(id) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.getChainBalance(account);
    }
    async getPendingChainBalance(id) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.getPendingChainBalance(account);
    }
    async getNode(id, pubkey, withoutChannels) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.getNode(account, pubkey, withoutChannels);
    }
    async verifyBackup(id, backup) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.verifyBackup(account, backup);
    }
    async verifyBackups(id, args) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.verifyBackups(account, args);
    }
    async recoverFundsFromChannels(id, backup) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.recoverFundsFromChannels(account, backup);
    }
    async getBackups(id) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.getBackups(account);
    }
    async verifyMessage(id, message, signature) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.verifyMessage(account, message, signature);
    }
    async signMessage(id, message) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.signMessage(account, message);
    }
    async grantAccess(id, permissions) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.grantAccess(account, permissions);
    }
    async getNetworkInfo(id) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.getNetworkInfo(account);
    }
    async getPeers(id) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.getPeers(account);
    }
    async addPeer(id, public_key, socket, is_temporary) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.addPeer(account, public_key, socket, is_temporary);
    }
    async removePeer(id, public_key) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.removePeer(account, public_key);
    }
    async getChainTransactions(id) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.getChainTransactions(account);
    }
    async getUtxos(id) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.getUtxos(account);
    }
    async createChainAddress(id, is_unused = true, format = 'p2wpkh') {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.createChainAddress(account, is_unused, format);
    }
    async sendToChainAddress(id, options) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.sendToChainAddress(account, options);
    }
    async diffieHellmanComputeSecret(id, options) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.diffieHellmanComputeSecret(account, options);
    }
    async decodePaymentRequest(id, request) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.decodePaymentRequest(account, request);
    }
    async pay(id, options) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.pay(account, options);
    }
    async createInvoice(id, options) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.createInvoice(account, options);
    }
    async getChannel(id, channel_id) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.getChannel(account, channel_id);
    }
    async closeChannel(id, options) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.closeChannel(account, options);
    }
    async openChannel(id, options) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.openChannel(account, options);
    }
    async updateRoutingFees(id, options) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.updateRoutingFees(account, options);
    }
    async getForwards(id, options) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.getForwards(account, options);
    }
    async getPayments(id, options) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.getPayments(account, options);
    }
    async getInvoices(id, options) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.getInvoices(account, options);
    }
    async payViaPaymentDetails(id, options) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.payViaPaymentDetails(account, options);
    }
    subscribeToInvoice(id, invoice) {
        const account = this.accountsService.getAccount(id);
        if (!account)
            throw new Error('Node account not found');
        return this.lndService.subscribeToInvoice(account, invoice);
    }
};
NodeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [accounts_service_1.AccountsService,
        lnd_service_1.LndService])
], NodeService);
exports.NodeService = NodeService;
//# sourceMappingURL=node.service.js.map
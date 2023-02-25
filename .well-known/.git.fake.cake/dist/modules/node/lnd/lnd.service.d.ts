/// <reference types="node" />
import { GetChannelsArgs, VerifyBackupsArgs, SendToChainAddressArgs, DiffieHellmanComputeSecretArgs, PayArgs, CreateInvoiceArgs, CloseChannelArgs, OpenChannelArgs, UpdateRoutingFeesArgs, GetForwardsArgs, PayViaPaymentDetailsArgs, GetPaymentsArgs, GrantAccessArgs, GetInvoicesArgs, CreateChainAddressArgs } from 'lightning';
import { EnrichedAccount } from '../../accounts/accounts.types';
import EventEmitter from 'events';
export declare class LndService {
    getWalletInfo(account: EnrichedAccount): Promise<import("lightning").GetWalletInfoResult>;
    getWalletVersion(account: EnrichedAccount): Promise<import("lightning").GetWalletVersionResult>;
    getHeight(account: EnrichedAccount): Promise<import("lightning").GetHeightResult>;
    getClosedChannels(account: EnrichedAccount): Promise<import("lightning").GetClosedChannelsResult>;
    getPendingChannels(account: EnrichedAccount): Promise<import("lightning").GetPendingChannelsResult>;
    getChannels(account: EnrichedAccount, options?: Omit<GetChannelsArgs, 'lnd'>): Promise<import("lightning").GetChannelsResult>;
    getChannelBalance(account: EnrichedAccount): Promise<import("lightning").GetChannelBalanceResult>;
    getChainBalance(account: EnrichedAccount): Promise<import("lightning").GetChainBalanceResult>;
    getPendingChainBalance(account: EnrichedAccount): Promise<import("lightning").GetPendingChainBalanceResult>;
    getNode(account: EnrichedAccount, public_key: string, is_omitting_channels?: boolean): Promise<import("lightning").GetNodeResult>;
    verifyBackup(account: EnrichedAccount, backup: string): Promise<{
        is_valid: boolean;
    }>;
    verifyBackups(account: EnrichedAccount, args: Omit<VerifyBackupsArgs, 'lnd'>): Promise<import("lightning").VerifyBackupsResult>;
    recoverFundsFromChannels(account: EnrichedAccount, backup: string): Promise<void>;
    getBackups(account: EnrichedAccount): Promise<import("lightning").GetBackupsResult>;
    verifyMessage(account: EnrichedAccount, message: string, signature: string): Promise<import("lightning").VerifyMessageResult>;
    signMessage(account: EnrichedAccount, message: string): Promise<import("lightning").SignMessageResult>;
    grantAccess(account: EnrichedAccount, permissions: Omit<GrantAccessArgs, 'lnd'>): Promise<import("lightning").GrantAccessResult>;
    getNetworkInfo(account: EnrichedAccount): Promise<import("lightning").GetNetworkInfoResult>;
    getPeers(account: EnrichedAccount): Promise<import("lightning").GetPeersResult>;
    addPeer(account: EnrichedAccount, public_key: string, socket: string, is_temporary: boolean): Promise<void>;
    removePeer(account: EnrichedAccount, public_key: string): Promise<void>;
    getChainTransactions(account: EnrichedAccount): Promise<import("lightning").GetChainTransactionsResult>;
    getUtxos(account: EnrichedAccount): Promise<import("lightning").GetUtxosResult>;
    createChainAddress(account: EnrichedAccount, is_unused: boolean, format: CreateChainAddressArgs['format']): Promise<import("lightning").CreateChainAddressResult>;
    sendToChainAddress(account: EnrichedAccount, options: Omit<SendToChainAddressArgs, 'lnd'>): Promise<import("lightning").SendToChainAddressResult>;
    diffieHellmanComputeSecret(account: EnrichedAccount, options: Omit<DiffieHellmanComputeSecretArgs, 'lnd'>): Promise<import("lightning").DiffieHellmanComputeSecretResult>;
    decodePaymentRequest(account: EnrichedAccount, request: string): Promise<import("lightning").DecodePaymentRequestResult>;
    pay(account: EnrichedAccount, options: Omit<PayArgs, 'lnd'>): Promise<import("lightning").PayResult>;
    createInvoice(account: EnrichedAccount, options: Omit<CreateInvoiceArgs, 'lnd'>): Promise<import("lightning").CreateInvoiceResult>;
    getChannel(account: EnrichedAccount, id: string): Promise<import("lightning").GetChannelResult>;
    closeChannel(account: EnrichedAccount, options: Omit<CloseChannelArgs, 'lnd'>): Promise<import("lightning").CloseChannelResult>;
    openChannel(account: EnrichedAccount, options: Omit<OpenChannelArgs, 'lnd'>): Promise<import("lightning").OpenChannelResult>;
    updateRoutingFees(account: EnrichedAccount, options: Omit<UpdateRoutingFeesArgs, 'lnd'>): Promise<import("lightning").UpdateRoutingFeesResult>;
    getForwards(account: EnrichedAccount, options: Omit<GetForwardsArgs, 'lnd'>): Promise<import("lightning").GetForwardsResult>;
    getPayments(account: EnrichedAccount, options: Omit<GetPaymentsArgs, 'lnd'>): Promise<import("lightning").GetPaymentsResult>;
    getInvoices(account: EnrichedAccount, options: Omit<GetInvoicesArgs, 'lnd'>): Promise<import("lightning").GetInvoicesResult>;
    payViaPaymentDetails(account: EnrichedAccount, options: Omit<PayViaPaymentDetailsArgs, 'lnd' | 'routes'>): Promise<import("lightning").PayViaPaymentDetailsResult>;
    subscribeToInvoice(account: EnrichedAccount, id: string): EventEmitter;
}

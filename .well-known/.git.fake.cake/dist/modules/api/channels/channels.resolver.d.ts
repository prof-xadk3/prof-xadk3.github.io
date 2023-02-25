import { Logger } from 'winston';
import { NodeService } from '../../node/node.service';
import { UserId } from '../../security/security.types';
import { UpdateRoutingFeesParams } from './channels.types';
export declare class ChannelsResolver {
    private nodeService;
    private readonly logger;
    constructor(nodeService: NodeService, logger: Logger);
    getChannel(user: UserId, id: string): Promise<{
        node_policies: any;
        partner_node_policies: any;
        capacity: number;
        id: string;
        policies: {
            base_fee_mtokens?: string;
            cltv_delta?: number;
            fee_rate?: number;
            is_disabled?: boolean;
            max_htlc_mtokens?: string;
            min_htlc_mtokens?: string;
            public_key: string;
            updated_at?: string;
        }[];
        transaction_id: string;
        transaction_vout: number;
        updated_at?: string;
    }>;
    getChannels({ id }: UserId, is_active?: boolean): Promise<{
        partner_fee_info: {
            localKey: string;
        };
        channel_age: number;
        partner_node_info: {
            publicKey: string;
        };
        capacity: number;
        commit_transaction_fee: number;
        commit_transaction_weight: number;
        cooperative_close_address?: string;
        cooperative_close_delay_height?: number;
        id: string;
        is_active: boolean;
        is_closing: boolean;
        is_opening: boolean;
        is_partner_initiated: boolean;
        is_private: boolean;
        is_trusted_funding?: boolean;
        local_balance: number;
        local_csv?: number;
        local_dust?: number;
        local_given?: number;
        local_max_htlcs?: number;
        local_max_pending_mtokens?: string;
        local_min_htlc_mtokens?: string;
        local_reserve: number;
        other_ids: string[];
        partner_public_key: string;
        past_states: number;
        pending_payments: {
            id: string;
            in_channel?: string;
            in_payment?: number;
            is_forward?: boolean;
            is_outgoing: boolean;
            out_channel?: string;
            out_payment?: number;
            payment?: number;
            timeout: number;
            tokens: number;
        }[];
        received: number;
        remote_balance: number;
        remote_csv?: number;
        remote_dust?: number;
        remote_given?: number;
        remote_max_htlcs?: number;
        remote_max_pending_mtokens?: string;
        remote_min_htlc_mtokens?: string;
        remote_reserve: number;
        sent: number;
        time_offline?: number;
        time_online?: number;
        transaction_id: string;
        transaction_vout: number;
        unsettled_balance: number;
    }[]>;
    getClosedChannels({ id }: UserId): Promise<{
        partner_node_info: {
            publicKey: string;
        };
        channel_age: number;
        closed_for_blocks: number;
        capacity: number;
        close_balance_spent_by?: string;
        close_balance_vout?: number;
        close_payments: {
            is_outgoing: boolean;
            is_paid: boolean;
            is_pending: boolean;
            is_refunded: boolean;
            spent_by?: string;
            tokens: number;
            transaction_id: string;
            transaction_vout: number;
        }[];
        close_confirm_height?: number;
        close_transaction_id?: string;
        final_local_balance: number;
        final_time_locked_balance: number;
        id?: string;
        is_breach_close: boolean;
        is_cooperative_close: boolean;
        is_funding_cancel: boolean;
        is_local_force_close: boolean;
        is_partner_closed?: boolean;
        is_partner_initiated?: boolean;
        is_remote_force_close: boolean;
        other_ids: string[];
        partner_public_key: string;
        transaction_id: string;
        transaction_vout: number;
    }[]>;
    getPendingChannels({ id }: UserId): Promise<{
        partner_node_info: {
            publicKey: string;
        };
        capacity: number;
        close_transaction_id?: string;
        is_active: boolean;
        is_closing: boolean;
        is_opening: boolean;
        is_partner_initiated?: boolean;
        is_timelocked: boolean;
        local_balance: number;
        local_reserve: number;
        partner_public_key: string;
        pending_balance?: number;
        pending_payments?: {
            is_incoming: boolean;
            timelock_height: number;
            tokens: number;
            transaction_id: string;
            transaction_vout: number;
        }[];
        received: number;
        recovered_tokens?: number;
        remote_balance: number;
        remote_reserve: number;
        sent: number;
        timelock_blocks?: number;
        timelock_expiration?: number;
        transaction_fee?: number;
        transaction_id: string;
        transaction_vout: number;
        transaction_weight?: number;
    }[]>;
    closeChannel(user: UserId, id: string, target_confirmations: number, tokens_per_vbyte: number, is_force_close: boolean): Promise<{
        transactionId: string;
        transactionOutputIndex: number;
    }>;
    openChannel(user: UserId, local_tokens: number, partner_public_key: string, is_private: boolean, pushTokens: number, chain_fee_tokens_per_vbyte: number): Promise<{
        transactionId: string;
        transactionOutputIndex: number;
    }>;
    updateFees(user: UserId, transaction_id: string, transaction_vout: number, base_fee_tokens: number, fee_rate: number, cltv_delta: number, max_htlc_mtokens: string, min_htlc_mtokens: string): Promise<boolean>;
    updateMultipleFees(user: UserId, channels: UpdateRoutingFeesParams[]): Promise<boolean>;
}

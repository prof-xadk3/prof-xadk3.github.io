import { Node } from '../node/node.types';
export declare class PendingResume {
    incoming_tokens: number;
    outgoing_tokens: number;
    incoming_amount: number;
    outgoing_amount: number;
    total_tokens: number;
    total_amount: number;
}
export declare class PendingPayment {
    id: string;
    is_outgoing: boolean;
    timeout: number;
    tokens: number;
}
export declare class Policy {
    base_fee_mtokens: string;
    cltv_delta: number;
    fee_rate: number;
    is_disabled: boolean;
    max_htlc_mtokens: string;
    min_htlc_mtokens: string;
    public_key: string;
    updated_at: string;
}
export declare class NodePolicy {
    base_fee_mtokens: string;
    cltv_delta: number;
    fee_rate: number;
    is_disabled: boolean;
    max_htlc_mtokens: string;
    min_htlc_mtokens: string;
    updated_at: string;
    node: Node;
    public_key: string;
}
export declare class SingleChannel {
    capacity: number;
    id: string;
    policies: Policy[];
    transaction_id: string;
    transaction_vout: number;
    updated_at: string;
    node_policies: NodePolicy;
    partner_node_policies: NodePolicy;
}
export declare class Channel {
    capacity: number;
    commit_transaction_fee: number;
    commit_transaction_weight: number;
    id: string;
    is_active: boolean;
    is_closing: boolean;
    is_opening: boolean;
    is_partner_initiated: boolean;
    is_private: boolean;
    local_balance: number;
    local_reserve: number;
    partner_public_key: string;
    past_states: number;
    received: number;
    remote_balance: number;
    remote_reserve: number;
    sent: number;
    time_offline: number;
    time_online: number;
    transaction_id: string;
    transaction_vout: number;
    unsettled_balance: number;
    partner_node_info: Node;
    partner_fee_info: SingleChannel;
    channel_age: number;
    pending_payments: PendingPayment[];
    pending_resume: PendingResume;
}
export type SingleChannelParentType = {
    id: string;
    partner_fee_info: {
        lnd: any;
        localKey: string;
    };
};
export declare class ClosedChannel {
    capacity: number;
    close_confirm_height: number;
    close_transaction_id: string;
    final_local_balance: number;
    final_time_locked_balance: number;
    id: string;
    is_breach_close: boolean;
    is_cooperative_close: boolean;
    is_funding_cancel: boolean;
    is_local_force_close: boolean;
    is_remote_force_close: boolean;
    partner_public_key: string;
    transaction_id: string;
    transaction_vout: number;
    partner_node_info: Node;
    channel_age: number;
    closed_for_blocks: number;
}
export declare class PendingChannel {
    close_transaction_id: string;
    is_active: boolean;
    is_closing: boolean;
    is_opening: boolean;
    is_timelocked: boolean;
    local_balance: number;
    local_reserve: number;
    partner_public_key: string;
    received: number;
    remote_balance: number;
    remote_reserve: number;
    sent: number;
    transaction_fee: number;
    transaction_id: string;
    transaction_vout: number;
    partner_node_info: Node;
    timelock_blocks: number;
    timelock_expiration: number;
}
export declare class OpenOrCloseChannel {
    transactionId: string;
    transactionOutputIndex: string;
}
export declare class UpdateRoutingFeesParams {
    transaction_id?: string;
    transaction_vout?: number;
    base_fee_mtokens?: string;
    base_fee_tokens?: number;
    cltv_delta?: number;
    fee_rate?: number;
    max_htlc_mtokens?: string;
    min_htlc_mtokens?: string;
}

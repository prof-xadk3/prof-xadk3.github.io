import { NodeService } from '../../node/node.service';
import { UserId } from '../../security/security.types';
export declare class TransactionsResolver {
    private nodeService;
    constructor(nodeService: NodeService);
    getInvoices(user: UserId, token: string): Promise<{
        next: string;
        invoices: {
            type: string;
            date: string;
            payments: {
                messages: {
                    [key: string]: string;
                };
                confirmed_at?: string;
                created_at: string;
                created_height: number;
                in_channel: string;
                is_canceled: boolean;
                is_confirmed: boolean;
                is_held: boolean;
                mtokens: string;
                pending_index?: number;
                tokens: number;
                total_mtokens?: string;
            }[];
            chain_address?: string;
            confirmed_at?: string;
            created_at: string;
            description: string;
            description_hash?: string;
            expires_at: string;
            features: {
                bit: number;
                is_known: boolean;
                is_required: boolean;
                type: string;
            }[];
            id: string;
            is_canceled?: boolean;
            is_confirmed: boolean;
            is_held?: boolean;
            is_private: boolean;
            is_push?: boolean;
            payment?: string;
            received: number;
            received_mtokens: string;
            request?: string;
            secret: string;
            tokens: number;
        }[];
    }>;
    getPayments(user: UserId, token: string): Promise<{
        next: string;
        payments: {
            type: string;
            date: string;
            destination_node: {
                publicKey: string;
            };
            hops: {
                publicKey: string;
            }[];
            attempts: {
                failure?: {
                    code: number;
                    details?: {
                        channel?: string;
                        height?: number;
                        index?: number;
                        mtokens?: string;
                        policy?: {
                            base_fee_mtokens: string;
                            cltv_delta: number;
                            fee_rate: number;
                            is_disabled?: boolean;
                            max_htlc_mtokens: string;
                            min_htlc_mtokens: string;
                            updated_at: string;
                        };
                        timeout_height?: number;
                        update?: {
                            chain: string;
                            channel_flags: number;
                            extra_opaque_data: string;
                            message_flags: number;
                            signature: string;
                        };
                    };
                    message: string;
                };
                confirmed_at?: string;
                is_confirmed: boolean;
                is_failed: boolean;
                is_pending: boolean;
                route: {
                    fee: number;
                    fee_mtokens: string;
                    hops: {
                        channel: string;
                        channel_capacity: number;
                        fee: number;
                        fee_mtokens: string;
                        forward: number;
                        forward_mtokens: string;
                        public_key?: string;
                        timeout?: number;
                    }[];
                    mtokens: string;
                    payment?: string;
                    timeout: number;
                    tokens: number;
                    total_mtokens?: string;
                };
            }[];
            confirmed_at: string;
            created_at: string;
            destination: string;
            fee: number;
            fee_mtokens: string;
            id: string;
            index?: number;
            is_confirmed: boolean;
            is_outgoing: boolean;
            mtokens: string;
            request?: string;
            safe_fee: number;
            safe_tokens: number;
            secret: string;
            tokens: number;
        }[];
    }>;
}

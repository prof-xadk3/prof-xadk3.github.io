import { Logger } from 'winston';
import { NodeService } from '../../node/node.service';
import { UserId } from '../../security/security.types';
import { Channel, SingleChannelParentType } from './channels.types';
export declare class ChannelResolver {
    private nodeService;
    private readonly logger;
    constructor(nodeService: NodeService, logger: Logger);
    time_offline({ time_offline }: Channel): Promise<number>;
    time_online({ time_online }: Channel): Promise<number>;
    pending_resume({ pending_payments }: Channel): Promise<{
        total_tokens: number;
        total_amount: number;
        incoming_tokens: number;
        outgoing_tokens: number;
        incoming_amount: number;
        outgoing_amount: number;
    }>;
    partner_fee_info(user: UserId, { id, partner_fee_info: { localKey } }: SingleChannelParentType): Promise<{
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
}

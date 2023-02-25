import { NodeService } from '../../node/node.service';
import { UserId } from '../../security/security.types';
import { Logger } from 'winston';
import { FetchService } from '../../fetch/fetch.service';
import { ConfigService } from '@nestjs/config';
export declare class LightningBalanceResolver {
    private nodeService;
    constructor(nodeService: NodeService);
    pending({ id }: UserId): Promise<number>;
}
export declare class OnChainBalanceResolver {
    private nodeService;
    constructor(nodeService: NodeService);
    confirmed({ id }: UserId): Promise<number>;
    pending({ id }: UserId): Promise<number>;
    closing({ id }: UserId): Promise<number>;
}
export declare class BalancesResolver {
    private nodeService;
    constructor(nodeService: NodeService);
    onchain(): Promise<number>;
    lightning({ id }: UserId): Promise<{
        confirmed: number;
        active: number;
        commit: number;
    }>;
}
export declare class NodeResolver {
    private nodeService;
    private readonly logger;
    constructor(nodeService: NodeService, logger: Logger);
    getNodeBalances(): Promise<{}>;
    getNode(withoutChannels: boolean, publicKey: string): Promise<{
        publicKey: string;
        withoutChannels: boolean;
    }>;
    getNodeInfo({ id }: UserId): Promise<{
        pending_channels_count: number;
        closed_channels_count: number;
        active_channels_count: number;
        alias: string;
        chains: string[];
        color: string;
        current_block_hash: string;
        current_block_height: number;
        features: {
            bit: number;
            is_known: boolean;
            is_required: boolean;
            type: string;
        }[];
        is_synced_to_chain: boolean;
        latest_block_at: string;
        peers_count: number;
        public_key: string;
        version: string;
    }>;
}
export declare class NodeFieldResolver {
    private nodeService;
    private fetchService;
    private configService;
    private readonly logger;
    constructor(nodeService: NodeService, fetchService: FetchService, configService: ConfigService, logger: Logger);
    node({ publicKey }: {
        publicKey: string;
    }, { id }: UserId): Promise<{
        alias: any;
        public_key: string;
    } | {
        public_key: string;
        alias: string;
        capacity: number;
        channel_count: number;
        channels?: {
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
        }[];
        color: string;
        features: {
            bit: number;
            is_known: boolean;
            is_required: boolean;
            type: string;
        }[];
        sockets: {
            socket: string;
            type: string;
        }[];
        updated_at?: string;
    }>;
}

import { Logger } from 'winston';
import { NodeService } from '../../node/node.service';
import { UserId } from '../../security/security.types';
export declare class PeerResolver {
    private nodeService;
    private readonly logger;
    constructor(nodeService: NodeService, logger: Logger);
    getPeers({ id }: UserId): Promise<{
        partner_node_info: {
            publicKey: string;
        };
        bytes_received: number;
        bytes_sent: number;
        features: {
            bit: number;
            is_known: boolean;
            is_required: boolean;
            type: string;
        }[];
        is_inbound: boolean;
        is_sync_peer?: boolean;
        last_reconnection?: string;
        ping_time: number;
        public_key: string;
        reconnection_rate?: number;
        socket: string;
        tokens_received: number;
        tokens_sent: number;
    }[]>;
    addPeer(url: string, publicKey: string, socket: string, isTemporary: boolean, { id }: UserId): Promise<boolean>;
    removePeer(publicKey: string, { id }: UserId): Promise<boolean>;
}

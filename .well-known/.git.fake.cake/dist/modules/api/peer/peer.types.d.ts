import { Node } from '../node/node.types';
export declare class Peer {
    bytes_received: number;
    bytes_sent: number;
    is_inbound: boolean;
    is_sync_peer: boolean;
    ping_time: number;
    public_key: string;
    socket: string;
    tokens_received: number;
    tokens_sent: number;
    partner_node_info: Node;
}

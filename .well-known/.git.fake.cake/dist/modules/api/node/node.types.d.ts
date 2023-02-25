export declare class NodeType {
    alias: string;
    public_key: string;
}
export declare class Node {
    node: NodeType;
}
export declare class NodeInfo {
    chains: string[];
    color: string;
    active_channels_count: number;
    closed_channels_count: number;
    alias: string;
    current_block_hash: string;
    current_block_height: number;
    is_synced_to_chain: boolean;
    is_synced_to_graph: boolean;
    latest_block_at: string;
    peers_count: number;
    pending_channels_count: number;
    public_key: string;
    uris: string[];
    version: string;
}
export declare class OnChainBalance {
    confirmed: string;
    pending: string;
    closing: string;
}
export declare class LightningBalance {
    confirmed: string;
    active: string;
    commit: string;
    pending: string;
}
export declare class Balances {
    onchain: OnChainBalance;
    lightning: LightningBalance;
}

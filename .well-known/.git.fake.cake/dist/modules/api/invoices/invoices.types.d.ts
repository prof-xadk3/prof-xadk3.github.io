import { Node } from '../node/node.types';
export declare class Route {
    base_fee_mtokens: string;
    channel: string;
    cltv_delta: number;
    fee_rate: number;
    public_key: string;
}
export declare class DecodeInvoice {
    chain_address: string;
    cltv_delta: number;
    description: string;
    description_hash: string;
    destination: string;
    expires_at: string;
    id: string;
    mtokens: string;
    payment: string;
    routes: Route[][];
    safe_tokens: number;
    tokens: number;
    destination_node: Node;
}
export declare class CreateInvoice {
    chain_address?: string;
    created_at: string;
    description: string;
    id: string;
    mtokens?: string;
    request: string;
    secret: string;
    tokens?: number;
}
export declare class Hops {
    channel: string;
    channel_capacity: number;
    fee_mtokens: string;
    forward_mtokens: string;
    timeout: number;
}
export declare class PayInvoice {
    fee: number;
    fee_mtokens: string;
    hops: Hops[];
    id: string;
    is_confirmed: boolean;
    is_outgoing: boolean;
    mtokens: string;
    secret: string;
    safe_fee: number;
    safe_tokens: number;
    tokens: number;
}

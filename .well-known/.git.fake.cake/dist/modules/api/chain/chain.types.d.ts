export declare class Utxo {
    address: string;
    address_format: string;
    confirmation_count: number;
    output_script: string;
    tokens: number;
    transaction_id: string;
    transaction_vout: number;
}
export declare class ChainTransaction {
    block_id?: string;
    confirmation_count?: number;
    confirmation_height?: number;
    created_at: string;
    description?: string;
    fee?: number;
    id: string;
    is_confirmed: boolean;
    is_outgoing: boolean;
    output_addresses: string[];
    tokens: number;
    transaction?: string;
}
export declare class ChainAddressSend {
    confirmationCount: number;
    id: string;
    isConfirmed: boolean;
    isOutgoing: boolean;
    tokens: number;
}

export declare class NetworkInfoInput {
    is_ok_to_adjust_peers: boolean;
    is_ok_to_create_chain_addresses: boolean;
    is_ok_to_create_invoices: boolean;
    is_ok_to_create_macaroons: boolean;
    is_ok_to_derive_keys: boolean;
    is_ok_to_get_access_ids: boolean;
    is_ok_to_get_chain_transactions: boolean;
    is_ok_to_get_invoices: boolean;
    is_ok_to_get_wallet_info: boolean;
    is_ok_to_get_payments: boolean;
    is_ok_to_get_peers: boolean;
    is_ok_to_pay: boolean;
    is_ok_to_revoke_access_ids: boolean;
    is_ok_to_send_to_chain_addresses: boolean;
    is_ok_to_sign_bytes: boolean;
    is_ok_to_sign_messages: boolean;
    is_ok_to_stop_daemon: boolean;
    is_ok_to_verify_bytes_signatures: boolean;
    is_ok_to_verify_messages: boolean;
}
export declare class CreateMacaroon {
    base: string;
    hex: string;
}

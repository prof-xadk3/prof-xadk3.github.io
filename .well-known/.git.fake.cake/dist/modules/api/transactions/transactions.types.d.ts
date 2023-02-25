import { Node } from '../node/node.types';
export declare class MessageType {
    message: string;
}
export declare class InvoicePayment {
    canceled_at: string;
    confirmed_at: string;
    created_at: string;
    created_height: number;
    is_canceled: boolean;
    is_confirmed: boolean;
    is_held: boolean;
    mtokens: string;
    pending_index: number;
    timeout: number;
    tokens: number;
    total_mtokens: string;
    in_channel: string;
    messages: MessageType;
}
export declare class InvoiceType {
    chain_address: string;
    confirmed_at: string;
    created_at: string;
    description: string;
    description_hash: string;
    expires_at: string;
    id: string;
    is_canceled: boolean;
    is_confirmed: boolean;
    is_held: boolean;
    is_private: boolean;
    is_push: boolean;
    received: number;
    received_mtokens: string;
    request: string;
    secret: string;
    tokens: string;
    type: string;
    date: string;
    payments: InvoicePayment[];
}
export declare class PaymentType {
    created_at: string;
    destination: string;
    destination_node: Node;
    fee: number;
    fee_mtokens: string;
    hops: Node[];
    id: string;
    index: number;
    is_confirmed: boolean;
    is_outgoing: boolean;
    mtokens: string;
    request: string;
    safe_fee: number;
    safe_tokens: number;
    secret: string;
    tokens: string;
    type: string;
    date: string;
}
export declare class GetInvoicesType {
    next: string;
    invoices: InvoiceType[];
}
export declare class GetPaymentsType {
    next: string;
    payments: PaymentType[];
}

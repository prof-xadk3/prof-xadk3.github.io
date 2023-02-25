import { Logger } from 'winston';
import { NodeService } from '../../node/node.service';
import { UserId } from '../../security/security.types';
export declare class InvoicesResolver {
    private nodeService;
    private readonly logger;
    constructor(nodeService: NodeService, logger: Logger);
    getInvoiceStatusChange(user: UserId, id: string): Promise<string>;
    decodeRequest(user: UserId, request: string): Promise<{
        destination_node: {
            publicKey: string;
        };
        chain_address: string;
        cltv_delta?: number;
        description: string;
        description_hash: string;
        destination: string;
        expires_at: string;
        features: {
            bit: number;
            is_known: boolean;
            is_required: boolean;
            type: string;
        }[];
        id: string;
        mtokens: string;
        payment?: string;
        routes: {
            base_fee_mtokens?: string;
            channel?: string;
            cltv_delta?: number;
            fee_rate?: number;
            public_key: string;
        }[][];
        safe_tokens: number;
        tokens: number;
    }>;
    createInvoice(user: UserId, amount: number, description: string, secondsUntil: number, includePrivate: boolean): Promise<import("lightning").CreateInvoiceResult>;
    keysend(user: UserId, tokens: number, destination: string): Promise<import("lightning").PayViaPaymentDetailsResult>;
    pay(user: UserId, max_fee: number, max_paths: number, request: string, outgoing_channels: string[]): Promise<boolean>;
}

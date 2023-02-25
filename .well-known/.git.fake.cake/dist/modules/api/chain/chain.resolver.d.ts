import { NodeService } from '../../node/node.service';
import { UserId } from '../../security/security.types';
import { Logger } from 'winston';
export declare class ChainResolver {
    private nodeService;
    private readonly logger;
    constructor(nodeService: NodeService, logger: Logger);
    getChainTransactions({ id }: UserId): Promise<import("lightning").ChainTransaction[]>;
    getUtxos({ id }: UserId): Promise<{
        address: string;
        address_format: string;
        confirmation_count: number;
        output_script: string;
        tokens: number;
        transaction_id: string;
        transaction_vout: number;
    }[]>;
    createAddress(type: string, { id }: UserId): Promise<string>;
    sendToAddress(address: string, tokens: number, fee: number, target: number, sendAllFlag: boolean, { id }: UserId): Promise<{
        tokens: number;
        confirmationCount: number;
        id: string;
        isConfirmed: boolean;
        isOutgoing: boolean;
    }>;
}

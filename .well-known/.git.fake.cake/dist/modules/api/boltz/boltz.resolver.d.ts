import { Logger } from 'winston';
import { NodeService } from '../../node/node.service';
import { BoltzService } from './boltz.service';
import { CreateBoltzReverseSwapType } from './boltz.types';
import { UserId } from '../../security/security.types';
export declare class BoltzSwapResolver {
    private boltzService;
    private readonly logger;
    constructor(boltzService: BoltzService, logger: Logger);
    id(parent: string): Promise<string>;
    boltz(parent: string): Promise<any>;
}
export declare class CreateBoltzReverseSwapTypeResolver {
    private nodeService;
    constructor(nodeService: NodeService);
    decodedInvoice(user: UserId, parent: CreateBoltzReverseSwapType): Promise<{
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
}
export declare class BoltzResolver {
    private nodeService;
    private boltzService;
    private readonly logger;
    constructor(nodeService: NodeService, boltzService: BoltzService, logger: Logger);
    getBoltzInfo(): Promise<{
        max: any;
        min: any;
        feePercent: any;
    }>;
    getBoltzSwapStatus(ids: string[]): Promise<string[]>;
    claimBoltzTransaction(redeem: string, transaction: string, preimage: string, privateKey: string, destination: string, fee: number): Promise<any>;
    createBoltzReverseSwap(user: UserId, amount: number, address: string): Promise<any>;
}

import { ConfigService } from '@nestjs/config';
import { Logger } from 'winston';
import { FetchService } from '../../fetch/fetch.service';
export declare class BoltzService {
    private configService;
    private fetchService;
    private readonly logger;
    constructor(configService: ConfigService, fetchService: FetchService, logger: Logger);
    getPairs(): Promise<any>;
    getFeeEstimations(): Promise<any>;
    getSwapStatus(id: string): Promise<any>;
    createReverseSwap(invoiceAmount: number, preimageHash: string, claimPublicKey: string): Promise<any>;
    broadcastTransaction(transactionHex: string): Promise<any>;
}

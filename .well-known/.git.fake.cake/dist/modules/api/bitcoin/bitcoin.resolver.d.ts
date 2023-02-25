import { FetchService } from '../../fetch/fetch.service';
import { Logger } from 'winston';
import { ConfigService } from '@nestjs/config';
export declare class BitcoinResolver {
    private configService;
    private fetchService;
    private readonly logger;
    constructor(configService: ConfigService, fetchService: FetchService, logger: Logger);
    getBitcoinPrice(): Promise<string>;
    getBitcoinFees(): Promise<{
        fast: any;
        halfHour: any;
        hour: any;
        minimum: any;
    }>;
}

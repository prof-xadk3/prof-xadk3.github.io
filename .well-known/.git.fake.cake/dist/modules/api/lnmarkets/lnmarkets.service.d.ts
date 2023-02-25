import { Logger } from 'winston';
import { FetchService } from '../../fetch/fetch.service';
import { ConfigService } from '@nestjs/config';
import { LnUrlService } from '../lnurl/lnurl.service';
export declare class LnMarketsService {
    private configService;
    private fetchService;
    private lnUrlService;
    private readonly logger;
    constructor(configService: ConfigService, fetchService: FetchService, lnUrlService: LnUrlService, logger: Logger);
    getUser(token: string): Promise<any>;
    getDepositInvoice(token: string, amount: number): Promise<any>;
    withdraw(token: string, amount: number, invoice: string): Promise<any>;
    getLnMarketsAuth(id: string, cookie?: string | null): Promise<{
        newCookie: boolean;
        cookieString?: string;
        json?: {
            status: string;
            reason: string;
            token: string;
        };
    }>;
}

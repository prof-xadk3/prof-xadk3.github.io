import { ConfigService } from '@nestjs/config';
import { FetchService } from '../../fetch/fetch.service';
export declare class BaseResolver {
    private configService;
    private fetchService;
    constructor(configService: ConfigService, fetchService: FetchService);
    getBaseCanConnect(): Promise<boolean>;
    getBaseNodes(): Promise<any>;
    getBasePoints(): Promise<any>;
    createBaseInvoice(amount: number): Promise<any>;
    createThunderPoints(id: string, alias: string, uris: string[], public_key: string): Promise<boolean>;
}

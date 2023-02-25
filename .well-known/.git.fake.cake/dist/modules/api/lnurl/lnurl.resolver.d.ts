import { FetchService } from '../../fetch/fetch.service';
import { UserId } from '../../security/security.types';
import { LnUrlService } from './lnurl.service';
import { Logger } from 'winston';
import { NodeService } from '../../node/node.service';
export declare class LnUrlResolver {
    private fetchService;
    private lnUrlService;
    private nodeService;
    private readonly logger;
    constructor(fetchService: FetchService, lnUrlService: LnUrlService, nodeService: NodeService, logger: Logger);
    getLightningAddressInfo(address: string): Promise<any>;
    lnUrlAuth({ id }: UserId, url: string): Promise<any>;
    fetchLnUrl(url: string): Promise<any>;
    lnUrlPay({ id }: UserId, callback: string, amount: number, comment: string): Promise<{
        tag: string;
    } | {
        tag: string;
        message: string;
    }>;
    lnUrlWithdraw({ id }: UserId, callback: string, amount: number, description: string, k1: string): Promise<string>;
    lnUrlChannel({ id }: UserId, callback: string, uri: string, k1: string): Promise<string>;
}

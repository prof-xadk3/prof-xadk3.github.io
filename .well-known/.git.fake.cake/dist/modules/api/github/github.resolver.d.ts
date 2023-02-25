import { FetchService } from '../../fetch/fetch.service';
import { Logger } from 'winston';
import { ConfigService } from '@nestjs/config';
export declare class GithubResolver {
    private configService;
    private fetchService;
    private readonly logger;
    constructor(configService: ConfigService, fetchService: FetchService, logger: Logger);
    getLatestVersion(): Promise<any>;
}

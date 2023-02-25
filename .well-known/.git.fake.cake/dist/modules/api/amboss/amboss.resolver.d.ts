import { FetchService } from '../../fetch/fetch.service';
import { ContextType } from 'src/server/app.module';
import { Logger } from 'winston';
import { ConfigService } from '@nestjs/config';
import { NodeService } from '../../node/node.service';
import { UserId } from '../../security/security.types';
import { AmbossService } from './amboss.service';
export declare class AmbossResolver {
    private nodeService;
    private configService;
    private fetchService;
    private ambossService;
    private readonly logger;
    constructor(nodeService: NodeService, configService: ConfigService, fetchService: FetchService, ambossService: AmbossService, logger: Logger);
    getAmbossUser({ ambossAuth }: ContextType): Promise<any>;
    getAmbossLoginToken({ ambossAuth }: ContextType): Promise<any>;
    getLightningAddresses(): Promise<any>;
    getNodeSocialInfo(pubkey: string, { ambossAuth }: ContextType): Promise<any>;
    loginAmboss({ res }: ContextType, user: UserId): Promise<boolean>;
    pushBackup({ id }: UserId): Promise<boolean>;
}

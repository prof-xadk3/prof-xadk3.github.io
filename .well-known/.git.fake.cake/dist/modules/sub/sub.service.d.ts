import { OnApplicationBootstrap } from '@nestjs/common';
import { Logger } from 'winston';
import { AccountsService } from '../accounts/accounts.service';
import { WsService } from '../ws/ws.service';
import { ConfigService } from '@nestjs/config';
import { NodeService } from '../node/node.service';
import { UserConfigService } from '../api/userConfig/userConfig.service';
import { AmbossService } from '../api/amboss/amboss.service';
export declare class SubService implements OnApplicationBootstrap {
    private ambossService;
    private accountsService;
    private wsService;
    private configService;
    private nodeService;
    private userConfigService;
    private readonly logger;
    subscriptions: any[];
    retryCount: number;
    constructor(ambossService: AmbossService, accountsService: AccountsService, wsService: WsService, configService: ConfigService, nodeService: NodeService, userConfigService: UserConfigService, logger: Logger);
    onApplicationBootstrap(): Promise<void>;
    startSubscription(): Promise<any>;
}

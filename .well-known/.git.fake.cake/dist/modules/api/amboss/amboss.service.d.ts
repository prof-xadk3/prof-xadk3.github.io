import { ConfigService } from '@nestjs/config';
import { Logger } from 'winston';
import { AccountsService } from '../../accounts/accounts.service';
import { FetchService } from '../../fetch/fetch.service';
import { NodeService } from '../../node/node.service';
import { UserConfigService } from '../userConfig/userConfig.service';
type ChannelBalanceInputType = {
    signature: string;
    timestamp: string;
    pendingChannelBalance?: {
        local: string;
        total: string;
    };
    onchainBalance?: {
        confirmed: string;
        pending: string;
    };
    channelBalance?: {
        local: string;
        total: string;
    };
    channels: {
        balance: string;
        capacity: string;
        chan_id: string;
    }[];
};
export declare class AmbossService {
    private nodeService;
    private fetchService;
    private configService;
    private accountsService;
    private userConfigService;
    private readonly logger;
    constructor(nodeService: NodeService, fetchService: FetchService, configService: ConfigService, accountsService: AccountsService, userConfigService: UserConfigService, logger: Logger);
    ambossUrl: any;
    pushBackup(backup: string, signature: string): Promise<void>;
    pingHealthCheck(timestamp: string, signature: string): Promise<void>;
    pushBalancesToAmboss(input: ChannelBalanceInputType): Promise<void>;
    ping(): Promise<void>;
    pushBalances(): Promise<void>;
}
export {};

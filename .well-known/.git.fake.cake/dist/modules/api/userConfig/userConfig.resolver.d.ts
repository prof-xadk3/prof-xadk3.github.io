import { ConfigService } from '@nestjs/config';
import { Logger } from 'winston';
import { UserConfigService } from './userConfig.service';
import { ConfigFields } from './userConfig.types';
export declare class UserConfigStateResolver {
    private userConfigService;
    private configService;
    private readonly logger;
    constructor(userConfigService: UserConfigService, configService: ConfigService, logger: Logger);
    backup_state(): boolean;
    healthcheck_ping_state(): boolean;
    onchain_push_enabled(): boolean;
    channels_push_enabled(): boolean;
    private_channels_push_enabled(): boolean;
}
export declare class UserConfigResolver {
    private userConfigService;
    private configService;
    constructor(userConfigService: UserConfigService, configService: ConfigService);
    getConfigState(): Promise<{}>;
    toggleConfig(field: ConfigFields): Promise<boolean>;
}

import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'winston';
import { FilesService } from '../../files/files.service';
import { ConfigType } from '../../files/files.types';
export declare class UserConfigService implements OnModuleInit {
    private filesService;
    private configService;
    private readonly logger;
    config: ConfigType;
    constructor(filesService: FilesService, configService: ConfigService, logger: Logger);
    onModuleInit(): Promise<void>;
    getConfig(): ConfigType;
    toggleValue(field: string): void;
    togglePrivateChannelPush(): void;
    toggleChannelPush(): void;
    toggleOnChainPush(): void;
    toggleHealthCheckPing(): void;
    toggleAutoBackups(): void;
}

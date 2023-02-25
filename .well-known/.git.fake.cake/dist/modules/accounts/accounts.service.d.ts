import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FilesService } from '../files/files.service';
import { Logger } from 'winston';
import { EnrichedAccount } from './accounts.types';
export declare class AccountsService implements OnModuleInit {
    private configService;
    private filesService;
    private readonly logger;
    accounts: {
        [key: string]: EnrichedAccount;
    };
    constructor(configService: ConfigService, filesService: FilesService, logger: Logger);
    onModuleInit(): Promise<void>;
    getAccount(id: string): EnrichedAccount;
    getAllAccounts(): {
        [key: string]: EnrichedAccount;
    };
    updateAccountMacaroon(id: string, macaroon: string): void;
    updateAccountSecret(id: string, secret: string): void;
}

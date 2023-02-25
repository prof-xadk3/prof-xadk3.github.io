import { AccountsService } from '../../accounts/accounts.service';
import { Logger } from 'winston';
import { ConfigService } from '@nestjs/config';
import { FilesService } from '../../files/files.service';
import { ContextType } from 'src/server/app.module';
import { NodeService } from '../../node/node.service';
import { UserId } from '../../security/security.types';
export declare class AuthResolver {
    private configService;
    private accountsService;
    private filesService;
    private nodeService;
    private readonly logger;
    constructor(configService: ConfigService, accountsService: AccountsService, filesService: FilesService, nodeService: NodeService, logger: Logger);
    getTwofaSecret({ id }: UserId): Promise<{
        url: string;
        secret: string;
    }>;
    updateTwofaSecret({ id }: UserId, secret: string, token: string): Promise<boolean>;
    removeTwofaSecret({ id }: UserId, token: string): Promise<boolean>;
    getAuthToken(cookie: string, { res }: ContextType): Promise<boolean>;
    getSessionToken(id: string, password: string, token: string, ip: string, { res }: ContextType): Promise<string>;
    logout({ res }: ContextType): Promise<boolean>;
}

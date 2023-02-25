import { ContextType } from 'src/server/app.module';
import { AccountsService } from '../../accounts/accounts.service';
import { ServerAccount } from './account.types';
import { Logger } from 'winston';
import { UserId } from '../../security/security.types';
export declare class AccountResolver {
    private accountsService;
    private readonly logger;
    constructor(accountsService: AccountsService, logger: Logger);
    getAccount(user: UserId): Promise<ServerAccount>;
    getServerAccounts({ authToken }: ContextType): Promise<ServerAccount[]>;
}

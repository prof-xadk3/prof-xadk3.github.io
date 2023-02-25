import { Logger } from 'winston';
import { NodeService } from '../../node/node.service';
import { UserId } from '../../security/security.types';
export declare class ToolsResolver {
    private nodeService;
    private readonly logger;
    constructor(nodeService: NodeService, logger: Logger);
    verifyBackups(backupString: string, { id }: UserId): Promise<boolean>;
    verifyBackup(backup: string, { id }: UserId): Promise<boolean>;
    recoverFunds(backup: string, { id }: UserId): Promise<boolean>;
    getBackups({ id }: UserId): Promise<string>;
    verifyMessage(message: string, signature: string, { id }: UserId): Promise<string>;
    signMessage(message: string, { id }: UserId): Promise<string>;
}

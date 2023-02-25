import { NodeService } from '../../node/node.service';
import { UserId } from '../../security/security.types';
import { Logger } from 'winston';
import { NetworkInfoInput } from './macaroon.types';
export declare class MacaroonResolver {
    private nodeService;
    private readonly logger;
    constructor(nodeService: NodeService, logger: Logger);
    createMacaroon(permissions: NetworkInfoInput, { id }: UserId): Promise<{
        base: string;
        hex: string;
    }>;
}

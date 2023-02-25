import { NodeService } from '../../node/node.service';
import { UserId } from '../../security/security.types';
export declare class EdgeResolver {
    private nodeService;
    constructor(nodeService: NodeService);
    getChannelReport({ id }: UserId): Promise<{
        totalPendingHtlc: number;
        outgoingPendingHtlc: number;
        incomingPendingHtlc: number;
        local: number;
        remote: number;
        maxIn: number;
        maxOut: number;
        commit: number;
    }>;
}

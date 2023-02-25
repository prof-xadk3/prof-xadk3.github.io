import { NodeService } from '../../node/node.service';
import { UserId } from '../../security/security.types';
export declare class NetworkResolver {
    private nodeService;
    constructor(nodeService: NodeService);
    getNetworkInfo({ id }: UserId): Promise<{
        averageChannelSize: number;
        channelCount: number;
        maxChannelSize: number;
        medianChannelSize: number;
        minChannelSize: number;
        nodeCount: number;
        notRecentlyUpdatedPolicyCount: number;
        totalCapacity: number;
    }>;
}

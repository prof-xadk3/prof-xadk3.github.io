import { NodeService } from '../../node/node.service';
import { UserId } from '../../security/security.types';
export declare class ForwardsResolver {
    private nodeService;
    constructor(nodeService: NodeService);
    getForwards(user: UserId, days: number): Promise<{
        created_at: string;
        fee: number;
        fee_mtokens: string;
        incoming_channel: string;
        mtokens: string;
        outgoing_channel: string;
        tokens: number;
    }[]>;
}

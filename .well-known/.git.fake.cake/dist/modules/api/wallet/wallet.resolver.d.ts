import { NodeService } from '../../node/node.service';
import { UserId } from '../../security/security.types';
export declare class WalletResolver {
    private nodeService;
    constructor(nodeService: NodeService);
    getWalletInfo({ id }: UserId): Promise<import("lightning").GetWalletVersionResult>;
}

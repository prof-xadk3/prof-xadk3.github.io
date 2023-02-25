import { NodeService } from '../../node/node.service';
import { Logger } from 'winston';
export declare class LnUrlService {
    private nodeService;
    private readonly logger;
    constructor(nodeService: NodeService, logger: Logger);
    lnAuthUrlGenerator(id: string, url: string): Promise<string>;
}

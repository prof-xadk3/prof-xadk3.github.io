import { Logger } from 'winston';
import { NodeService } from '../../node/node.service';
import { UserId } from '../../security/security.types';
export declare class ChatResolver {
    private nodeService;
    private readonly logger;
    constructor(nodeService: NodeService, logger: Logger);
    getMessages(user: UserId, initialize: boolean): Promise<{
        token: string;
        messages: {
            date: string;
            id: string;
            tokens: number;
            verified: boolean;
        }[];
    }>;
    sendMessage(user: UserId, publicKey: string, message: string, messageType: string, tokens: number, maxFee: number): Promise<number>;
}

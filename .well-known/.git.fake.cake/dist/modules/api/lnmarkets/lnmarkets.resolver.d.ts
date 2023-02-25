import { Logger } from '@nestjs/common';
import { ContextType } from 'src/server/app.module';
import { NodeService } from '../../node/node.service';
import { UserId } from '../../security/security.types';
import { LnMarketsService } from './lnmarkets.service';
import { ConfigService } from '@nestjs/config';
export declare class LnMarketsResolver {
    private configService;
    private nodeService;
    private lnmarketsService;
    private readonly logger;
    constructor(configService: ConfigService, nodeService: NodeService, lnmarketsService: LnMarketsService, logger: Logger);
    getLnMarketsUrl(user: UserId, { lnMarketsAuth }: ContextType): Promise<string>;
    getLnMarketsStatus({ lnMarketsAuth }: ContextType): Promise<"out" | "in">;
    getLnMarketsUserInfo({ lnMarketsAuth }: ContextType): Promise<any>;
    lnMarketsDeposit(user: UserId, { lnMarketsAuth }: ContextType, amount: number): Promise<boolean>;
    lnMarketsWithdraw(user: UserId, { lnMarketsAuth }: ContextType, amount: number): Promise<boolean>;
    lnMarketsLogin(user: UserId, { res }: ContextType): Promise<{
        message: string;
        status: string;
        reason: string;
        token: string;
    }>;
    lnMarketsLogout({ res }: ContextType): Promise<boolean>;
}

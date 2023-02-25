import { AccountsService } from '../../accounts/accounts.service';
import { UserId } from '../../security/security.types';
import { Logger } from 'winston';
import { WsService } from '../../ws/ws.service';
export declare class BosResolver {
    private wsService;
    private accountsService;
    private readonly logger;
    constructor(wsService: WsService, accountsService: AccountsService, logger: Logger);
    getAccountingReport(user: UserId, category?: string, currency?: string, fiat?: string, month?: string, year?: string): Promise<unknown>;
    bosRebalance(user: UserId, avoid?: string[], in_through?: string, max_fee?: number, max_fee_rate?: number, max_rebalance?: number, timeout_minutes?: number, node?: string, out_through?: string, out_inbound?: number): Promise<{
        increase: any;
        decrease: any;
        result: any;
    }>;
    reconnectToPeers(): Promise<void>;
}

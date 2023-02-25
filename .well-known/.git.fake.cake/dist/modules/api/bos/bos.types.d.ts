export type RebalanceResponseType = {
    rebalance: [any, any, any];
};
declare class BosIncrease {
    increased_inbound_on: string;
    liquidity_inbound: string;
    liquidity_inbound_opening: string;
    liquidity_inbound_pending: string;
    liquidity_outbound: string;
    liquidity_outbound_opening: string;
    liquidity_outbound_pending: string;
}
declare class BosDecrease {
    decreased_inbound_on: string;
    liquidity_inbound: string;
    liquidity_inbound_opening: string;
    liquidity_inbound_pending: string;
    liquidity_outbound: string;
    liquidity_outbound_opening: string;
    liquidity_outbound_pending: string;
}
declare class BosResult {
    rebalanced: string;
    rebalance_fees_spent: string;
}
export declare class BosRebalanceResult {
    increase: BosIncrease;
    decrease: BosDecrease;
    result: BosResult;
}
export {};

import { Node } from '../node/node.types';
export type ChannelFeesType = {
    id: string;
    publicKey: string;
    partnerBaseFee: number;
    partnerFeeRate: number;
    myBaseFee: number;
    myFeeRate: number;
};
export declare class ChannelHealth {
    id: string;
    score: number;
    volumeNormalized: string;
    averageVolumeNormalized: string;
    partner: Node;
}
export declare class ChannelsHealth {
    score: number;
    channels: ChannelHealth[];
}
export declare class ChannelTimeHealth {
    id: string;
    score: number;
    significant: boolean;
    monitoredTime: number;
    monitoredUptime: number;
    monitoredDowntime: number;
    partner: Node;
}
export declare class ChannelsTimeHealth {
    score: number;
    channels: ChannelTimeHealth[];
}
export declare class FeeHealth {
    score: number;
    rate: number;
    base: string;
    rateScore: number;
    baseScore: number;
    rateOver: boolean;
    baseOver: boolean;
}
export declare class ChannelFeeHealth {
    id: string;
    partnerSide: FeeHealth;
    mySide: FeeHealth;
    partner: Node;
}
export declare class ChannelsFeeHealth {
    score: number;
    channels: ChannelFeeHealth[];
}

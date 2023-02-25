import { GetForwardsResult } from 'lightning';
type Forward = GetForwardsResult['forwards'][0];
export declare const getChannelVolume: (forwards: Forward[]) => any[];
export declare const getChannelAge: (id: string, currentHeight: number) => number;
export declare const getChannelIdInfo: (id: string) => {
    blockHeight: number;
    transaction: number;
    output: number;
} | null;
export declare const getAverage: (array: number[]) => number;
export declare const getFeeScore: (max: number, current: number) => number;
export declare const getMyFeeScore: (max: number, current: number, min: number) => {
    over: boolean;
    score: number;
};
export {};

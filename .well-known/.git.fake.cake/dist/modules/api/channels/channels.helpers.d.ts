export declare const getChannelAge: (id: string, currentHeight: number) => number;
export declare const getChannelIdInfo: (id: string) => {
    blockHeight: number;
    transaction: number;
    output: number;
} | null;

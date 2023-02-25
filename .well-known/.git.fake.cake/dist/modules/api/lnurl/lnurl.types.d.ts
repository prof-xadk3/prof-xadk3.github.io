export declare class PayRequest {
    callback: string;
    maxSendable: string;
    minSendable: string;
    metadata: string;
    commentAllowed: number;
    tag: string;
}
export declare class AuthResponse {
    status: string;
    message: string;
}
export declare class WithdrawRequest {
    callback: string;
    k1: string;
    maxWithdrawable: string;
    defaultDescription: string;
    minWithdrawable: string;
    tag: string;
}
export declare class ChannelRequest {
    tag: string;
    k1: string;
    callback: string;
    uri: string;
}
export declare const LnUrlRequestUnion: PayRequest | WithdrawRequest | ChannelRequest;
export type LnUrlPayResponseType = {
    pr?: string;
    successAction?: {
        tag: string;
    };
    status?: string;
    reason?: string;
};
export declare class PaySuccess {
    tag: string;
    description: string;
    url: string;
    message: string;
    ciphertext: string;
    iv: string;
}

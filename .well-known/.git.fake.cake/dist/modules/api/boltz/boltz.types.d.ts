import { DecodeInvoice } from '../invoices/invoices.types';
export declare class BoltzInfoType {
    max: number;
    min: number;
    feePercent: number;
}
export declare class BoltzSwapTransaction {
    id: string;
    hex: string;
    eta: number;
}
export declare class BoltzSwapStatus {
    status: string;
    transaction: BoltzSwapTransaction;
}
export declare class BoltzSwap {
    id: string;
    boltz: BoltzSwapStatus;
}
export declare class CreateBoltzReverseSwapType {
    id: string;
    invoice: string;
    redeemScript: string;
    onchainAmount: number;
    timeoutBlockHeight: number;
    lockupAddress: string;
    minerFeeInvoice: string;
    decodedInvoice: DecodeInvoice;
    receivingAddress: string;
    preimage: string;
    preimageHash: string;
    privateKey: string;
    publicKey: string;
}

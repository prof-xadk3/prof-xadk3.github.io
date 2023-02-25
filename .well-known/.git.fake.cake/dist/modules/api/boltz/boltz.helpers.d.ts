/// <reference types="node" />
import { Network } from 'bitcoinjs-lib';
export declare const getHexBuffer: (input: string) => Buffer;
export declare const getHexString: (input?: Buffer) => string;
export declare const validateAddress: (btcAddress: string, network?: Network) => boolean;
export declare const generateKeys: (network?: Network) => {
    publicKey: string;
    privateKey: string;
};

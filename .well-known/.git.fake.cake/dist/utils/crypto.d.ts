/// <reference types="node" />
export declare const getPreimageAndHash: () => {
    preimage: Buffer;
    hash: string;
};
export declare const getSHA256Hash: (str: string | Buffer, encoding?: 'hex' | 'base64') => string;
export declare const decodeMacaroon: (macaroon: string, password: string) => string;
export declare const hashPassword: (password: string) => string;
export declare const isCorrectPassword: (password: string, correctPassword: string) => boolean;

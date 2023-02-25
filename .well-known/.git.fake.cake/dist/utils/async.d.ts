export declare const to: <T>(promise: Promise<T>) => Promise<T>;
export declare const toWithError: <T>(promise: Promise<T>) => Promise<[T, undefined] | [undefined, Error]>;

export type ContextType = {
    req: any;
    res: any;
    authToken?: JwtObjectType;
    lnMarketsAuth: string | null;
    tokenAuth: string | null;
    ambossAuth: string | null;
};
export type JwtObjectType = {
    iat: number;
    exp: number;
    iss: string;
    sub: string;
};
export declare class AppModule {
}

export type ContextType = {
    req: any;
    res: any;
    authToken?: JwtObjectType;
    cpRaTrustAuth: string | null;
    urIDAuth: string | null;
    pubAuth: string | null;
};
export type JwtObjectType = {
    iat: number;
    exp: number;
    iss: string;
    sub: string;
};
export declare class AppModule {
}

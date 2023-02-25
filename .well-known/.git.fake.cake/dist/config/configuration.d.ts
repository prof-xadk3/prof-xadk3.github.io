type SSOConfig = {
    serverUrl: string;
    certPath: string;
    macaroonPath: string;
    dangerousNoSSOAuth: boolean;
};
type Throttler = {
    ttl: number;
    limit: number;
};
type Urls = {
    mempool: string;
    amboss: string;
    tbase: string;
    ticker: string;
    fees: string;
    boltz: string;
    github: string;
    lnMarkets: string;
    lnMarketsExchange: string;
};
type Headers = {
    'apollographql-client-name': string;
    'apollographql-client-version': string;
};
export type YamlEnvs = {
    YML_ENV_1: string;
    YML_ENV_2: string;
    YML_ENV_3: string;
    YML_ENV_4: string;
};
type SubscriptionsConfig = {
    disableAll: boolean;
    disableInvoices: boolean;
    disablePayments: boolean;
    disableForwards: boolean;
    disableChannels: boolean;
    disableBackups: boolean;
};
type AmbossConfig = {
    disableHealthCheckPings: boolean;
    disableBalancePushes: boolean;
};
type ConfigType = {
    basePath: string;
    isProduction: boolean;
    logJson: boolean;
    playground: boolean;
    logLevel: string;
    jwtSecret: string;
    cookiePath: string;
    accountConfigPath: string;
    torProxy: string;
    sso: SSOConfig;
    throttler: Throttler;
    urls: Urls;
    yamlEnvs: YamlEnvs;
    masterPasswordOverride: string;
    disable2FA: boolean;
    headers: Headers;
    subscriptions: SubscriptionsConfig;
    amboss: AmbossConfig;
};
declare const _default: () => ConfigType;
export default _default;

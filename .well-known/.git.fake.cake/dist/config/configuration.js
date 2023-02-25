"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
exports.default = () => {
    const isProduction = process.env.NODE_ENV === 'production';
    const jwtSecret = isProduction
        ? crypto_1.default.randomBytes(64).toString('hex')
        : '123456789';
    console.log(`Getting ${isProduction ? 'production' : 'development'} env variables.`);
    const mempool = process.env.MEMPOOL_URL || 'https://mempool.space';
    const urls = {
        mempool,
        amboss: 'https://api.amboss.space/graphql',
        fees: `${mempool}/api/v1/fees/recommended`,
        tbase: 'https://api.thunderhub.io/api/graphql',
        ticker: 'https://blockchain.info/ticker',
        github: 'https://api.github.com/repos/apotdevin/thunderhub/releases/latest',
        lnMarkets: 'https://api.lnmarkets.com/v1',
        lnMarketsExchange: 'https://lnmarkets.com',
        boltz: 'https://boltz.exchange/api',
    };
    const npmVersion = process.env.npm_package_version || '0.0.0';
    const headers = {
        'apollographql-client-name': 'thunderhub',
        'apollographql-client-version': npmVersion,
    };
    const sso = {
        serverUrl: process.env.SSO_SERVER_URL || '',
        certPath: process.env.SSO_CERT_PATH || '',
        macaroonPath: process.env.SSO_MACAROON_PATH || '',
        dangerousNoSSOAuth: process.env.DANGEROUS_NO_SSO_AUTH === 'true',
    };
    const throttler = {
        ttl: Number(process.env.THROTTLE_TTL) || 10,
        limit: Number(process.env.THROTTLE_LIMIT) || 10,
    };
    const yamlEnvs = {
        YML_ENV_1: process.env.YML_ENV_1 || '',
        YML_ENV_2: process.env.YML_ENV_2 || '',
        YML_ENV_3: process.env.YML_ENV_3 || '',
        YML_ENV_4: process.env.YML_ENV_4 || '',
    };
    const subscriptions = {
        disableAll: process.env.DISABLE_ALL_SUBS === 'true',
        disableInvoices: process.env.DISABLE_INVOICE_SUB === 'true',
        disablePayments: process.env.DISABLE_PAYMENT_SUB === 'true',
        disableForwards: process.env.DISABLE_FORWARD_SUB === 'true',
        disableChannels: process.env.DISABLE_CHANNEL_SUB === 'true',
        disableBackups: process.env.DISABLE_BACKUP_SUB === 'true',
    };
    const amboss = {
        disableHealthCheckPings: process.env.DISABLE_HEALTHCHECK_PINGS === 'true',
        disableBalancePushes: process.env.DISABLE_BALANCE_PUSHES === 'true',
    };
    const config = {
        logJson: process.env.LOG_JSON === 'true',
        masterPasswordOverride: process.env.MASTER_PASSWORD_OVERRIDE || '',
        disable2FA: process.env.DISABLE_TWOFA === 'true',
        basePath: process.env.BASE_PATH || '',
        playground: !isProduction,
        logLevel: process.env.LOG_LEVEL,
        cookiePath: process.env.COOKIE_PATH || '',
        accountConfigPath: process.env.ACCOUNT_CONFIG_PATH || '',
        torProxy: process.env.TOR_PROXY_SERVER || '',
        isProduction,
        headers,
        throttler,
        sso,
        urls,
        jwtSecret,
        yamlEnvs,
        subscriptions,
        amboss,
    };
    if (!isProduction) {
        console.log(config);
    }
    return config;
};
//# sourceMappingURL=configuration.js.map
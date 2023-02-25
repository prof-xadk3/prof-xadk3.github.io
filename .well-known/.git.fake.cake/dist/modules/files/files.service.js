"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = exports.PRE_PASS_STRING = void 0;
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const fs_1 = __importDefault(require("fs"));
const crypto_1 = __importDefault(require("crypto"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const config_1 = require("@nestjs/config");
const js_yaml_1 = __importDefault(require("js-yaml"));
const crypto_2 = require("../../utils/crypto");
const env_1 = require("../../utils/env");
const isValidNetwork = (network) => network === 'mainnet' || network === 'regtest' || network === 'testnet';
exports.PRE_PASS_STRING = 'thunderhub-';
let FilesService = class FilesService {
    constructor(configService, logger) {
        this.configService = configService;
        this.logger = logger;
        this.saveHashedYaml = (config, filePath) => {
            if (filePath === '' || !config)
                return;
            this.logger.info('Saving new yaml file');
            try {
                const yamlString = js_yaml_1.default.dump(config);
                fs_1.default.writeFileSync(filePath, yamlString);
                this.logger.info('Succesfully saved');
            }
            catch (error) {
                this.logger.error('Error saving yaml file.');
            }
        };
    }
    readFile(filePath, encoding = 'hex') {
        if (!filePath)
            return null;
        const fileExists = fs_1.default.existsSync(filePath);
        if (!fileExists) {
            this.logger.error(`No file found at path: ${filePath}`);
            return null;
        }
        else {
            try {
                const file = fs_1.default.readFileSync(filePath, encoding);
                return file;
            }
            catch (error) {
                this.logger.error(`Something went wrong while reading the file at path ${filePath}:` +
                    error);
                return null;
            }
        }
    }
    parseYaml(filePath) {
        if (!filePath)
            return null;
        const fileExists = fs_1.default.existsSync(filePath);
        if (!fileExists) {
            try {
                const yamlString = js_yaml_1.default.dump({ backupsEnabled: false });
                fs_1.default.writeFileSync(filePath, yamlString);
                this.logger.info('Succesfully created yaml file.');
            }
            catch (error) {
                this.logger.error('Error creating yaml file.');
                return null;
            }
        }
        const yamlConfig = this.readFile(filePath, 'utf-8');
        if (!yamlConfig) {
            return null;
        }
        try {
            const yamlObject = js_yaml_1.default.load(yamlConfig);
            return yamlObject;
        }
        catch (error) {
            this.logger.error('Something went wrong while parsing the YAML config file: \n' + error);
            return null;
        }
    }
    updateTwofaSecret(filePath, index, secret) {
        if (filePath === '') {
            this.logger.verbose('No account config file path provided');
            throw new Error('Unable to save 2FA secret for account');
        }
        const accountConfig = this.parseYaml(filePath);
        if (!accountConfig) {
            this.logger.info(`No account config file found at path ${filePath}`);
            throw new Error('Unable to save 2FA secret for account');
        }
        const configCopy = Object.assign({}, accountConfig);
        configCopy.accounts[index].twofaSecret = secret;
        this.saveHashedYaml(configCopy, filePath);
    }
    hashPasswords(isHashed, config, filePath) {
        if (isHashed)
            return config;
        let hasChanged = false;
        const cloned = Object.assign({}, config);
        let hashedMasterPassword = config === null || config === void 0 ? void 0 : config.masterPassword;
        if (hashedMasterPassword &&
            hashedMasterPassword.indexOf(exports.PRE_PASS_STRING) < 0) {
            hasChanged = true;
            hashedMasterPassword = (0, crypto_2.hashPassword)(hashedMasterPassword);
        }
        cloned.masterPassword = hashedMasterPassword;
        const hashedAccounts = [];
        for (let i = 0; i < config.accounts.length; i++) {
            const account = config.accounts[i];
            if (account.password) {
                let hashedPassword = account.password;
                if (hashedPassword.indexOf(exports.PRE_PASS_STRING) < 0) {
                    hasChanged = true;
                    hashedPassword = (0, crypto_2.hashPassword)(account.password);
                }
                hashedAccounts.push(Object.assign(Object.assign({}, account), { password: hashedPassword }));
            }
            else {
                hashedAccounts.push(account);
            }
        }
        cloned.accounts = hashedAccounts;
        hasChanged && this.saveHashedYaml(cloned, filePath);
        return cloned;
    }
    getCertificate({ certificate, certificatePath, lndDir, }) {
        if (certificate) {
            return certificate;
        }
        if (certificatePath) {
            return this.readFile(certificatePath);
        }
        if (lndDir) {
            return this.readFile(path_1.default.join(lndDir, 'tls.cert'));
        }
        return null;
    }
    getMacaroon({ macaroon, macaroonPath, network, lndDir, encrypted }, defaultNetwork) {
        if (macaroon) {
            return macaroon;
        }
        if (macaroonPath) {
            return this.readFile(macaroonPath, encrypted ? 'utf-8' : 'hex');
        }
        if (!lndDir) {
            return null;
        }
        return this.readFile(path_1.default.join(lndDir, 'data', 'chain', 'bitcoin', network || defaultNetwork, 'admin.macaroon'));
    }
    getAccounts(filePath) {
        if (filePath === '') {
            this.logger.verbose('No account config file path provided');
            return [];
        }
        const accountConfig = this.parseYaml(filePath);
        if (!accountConfig) {
            this.logger.info(`No account config file found at path ${filePath}`);
            return [];
        }
        return this.getAccountsFromYaml(accountConfig, filePath);
    }
    getParsedAccount(account, index, masterPassword, defaultNetwork) {
        const yamlEnvs = this.configService.get('yamlEnvs');
        const resolvedAccount = (0, env_1.resolveEnvVarsInAccount)(account, yamlEnvs);
        const { name, serverUrl, network, lndDir, macaroonPath, macaroon: macaroonValue, password, encrypted, twofaSecret, } = resolvedAccount;
        const missingFields = [];
        if (!name)
            missingFields.push('name');
        if (!serverUrl)
            missingFields.push('server url');
        if (!lndDir && !macaroonPath && !macaroonValue) {
            missingFields.push('macaroon');
        }
        if (missingFields.length > 0) {
            const text = missingFields.join(', ');
            this.logger.error(`Account in index ${index} is missing the fields ${text}`);
            return null;
        }
        if (network && !isValidNetwork(network)) {
            this.logger.error(`Account ${name} has invalid network: ${network}`);
            return null;
        }
        if (!password && !masterPassword) {
            this.logger.error(`You must set a password for account ${name} or set a master password`);
            return null;
        }
        const cert = this.getCertificate(resolvedAccount);
        if (!cert) {
            this.logger.warn(`No certificate for account ${name}. Make sure you don't need it to connect.`);
        }
        const macaroon = this.getMacaroon(resolvedAccount, defaultNetwork);
        if (!macaroon) {
            this.logger.error(`Account ${name} has neither lnd directory, macaroon nor macaroon path specified.`);
            return null;
        }
        const hash = (0, crypto_2.getSHA256Hash)(JSON.stringify({ name, serverUrl, macaroon, cert, index }));
        const encryptedProps = encrypted
            ? { encrypted: true, encryptedMacaroon: macaroon }
            : { encrypted: false, encryptedMacaroon: '' };
        return Object.assign({ index, name: name || '', socket: serverUrl || '', hash,
            macaroon, cert: cert || '', password: password || masterPassword || '', twofaSecret: twofaSecret || '' }, encryptedProps);
    }
    getAccountsFromYaml(config, filePath) {
        const { hashed, accounts: preAccounts } = config;
        if (!preAccounts || preAccounts.length <= 0) {
            this.logger.warn(`Account config found at path ${filePath} but had no accounts`);
            return [];
        }
        const { defaultNetwork, masterPassword, accounts } = this.hashPasswords(hashed || false, config, filePath);
        const masterPasswordOverride = this.configService.get('masterPasswordOverride');
        const hashedOverride = masterPasswordOverride
            ? (0, crypto_2.hashPassword)(masterPasswordOverride)
            : '';
        const finalMasterPassword = hashedOverride || masterPassword;
        const network = isValidNetwork(defaultNetwork)
            ? defaultNetwork
            : 'mainnet';
        const parsedAccounts = accounts
            .map((account, index) => this.getParsedAccount(account, index, finalMasterPassword, network))
            .filter(Boolean);
        this.logger.info(`Server accounts that will be available: ${parsedAccounts
            .map(account => account === null || account === void 0 ? void 0 : account.name)
            .join(', ')}`);
        return parsedAccounts;
    }
    readMacaroons(macaroonPath) {
        if (macaroonPath === '') {
            this.logger.verbose('No macaroon path provided');
            return null;
        }
        const adminExists = fs_1.default.existsSync(`${macaroonPath}/admin.macaroon`);
        if (!adminExists) {
            this.logger.error(`No admin.macaroon file found at path: ${macaroonPath}/admin.macaroon`);
            return null;
        }
        else {
            try {
                const ssoAdmin = fs_1.default.readFileSync(`${macaroonPath}/admin.macaroon`, 'hex');
                return ssoAdmin;
            }
            catch (error) {
                this.logger.error('Something went wrong while reading the admin.macaroon: \n' + error);
                return null;
            }
        }
    }
    createDirectory(dirname) {
        const initDir = path_1.default.isAbsolute(dirname) ? path_1.default.sep : '';
        dirname.split(path_1.default.sep).reduce((parentDir, childDir) => {
            const curDir = path_1.default.resolve(parentDir, childDir);
            try {
                if (!fs_1.default.existsSync(curDir)) {
                    fs_1.default.mkdirSync(curDir);
                }
            }
            catch (error) {
                if (error.code !== 'EEXIST') {
                    if (error.code === 'ENOENT') {
                        throw new Error(`ENOENT: No such file or directory, mkdir '${dirname}'. Ensure that path separator is '${os_1.default.platform() === 'win32' ? '\\\\' : '/'}'`);
                    }
                    else {
                        throw error;
                    }
                }
            }
            return curDir;
        }, initDir);
    }
    readCookie() {
        const cookieFile = this.configService.get('cookiePath');
        if (cookieFile === '') {
            this.logger.verbose('No cookie path provided');
            return null;
        }
        const exists = fs_1.default.existsSync(cookieFile);
        if (exists) {
            try {
                this.logger.verbose(`Found cookie at path ${cookieFile}`);
                const cookie = fs_1.default.readFileSync(cookieFile, 'utf-8');
                return cookie;
            }
            catch (error) {
                this.logger.error('Something went wrong while reading cookie: \n' + error);
                throw new Error(error);
            }
        }
        else {
            try {
                const dirname = path_1.default.dirname(cookieFile);
                this.createDirectory(dirname);
                fs_1.default.writeFileSync(cookieFile, crypto_1.default.randomBytes(64).toString('hex'));
                this.logger.info(`Cookie created at directory: ${dirname}`);
                const cookie = fs_1.default.readFileSync(cookieFile, 'utf-8');
                return cookie;
            }
            catch (error) {
                this.logger.error('Something went wrong while reading the cookie: \n' + error);
                throw new Error(error);
            }
        }
    }
    refreshCookie() {
        const cookieFile = this.configService.get('cookiePath');
        if (cookieFile === '') {
            this.logger.verbose('No cookie path provided');
            return null;
        }
        try {
            this.logger.verbose('Refreshing cookie for next authentication');
            fs_1.default.writeFileSync(cookieFile, crypto_1.default.randomBytes(64).toString('hex'));
        }
        catch (error) {
            this.logger.error('Something went wrong while refreshing cookie: \n' + error);
            throw new Error(error);
        }
    }
};
FilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        winston_1.Logger])
], FilesService);
exports.FilesService = FilesService;
//# sourceMappingURL=files.service.js.map
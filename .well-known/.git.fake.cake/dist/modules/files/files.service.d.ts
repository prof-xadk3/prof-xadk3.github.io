import { Logger } from 'winston';
import { ConfigService } from '@nestjs/config';
import { AccountConfigType, AccountType, BitcoinNetwork, EncodingType, ParsedAccount, UnresolvedAccountType } from './files.types';
export declare const PRE_PASS_STRING = "thunderhub-";
export declare class FilesService {
    private configService;
    private readonly logger;
    constructor(configService: ConfigService, logger: Logger);
    readFile(filePath: string, encoding?: EncodingType): string | null;
    parseYaml(filePath: string): AccountConfigType | null;
    saveHashedYaml: (config: AccountConfigType, filePath: string) => void;
    updateTwofaSecret(filePath: string, index: number, secret: string): void;
    hashPasswords(isHashed: boolean, config: AccountConfigType, filePath: string): AccountConfigType;
    getCertificate({ certificate, certificatePath, lndDir, }: AccountType): string | null;
    getMacaroon({ macaroon, macaroonPath, network, lndDir, encrypted }: AccountType, defaultNetwork: BitcoinNetwork): string | null;
    getAccounts(filePath: string): ParsedAccount[];
    getParsedAccount(account: UnresolvedAccountType, index: number, masterPassword: string | null, defaultNetwork: BitcoinNetwork): ParsedAccount | null;
    getAccountsFromYaml(config: AccountConfigType, filePath: string): ParsedAccount[];
    readMacaroons(macaroonPath: string): string | null;
    createDirectory(dirname: string): void;
    readCookie(): string | null;
    refreshCookie(): any;
}

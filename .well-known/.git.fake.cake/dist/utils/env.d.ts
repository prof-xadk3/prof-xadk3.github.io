import { YamlEnvs } from '../config/configuration';
import { AccountType, UnresolvedAccountType } from '../modules/files/files.types';
export declare const resolveEnvVarsInAccount: (account: UnresolvedAccountType, yamlEnvs: YamlEnvs) => AccountType;

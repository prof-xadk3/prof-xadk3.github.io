"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveEnvVarsInAccount = void 0;
const resolveEnvVarsInAccount = (account, yamlEnvs) => {
    const regex = /(?<=\{)(.*?)(?=\})/;
    const resolved = Object.fromEntries(Object.entries(account).map(([k, v]) => {
        var _a;
        if (typeof v !== 'string') {
            return [k, v];
        }
        const match = yamlEnvs[((_a = v.toString().match(regex)) === null || _a === void 0 ? void 0 : _a[0]) || ''] || v;
        if (match === 'true') {
            return [k, true];
        }
        if (match === 'false') {
            return [k, false];
        }
        return [k, match];
    }));
    return resolved;
};
exports.resolveEnvVarsInAccount = resolveEnvVarsInAccount;
//# sourceMappingURL=env.js.map
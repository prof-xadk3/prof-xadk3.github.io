"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCorrectPassword = exports.hashPassword = exports.decodeMacaroon = exports.getSHA256Hash = exports.getPreimageAndHash = void 0;
const crypto_1 = require("crypto");
const aes_1 = __importDefault(require("crypto-js/aes"));
const enc_utf8_1 = __importDefault(require("crypto-js/enc-utf8"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const files_service_1 = require("../modules/files/files.service");
const getPreimageAndHash = () => {
    const preimage = (0, crypto_1.randomBytes)(32);
    const preimageHash = (0, exports.getSHA256Hash)(preimage);
    return { preimage, hash: preimageHash };
};
exports.getPreimageAndHash = getPreimageAndHash;
const getSHA256Hash = (str, encoding = 'hex') => (0, crypto_1.createHash)('sha256').update(str).digest().toString(encoding);
exports.getSHA256Hash = getSHA256Hash;
const decodeMacaroon = (macaroon, password) => {
    try {
        return aes_1.default.decrypt(macaroon, password).toString(enc_utf8_1.default);
    }
    catch (error) {
        console.log(`Error decoding macaroon with password: ${password}`);
        throw new Error('WrongPasswordForLogin');
    }
};
exports.decodeMacaroon = decodeMacaroon;
const hashPassword = (password) => `${files_service_1.PRE_PASS_STRING}${bcryptjs_1.default.hashSync(password, 12)}`;
exports.hashPassword = hashPassword;
const isCorrectPassword = (password, correctPassword) => {
    const cleanPassword = correctPassword.replace(files_service_1.PRE_PASS_STRING, '');
    return bcryptjs_1.default.compareSync(password, cleanPassword);
};
exports.isCorrectPassword = isCorrectPassword;
//# sourceMappingURL=crypto.js.map
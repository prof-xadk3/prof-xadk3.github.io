"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateKeys = exports.validateAddress = exports.getHexString = exports.getHexBuffer = void 0;
const bitcoinjs_lib_1 = require("bitcoinjs-lib");
const ecpair_1 = require("ecpair");
const ecc = __importStar(require("tiny-secp256k1"));
const ECPair = (0, ecpair_1.ECPairFactory)(ecc);
const getHexBuffer = (input) => {
    return Buffer.from(input, 'hex');
};
exports.getHexBuffer = getHexBuffer;
const getHexString = (input) => {
    if (!input)
        return '';
    return input.toString('hex');
};
exports.getHexString = getHexString;
const validateAddress = (btcAddress, network = bitcoinjs_lib_1.networks.bitcoin) => {
    try {
        bitcoinjs_lib_1.address.toOutputScript(btcAddress, network);
        return true;
    }
    catch (e) {
        return false;
    }
};
exports.validateAddress = validateAddress;
const generateKeys = (network = bitcoinjs_lib_1.networks.bitcoin) => {
    const keys = ECPair.makeRandom({ network });
    return {
        publicKey: (0, exports.getHexString)(keys.publicKey),
        privateKey: (0, exports.getHexString)(keys.privateKey),
    };
};
exports.generateKeys = generateKeys;
//# sourceMappingURL=boltz.helpers.js.map
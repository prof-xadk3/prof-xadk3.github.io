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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.LnUrlService = void 0;
const common_1 = require("@nestjs/common");
const node_service_1 = require("../../node/node.service");
const common_2 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const crypto_js_1 = require("crypto-js");
const hmac_sha256_1 = __importDefault(require("crypto-js/hmac-sha256"));
const bip39_1 = require("bip39");
const bip32_1 = __importDefault(require("bip32"));
const secp256k1_1 = __importDefault(require("secp256k1"));
const ecc = __importStar(require("tiny-secp256k1"));
const bip32 = (0, bip32_1.default)(ecc);
const fromHexString = (hexString) => {
    var _a;
    return new Uint8Array(((_a = hexString.match(/.{1,2}/g)) === null || _a === void 0 ? void 0 : _a.map(byte => parseInt(byte, 16))) || []);
};
const toHexString = (bytes) => bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
let LnUrlService = class LnUrlService {
    constructor(nodeService, logger) {
        this.nodeService = nodeService;
        this.logger = logger;
    }
    async lnAuthUrlGenerator(id, url) {
        var _a, _b;
        const domainUrl = new URL(url);
        const host = domainUrl.host;
        const k1 = domainUrl.searchParams.get('k1');
        if (!host || !k1) {
            this.logger.error('Missing host or k1 in url', { url });
            throw new Error('WrongUrlFormat');
        }
        const wallet = await this.nodeService.getWalletInfo(id);
        const secret = await this.nodeService.diffieHellmanComputeSecret(id, {
            key_family: 138,
            key_index: 0,
            partner_public_key: wallet === null || wallet === void 0 ? void 0 : wallet.public_key,
        });
        const hashed = (0, hmac_sha256_1.default)(host, secret.secret).toString(crypto_js_1.enc.Hex);
        const indexes = ((_a = hashed.match(/.{1,4}/g)) === null || _a === void 0 ? void 0 : _a.map(index => parseInt(index, 16))) || [];
        const secretKey = (0, bip39_1.entropyToMnemonic)(hashed);
        const base58 = (0, bip39_1.mnemonicToSeedSync)(secretKey);
        const node = bip32.fromSeed(base58);
        const derived = node.derivePath(`m/138/${indexes[0]}/${indexes[1]}/${indexes[2]}/${indexes[3]}`);
        const privateKey = (_b = derived.privateKey) === null || _b === void 0 ? void 0 : _b.toString('hex');
        const linkingKey = derived.publicKey.toString('hex');
        if (!privateKey || !linkingKey) {
            this.logger.error('Error deriving private or public key', { url });
            throw new Error('ErrorDerivingPrivateKey');
        }
        const sigObj = secp256k1_1.default.ecdsaSign(fromHexString(k1), fromHexString(privateKey));
        const signature = secp256k1_1.default.signatureExport(sigObj.signature);
        const encodedSignature = toHexString(signature);
        return `${url}&sig=${encodedSignature}&key=${linkingKey}`;
    }
};
LnUrlService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_2.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [node_service_1.NodeService,
        winston_1.Logger])
], LnUrlService);
exports.LnUrlService = LnUrlService;
//# sourceMappingURL=lnurl.service.js.map
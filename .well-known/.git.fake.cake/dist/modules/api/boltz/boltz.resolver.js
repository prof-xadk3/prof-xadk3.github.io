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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoltzResolver = exports.CreateBoltzReverseSwapTypeResolver = exports.BoltzSwapResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const node_service_1 = require("../../node/node.service");
const boltz_service_1 = require("./boltz.service");
const boltz_core_1 = require("boltz-core");
const boltz_helpers_1 = require("./boltz.helpers");
const graphql_2 = require("graphql");
const bitcoinjs_lib_1 = require("bitcoinjs-lib");
const boltz_types_1 = require("./boltz.types");
const crypto_1 = require("../../../utils/crypto");
const security_decorators_1 = require("../../security/security.decorators");
const security_types_1 = require("../../security/security.types");
const async_1 = require("../../../utils/async");
const ecpair_1 = require("ecpair");
const ecc = __importStar(require("tiny-secp256k1"));
const ECPair = (0, ecpair_1.ECPairFactory)(ecc);
let BoltzSwapResolver = class BoltzSwapResolver {
    constructor(boltzService, logger) {
        this.boltzService = boltzService;
        this.logger = logger;
    }
    async id(parent) {
        return parent;
    }
    async boltz(parent) {
        const [info, error] = await (0, async_1.toWithError)(this.boltzService.getSwapStatus(parent));
        if (error || (info === null || info === void 0 ? void 0 : info.error)) {
            this.logger.error(`Error getting status for swap with id: ${parent}`, {
                error: error || info.error,
            });
            return null;
        }
        if (!(info === null || info === void 0 ? void 0 : info.status)) {
            this.logger.debug(`No status in Boltz response for swap with id: ${parent}`, { info });
            return null;
        }
        return info;
    }
};
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BoltzSwapResolver.prototype, "id", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BoltzSwapResolver.prototype, "boltz", null);
BoltzSwapResolver = __decorate([
    (0, graphql_1.Resolver)(boltz_types_1.BoltzSwap),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [boltz_service_1.BoltzService,
        winston_1.Logger])
], BoltzSwapResolver);
exports.BoltzSwapResolver = BoltzSwapResolver;
let CreateBoltzReverseSwapTypeResolver = class CreateBoltzReverseSwapTypeResolver {
    constructor(nodeService) {
        this.nodeService = nodeService;
    }
    async decodedInvoice(user, parent) {
        const decoded = await this.nodeService.decodePaymentRequest(user.id, parent.invoice);
        return Object.assign(Object.assign({}, decoded), { destination_node: { publicKey: decoded.destination } });
    }
};
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId,
        boltz_types_1.CreateBoltzReverseSwapType]),
    __metadata("design:returntype", Promise)
], CreateBoltzReverseSwapTypeResolver.prototype, "decodedInvoice", null);
CreateBoltzReverseSwapTypeResolver = __decorate([
    (0, graphql_1.Resolver)(boltz_types_1.CreateBoltzReverseSwapType),
    __metadata("design:paramtypes", [node_service_1.NodeService])
], CreateBoltzReverseSwapTypeResolver);
exports.CreateBoltzReverseSwapTypeResolver = CreateBoltzReverseSwapTypeResolver;
let BoltzResolver = class BoltzResolver {
    constructor(nodeService, boltzService, logger) {
        this.nodeService = nodeService;
        this.boltzService = boltzService;
        this.logger = logger;
    }
    async getBoltzInfo() {
        var _a, _b, _c, _d;
        const info = await this.boltzService.getPairs();
        if (info === null || info === void 0 ? void 0 : info.error) {
            this.logger.error('Error getting swap information from Boltz', {
                error: info.error,
            });
            throw new Error(info.error);
        }
        const btcPair = (_a = info === null || info === void 0 ? void 0 : info.pairs) === null || _a === void 0 ? void 0 : _a['BTC/BTC'];
        if (!btcPair) {
            this.logger.error('No BTC > LN BTC information received from Boltz');
            throw new Error('MissingBtcRatesFromBoltz');
        }
        const max = ((_b = btcPair.limits) === null || _b === void 0 ? void 0 : _b.maximal) || 0;
        const min = ((_c = btcPair.limits) === null || _c === void 0 ? void 0 : _c.minimal) || 0;
        const feePercent = ((_d = btcPair.fees) === null || _d === void 0 ? void 0 : _d.percentage) || 0;
        return { max, min, feePercent };
    }
    async getBoltzSwapStatus(ids) {
        return ids;
    }
    async claimBoltzTransaction(redeem, transaction, preimage, privateKey, destination, fee) {
        if (!(0, boltz_helpers_1.validateAddress)(destination)) {
            this.logger.error(`Invalid bitcoin address: ${destination}`);
            throw new graphql_2.GraphQLError('InvalidBitcoinAddress');
        }
        const redeemScript = (0, boltz_helpers_1.getHexBuffer)(redeem);
        const lockupTransaction = bitcoinjs_lib_1.Transaction.fromHex(transaction);
        const info = (0, boltz_core_1.detectSwap)(redeemScript, lockupTransaction);
        if ((info === null || info === void 0 ? void 0 : info.vout) === undefined || (info === null || info === void 0 ? void 0 : info.type) === undefined) {
            this.logger.error('Cannot get vout or type from Boltz');
            this.logger.debug('Swap info', {
                redeemScript,
                lockupTransaction,
                info,
            });
            throw new Error('ErrorCreatingClaimTransaction');
        }
        const utxos = [
            Object.assign(Object.assign({}, info), { redeemScript, txHash: lockupTransaction.getHash(), preimage: (0, boltz_helpers_1.getHexBuffer)(preimage), keys: ECPair.fromPrivateKey((0, boltz_helpers_1.getHexBuffer)(privateKey)) }),
        ];
        const destinationScript = bitcoinjs_lib_1.address.toOutputScript(destination, bitcoinjs_lib_1.networks.bitcoin);
        const finalTransaction = (0, boltz_core_1.constructClaimTransaction)(utxos, destinationScript, fee);
        this.logger.debug('Final transaction', { finalTransaction });
        const response = await this.boltzService.broadcastTransaction(finalTransaction.toHex());
        this.logger.debug('Response from Boltz', { response });
        if (!(response === null || response === void 0 ? void 0 : response.transactionId)) {
            this.logger.error('Did not receive a transaction id from Boltz');
            throw new Error('NoTransactionIdFromBoltz');
        }
        return response.transactionId;
    }
    async createBoltzReverseSwap(user, amount, address) {
        if (address && !(0, boltz_helpers_1.validateAddress)(address)) {
            this.logger.error(`Invalid bitcoin address: ${address}`);
            throw new graphql_2.GraphQLError('InvalidBitcoinAddress');
        }
        const { preimage, hash } = (0, crypto_1.getPreimageAndHash)();
        const { privateKey, publicKey } = (0, boltz_helpers_1.generateKeys)();
        let btcAddress = address;
        if (!btcAddress) {
            const info = await this.nodeService.createChainAddress(user.id);
            if (!(info === null || info === void 0 ? void 0 : info.address)) {
                this.logger.error('Error creating onchain address for swap');
                throw new Error('ErrorCreatingOnChainAddress');
            }
            btcAddress = info.address;
        }
        this.logger.debug('Creating swap with these params', {
            amount,
            hash,
            publicKey,
        });
        const info = await this.boltzService.createReverseSwap(amount, hash, publicKey);
        if (info === null || info === void 0 ? void 0 : info.error) {
            this.logger.error('Error creating reverse swap with Boltz', info.error);
            throw new Error(info.error);
        }
        const finalInfo = Object.assign(Object.assign({}, info), { receivingAddress: btcAddress, preimage: preimage.toString('hex'), preimageHash: hash, privateKey,
            publicKey });
        this.logger.debug('Swap info', { finalInfo });
        return finalInfo;
    }
};
__decorate([
    (0, graphql_1.Query)(() => boltz_types_1.BoltzInfoType),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BoltzResolver.prototype, "getBoltzInfo", null);
__decorate([
    (0, graphql_1.Query)(() => [boltz_types_1.BoltzSwap]),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [String] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], BoltzResolver.prototype, "getBoltzSwapStatus", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('redeem')),
    __param(1, (0, graphql_1.Args)('transaction')),
    __param(2, (0, graphql_1.Args)('preimage')),
    __param(3, (0, graphql_1.Args)('privateKey')),
    __param(4, (0, graphql_1.Args)('destination')),
    __param(5, (0, graphql_1.Args)('fee')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, Number]),
    __metadata("design:returntype", Promise)
], BoltzResolver.prototype, "claimBoltzTransaction", null);
__decorate([
    (0, graphql_1.Mutation)(() => boltz_types_1.CreateBoltzReverseSwapType),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('amount')),
    __param(2, (0, graphql_1.Args)('address', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId, Number, String]),
    __metadata("design:returntype", Promise)
], BoltzResolver.prototype, "createBoltzReverseSwap", null);
BoltzResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __param(2, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [node_service_1.NodeService,
        boltz_service_1.BoltzService,
        winston_1.Logger])
], BoltzResolver);
exports.BoltzResolver = BoltzResolver;
//# sourceMappingURL=boltz.resolver.js.map
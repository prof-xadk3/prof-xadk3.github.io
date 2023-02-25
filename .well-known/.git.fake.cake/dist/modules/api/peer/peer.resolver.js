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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeerResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const node_service_1 = require("../../node/node.service");
const security_decorators_1 = require("../../security/security.decorators");
const security_types_1 = require("../../security/security.types");
const peer_types_1 = require("./peer.types");
let PeerResolver = class PeerResolver {
    constructor(nodeService, logger) {
        this.nodeService = nodeService;
        this.logger = logger;
    }
    async getPeers({ id }) {
        const { peers } = await this.nodeService.getPeers(id);
        return peers.map(peer => (Object.assign(Object.assign({}, peer), { partner_node_info: { publicKey: peer.public_key } })));
    }
    async addPeer(url, publicKey, socket, isTemporary, { id }) {
        if (!url && !publicKey && !socket) {
            this.logger.error('Expected public key and socket to connect');
            throw new Error('ExpectedPublicKeyAndSocketToConnect');
        }
        let peerSocket = socket || '';
        let peerPublicKey = publicKey || '';
        if (url) {
            const parts = url.split('@');
            if (parts.length !== 2) {
                this.logger.error(`Wrong url format to connect (${url})`);
                throw new Error('WrongUrlFormatToConnect');
            }
            peerPublicKey = parts[0];
            peerSocket = parts[1];
        }
        await this.nodeService.addPeer(id, peerPublicKey, peerSocket, isTemporary);
        return true;
    }
    async removePeer(publicKey, { id }) {
        await this.nodeService.removePeer(id, publicKey);
        return true;
    }
};
__decorate([
    (0, graphql_1.Query)(() => [peer_types_1.Peer]),
    __param(0, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], PeerResolver.prototype, "getPeers", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('url', { nullable: true })),
    __param(1, (0, graphql_1.Args)('publicKey', { nullable: true })),
    __param(2, (0, graphql_1.Args)('socket', { nullable: true })),
    __param(3, (0, graphql_1.Args)('isTemporary', { nullable: true })),
    __param(4, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Boolean, security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], PeerResolver.prototype, "addPeer", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('publicKey', { nullable: true })),
    __param(1, (0, security_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, security_types_1.UserId]),
    __metadata("design:returntype", Promise)
], PeerResolver.prototype, "removePeer", null);
PeerResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [node_service_1.NodeService,
        winston_1.Logger])
], PeerResolver);
exports.PeerResolver = PeerResolver;
//# sourceMappingURL=peer.resolver.js.map
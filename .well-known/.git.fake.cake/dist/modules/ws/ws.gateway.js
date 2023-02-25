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
exports.WsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const ws_service_1 = require("./ws.service");
const cookie_1 = require("cookie");
const appConstants_1 = require("../../utils/appConstants");
const auth_service_1 = require("../auth/auth.service");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const config_1 = require("@nestjs/config");
config_1.ConfigModule.forRoot({
    envFilePath: ['.env.local', '.env'],
});
let WsGateway = class WsGateway {
    constructor(socketService, authService, logger) {
        this.socketService = socketService;
        this.authService = authService;
        this.logger = logger;
    }
    async getUserFromSocket(socket) {
        const cookie = (0, cookie_1.parse)(socket.handshake.headers.cookie);
        const authToken = cookie[appConstants_1.appConstants.cookieName] || '';
        if (!authToken)
            return null;
        const user = await this.authService.getUserFromAuthToken(authToken);
        if (!user)
            return null;
        return user;
    }
    afterInit(server) {
        this.logger.info('WS server created');
        this.socketService.init(server);
    }
    async handleDisconnect(client) {
        const user = await this.getUserFromSocket(client);
        client.leave(user);
        this.logger.info(`Client disconnected: ${client.id}`);
    }
    async handleConnection(client) {
        const user = await this.getUserFromSocket(client);
        if (!user) {
            client.disconnect();
        }
        else {
            client.join(user);
            this.logger.info(`Client connected: ${client.id}`);
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WsGateway.prototype, "server", void 0);
WsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ path: `${process.env.BASE_PATH || ''}/socket.io` }),
    __param(2, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [ws_service_1.WsService,
        auth_service_1.AuthenticationService,
        winston_1.Logger])
], WsGateway);
exports.WsGateway = WsGateway;
//# sourceMappingURL=ws.gateway.js.map
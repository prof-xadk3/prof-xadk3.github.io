import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsService } from './ws.service';
import { AuthenticationService } from '../auth/auth.service';
import { Logger } from 'winston';
export declare class WsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private socketService;
    private authService;
    private readonly logger;
    constructor(socketService: WsService, authService: AuthenticationService, logger: Logger);
    server: Server;
    getUserFromSocket(socket: Socket): Promise<any>;
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): Promise<void>;
    handleConnection(client: Socket): Promise<void>;
}

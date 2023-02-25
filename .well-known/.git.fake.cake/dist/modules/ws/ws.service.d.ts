import { Server } from 'socket.io';
export declare class WsService {
    private socket;
    init(socket: Server): void;
    emit(account: string, event: string, payload: any): void;
}

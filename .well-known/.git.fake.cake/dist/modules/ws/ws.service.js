"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsService = void 0;
const common_1 = require("@nestjs/common");
let WsService = class WsService {
    constructor() {
        this.socket = null;
    }
    init(socket) {
        this.socket = socket;
    }
    emit(account, event, payload) {
        if (!this.socket || !account || !event || !payload)
            return;
        this.socket.in(account).emit(event, payload);
    }
};
WsService = __decorate([
    (0, common_1.Injectable)()
], WsService);
exports.WsService = WsService;
//# sourceMappingURL=ws.service.js.map
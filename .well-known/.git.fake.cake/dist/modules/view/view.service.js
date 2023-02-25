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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewService = void 0;
const common_1 = require("@nestjs/common");
const next_1 = __importDefault(require("next"));
const config_1 = require("@nestjs/config");
let ViewService = class ViewService {
    constructor(configService) {
        this.configService = configService;
    }
    async onModuleInit() {
        try {
            this.server = (0, next_1.default)({
                dev: !this.configService.get('isProduction'),
                dir: './src/client',
            });
            await this.server.prepare();
        }
        catch (error) {
            console.error(error);
        }
    }
    handler(req, res) {
        return this.server.getRequestHandler()(req, res);
    }
};
ViewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ViewService);
exports.ViewService = ViewService;
//# sourceMappingURL=view.service.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const graphql_1 = require("@nestjs/graphql");
const view_module_1 = require("./modules/view/view.module");
const nest_winston_1 = require("nest-winston");
const security_module_1 = require("./modules/security/security.module");
const files_module_1 = require("./modules/files/files.module");
const accounts_module_1 = require("./modules/accounts/accounts.module");
const node_module_1 = require("./modules/node/node.module");
const api_module_1 = require("./modules/api/api.module");
const request_1 = require("./utils/request");
const fetch_module_1 = require("./modules/fetch/fetch.module");
const appConstants_1 = require("./utils/appConstants");
const winston_1 = require("winston");
const configuration_1 = __importDefault(require("./config/configuration"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie_1 = __importDefault(require("cookie"));
const ws_module_1 = require("./modules/ws/ws.module");
const sub_module_1 = require("./modules/sub/sub.module");
const apollo_1 = require("@nestjs/apollo");
const schedule_1 = require("@nestjs/schedule");
const { combine, timestamp, prettyPrint, json } = winston_1.format;
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            security_module_1.AuthenticationModule,
            sub_module_1.SubModule,
            ws_module_1.WsModule,
            api_module_1.ApiModule,
            node_module_1.NodeModule,
            security_module_1.AuthenticationModule,
            files_module_1.FilesModule,
            accounts_module_1.AccountsModule,
            fetch_module_1.FetchModule,
            schedule_1.ScheduleModule.forRoot(),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
                envFilePath: ['.env.local', '.env'],
            }),
            graphql_1.GraphQLModule.forRootAsync({
                driver: apollo_1.ApolloDriver,
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    autoSchemaFile: config.get('isProduction') ? true : 'schema.gql',
                    sortSchema: true,
                    playground: config.get('playground'),
                    introspection: config.get('playground'),
                    cors: {
                        origin: true,
                        credentials: true,
                    },
                    path: `${config.get('basePath')}/graphql`,
                    context: ({ req, res }) => {
                        var _a;
                        const cookies = cookie_1.default.parse((_a = req.headers.cookie) !== null && _a !== void 0 ? _a : '') || {};
                        const token = (0, request_1.getAuthToken)(req);
                        const lnMarketsAuth = cookies[appConstants_1.appConstants.lnMarketsAuth];
                        const tokenAuth = cookies[appConstants_1.appConstants.tokenCookieName];
                        const ambossAuth = cookies[appConstants_1.appConstants.ambossCookieName];
                        const context = {
                            req,
                            res,
                            lnMarketsAuth,
                            tokenAuth,
                            ambossAuth,
                        };
                        if (!token)
                            return context;
                        const secret = config.get('jwtSecret');
                        try {
                            const authToken = jsonwebtoken_1.default.verify(token, secret);
                            return Object.assign(Object.assign({}, context), { authToken });
                        }
                        catch (error) {
                            return context;
                        }
                    },
                }),
            }),
            nest_winston_1.WinstonModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    level: config.get('logLevel'),
                    transports: [new winston_1.transports.Console()],
                    format: config.get('logJson')
                        ? combine(timestamp(), json())
                        : combine(timestamp(), prettyPrint()),
                }),
            }),
            view_module_1.ViewModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
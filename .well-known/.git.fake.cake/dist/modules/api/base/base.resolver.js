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
exports.BaseResolver = void 0;
const config_1 = require("@nestjs/config");
const graphql_1 = require("@nestjs/graphql");
const graphql_tag_1 = require("graphql-tag");
const fetch_service_1 = require("../../fetch/fetch.service");
const base_types_1 = require("./base.types");
const getBaseCanConnectQuery = (0, graphql_tag_1.gql) `
  {
    hello
  }
`;
const getBaseNodesQuery = (0, graphql_tag_1.gql) `
  {
    getNodes {
      _id
      name
      public_key
      socket
    }
  }
`;
const getBasePointsQuery = (0, graphql_tag_1.gql) `
  {
    getPoints {
      alias
      amount
    }
  }
`;
const createBaseInvoiceQuery = (0, graphql_tag_1.gql) `
  mutation CreateInvoice($amount: Int!) {
    createInvoice(amount: $amount) {
      request
      id
    }
  }
`;
const createThunderPointsQuery = (0, graphql_tag_1.gql) `
  mutation CreatePoints(
    $id: String!
    $alias: String!
    $uris: [String!]!
    $public_key: String!
  ) {
    createPoints(id: $id, alias: $alias, uris: $uris, public_key: $public_key)
  }
`;
let BaseResolver = class BaseResolver {
    constructor(configService, fetchService) {
        this.configService = configService;
        this.fetchService = fetchService;
    }
    async getBaseCanConnect() {
        const { data, error } = await this.fetchService.graphqlFetchWithProxy(this.configService.get('urls.tbase'), getBaseCanConnectQuery);
        if (error || !(data === null || data === void 0 ? void 0 : data.hello))
            return false;
        return true;
    }
    async getBaseNodes() {
        const { data, error } = await this.fetchService.graphqlFetchWithProxy(this.configService.get('urls.tbase'), getBaseNodesQuery);
        if (error || !(data === null || data === void 0 ? void 0 : data.getNodes))
            return [];
        return data.getNodes.filter((n) => n.public_key && n.socket);
    }
    async getBasePoints() {
        const { data, error } = await this.fetchService.graphqlFetchWithProxy(this.configService.get('urls.tbase'), getBasePointsQuery);
        if (error || !(data === null || data === void 0 ? void 0 : data.getPoints))
            return [];
        return data.getPoints;
    }
    async createBaseInvoice(amount) {
        if (!amount)
            return '';
        const { data, error } = await this.fetchService.graphqlFetchWithProxy(this.configService.get('urls.tbase'), createBaseInvoiceQuery, { amount });
        if (error)
            return null;
        if (data === null || data === void 0 ? void 0 : data.createInvoice)
            return data.createInvoice;
        return null;
    }
    async createThunderPoints(id, alias, uris, public_key) {
        const { data, error } = await this.fetchService.graphqlFetchWithProxy(this.configService.get('urls.tbase'), createThunderPointsQuery, { id, alias, uris, public_key });
        if (error || !(data === null || data === void 0 ? void 0 : data.createPoints))
            return false;
        return true;
    }
};
__decorate([
    (0, graphql_1.Query)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseResolver.prototype, "getBaseCanConnect", null);
__decorate([
    (0, graphql_1.Query)(() => [base_types_1.BaseNode]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseResolver.prototype, "getBaseNodes", null);
__decorate([
    (0, graphql_1.Query)(() => [base_types_1.BasePoints]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseResolver.prototype, "getBasePoints", null);
__decorate([
    (0, graphql_1.Mutation)(() => base_types_1.BaseInvoice),
    __param(0, (0, graphql_1.Args)('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BaseResolver.prototype, "createBaseInvoice", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('alias')),
    __param(2, (0, graphql_1.Args)('uris', { type: () => [String] })),
    __param(3, (0, graphql_1.Args)('public_key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Array, String]),
    __metadata("design:returntype", Promise)
], BaseResolver.prototype, "createThunderPoints", null);
BaseResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        fetch_service_1.FetchService])
], BaseResolver);
exports.BaseResolver = BaseResolver;
//# sourceMappingURL=base.resolver.js.map
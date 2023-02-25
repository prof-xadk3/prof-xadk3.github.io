"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiModule = void 0;
const common_1 = require("@nestjs/common");
const node_module_1 = require("./node/node.module");
const account_module_1 = require("./account/account.module");
const amboss_module_1 = require("./amboss/amboss.module");
const auth_module_1 = require("./auth/auth.module");
const base_module_1 = require("./base/base.module");
const bitcoin_module_1 = require("./bitcoin/bitcoin.module");
const main_module_1 = require("./main/main.module");
const github_module_1 = require("./github/github.module");
const wallet_module_1 = require("./wallet/wallet.module");
const tools_module_1 = require("./tools/tools.module");
const macaroon_module_1 = require("./macaroon/macaroon.module");
const network_module_1 = require("./network/network.module");
const peer_module_1 = require("./peer/peer.module");
const chain_module_1 = require("./chain/chain.module");
const edge_module_1 = require("./edge/edge.module");
const lnurl_module_1 = require("./lnurl/lnurl.module");
const channels_module_1 = require("./channels/channels.module");
const forwards_module_1 = require("./forwards/forwards.module");
const health_module_1 = require("./health/health.module");
const transactions_module_1 = require("./transactions/transactions.module");
const invoices_module_1 = require("./invoices/invoices.module");
const chat_module_1 = require("./chat/chat.module");
const boltz_module_1 = require("./boltz/boltz.module");
const lnmarkets_module_1 = require("./lnmarkets/lnmarkets.module");
const bos_module_1 = require("./bos/bos.module");
const userConfig_module_1 = require("./userConfig/userConfig.module");
let ApiModule = class ApiModule {
};
ApiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            userConfig_module_1.UserConfigModule,
            main_module_1.MainModule,
            base_module_1.BaseModule,
            auth_module_1.AuthModule,
            account_module_1.AccountModule,
            amboss_module_1.AmbossModule,
            bitcoin_module_1.BitcoinModule,
            node_module_1.NodeModule,
            github_module_1.GithubModule,
            wallet_module_1.WalletModule,
            tools_module_1.ToolsModule,
            macaroon_module_1.MacaroonModule,
            network_module_1.NetworkModule,
            peer_module_1.PeerModule,
            chain_module_1.ChainModule,
            edge_module_1.EdgeModule,
            lnurl_module_1.LnUrlModule,
            channels_module_1.ChannelsModule,
            forwards_module_1.ForwardsModule,
            health_module_1.HealthModule,
            transactions_module_1.TransactionsModule,
            invoices_module_1.InvoicesModule,
            chat_module_1.ChatModule,
            boltz_module_1.BoltzModule,
            lnmarkets_module_1.LnMarketsModule,
            bos_module_1.BosModule,
        ],
    })
], ApiModule);
exports.ApiModule = ApiModule;
//# sourceMappingURL=api.module.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushNodeBalancesMutation = exports.pingHealthCheckMutation = exports.saveBackupMutation = exports.getNodeSocialInfo = exports.getLightningAddresses = exports.loginMutation = exports.getSignInfoQuery = exports.getLoginTokenQuery = exports.getUserQuery = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.getUserQuery = (0, graphql_tag_1.gql) `
  query GetUser {
    getUser {
      subscription {
        end_date
        subscribed
        upgradable
      }
      backups {
        available_size
        last_update
        last_update_size
        remaining_size
        total_size_saved
      }
    }
  }
`;
exports.getLoginTokenQuery = (0, graphql_tag_1.gql) `
  query GetLoginToken($seconds: Float) {
    getLoginToken(seconds: $seconds)
  }
`;
exports.getSignInfoQuery = (0, graphql_tag_1.gql) `
  query GetSignInfo {
    getSignInfo {
      expiry
      identifier
      message
    }
  }
`;
exports.loginMutation = (0, graphql_tag_1.gql) `
  mutation Login(
    $identifier: String!
    $signature: String!
    $seconds: Float
    $details: String
    $token: Boolean
  ) {
    login(
      identifier: $identifier
      signature: $signature
      seconds: $seconds
      details: $details
      token: $token
    )
  }
`;
exports.getLightningAddresses = (0, graphql_tag_1.gql) `
  query GetLightningAddresses {
    getLightningAddresses {
      pubkey
      lightning_address
    }
  }
`;
exports.getNodeSocialInfo = (0, graphql_tag_1.gql) `
  query GetNodeSocialInfo($pubkey: String!) {
    getNode(pubkey: $pubkey) {
      socials {
        info {
          private
          telegram
          twitter
          twitter_verified
          website
          email
        }
      }
    }
  }
`;
exports.saveBackupMutation = (0, graphql_tag_1.gql) `
  mutation SaveBackup($backup: String!, $signature: String!) {
    saveBackup(backup: $backup, signature: $signature)
  }
`;
exports.pingHealthCheckMutation = (0, graphql_tag_1.gql) `
  mutation HealthCheck($signature: String!, $timestamp: String!) {
    healthCheck(signature: $signature, timestamp: $timestamp)
  }
`;
exports.pushNodeBalancesMutation = (0, graphql_tag_1.gql) `
  mutation PushNodeBalances($input: ChannelBalancePushInput!) {
    pushNodeBalances(input: $input)
  }
`;
//# sourceMappingURL=amboss.gql.js.map
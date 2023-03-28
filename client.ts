import {
  ExecutionUnit, //type
  Notification, //type
  RetryPolicy, //type
  WebhooksManager,
  WebhooksManagerOptions, //type
} from "https://deno.land/x/webhooks_manager/mod.ts";
import {
  binary_to_base58,
  base58_to_binary,
} from "https://cdn.deno.land/base58/versions/v2.0.0/raw/index.mjs";

const manager = new WebhooksManager(); //For more than one instance use different namespaces

await manager.addWebhooks([
  "https://discord.com/api/webhooks/1073165006121742347/sarBQStYisGl-58NVNkhL1EwJf_YrfxWTSHBxWJA53GxqfDb8Gy58a911O3C9WDI7Ks9",
  // "https://myrsecondulexample.com",
]);

//Will be delivered to urls "https://myrulexample.com" and "https://myrsecondulexample.com"
const notificationIds = await manager.addNotifications([
  {
    ids: [
      "1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111",
    ],
    event: "auth",
    extra: {
      blob: "TOKEN",
    },
  },
]);

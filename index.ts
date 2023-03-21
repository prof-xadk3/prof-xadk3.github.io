import { dlopen } from "https://deno.land/x/plug/mod.ts";
import * as ssh from "https://deno.land/x/ssh@v0.0.0/mod.ts";
import { Fido2Lib } from "https://deno.land/x/fido2/dist/main.js";
import * as proxy from "https://deno.land/x/proxy@0.0.2/mod.ts";
import { Client } from "https://deno.land/x/mqtt/deno/mod.ts";
import * as amethyst from "https://deno.land/x/amethyst@v7.0.0/mod.ts";
// import { createSimpleSecureWebsocketServer } from "https://deno.land/x/simple-secure-websocket-server/mod.ts";
// import { requestProvider } from "https://deno.land/x/webln";
// import { UnsupportedMethodError } from "https://deno.land/x/webln/lib/errors";
// For example, an app should check if an uncommon method isn't supported,
// and let the user know what to do.

async function requestProvider() {
  //
}

async function sign_3rM5G(msg: string) {
  try {
    const webln = await requestProvider();
    const res = await webln.signMessage(msg);
    return res;
  } catch (err) {
    if (err.constructor === UnsupportedMethodError) {
      alert(
        "Your WebLN provider doesn’t support message signing, you may tweet to getalby.com for manual verification."
      );
    } else {
      alert(err.message);
    }
  }
}

const f2l = new Fido2Lib({
  timeout: 42,
  rpId: "is.gd",
  rpName: "ACME",
  rpIcon:
    "https://nostr.build/i/nostr.build_51434edfa72760c07d36c76dc2c9433bff36c19ba66ce211e4a456666051af45.webp",
  challengeSize: 128,
  attestation: "none",
  cryptoParams: [-7, -257],
  authenticatorAttachment: "platform",
  authenticatorRequireResidentKey: false,
  authenticatorUserVerification: "required",
});

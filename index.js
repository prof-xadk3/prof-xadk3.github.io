#!/usr/bin/env deni

import once from 'https://deno.land/x/once@typescript/index.ts'
const ran = once(Math.random); // heh!?

import { dpx } from "https://deno.land/x/dpx/mod.ts";
// var noble = require('noble');
// const QRCode = dpx('qrcode-svg');
// import { parser } from "https://unpkg.com/yargs-parser@19.0.0/browser.js";
import parser from "https://deno.land/x/yargs_parser/deno.ts";
import { qrcode } from "https://deno.land/x/qrcode/mod.ts";
const args = process.argv.slice(2);
const argv = parser(`-message=${args} -key="; --id?=# --itr 0 -p 0 --iv=${+new Date()}`, {
  string: message,
  int: itr,
  int: p,
  int: iv
})

// const message = new QRCode(args[0]);  // enc./msg~Block/jwX~=iv.+timestamp === _i_id.
const msg = argv.message;
const b64_img = qrcode(`bitcoin:ADDRESS?amount=0.4&label=${msg}`);
console.log(b64_img);
console.log("What is this token!?");

let modules = message.qrcode.modules;

var ascii = '';
var length = modules.length;
for (var y = 0; y < length; y++) {
  for (var x = 0; x < length; x++) {
    var module = modules[x][y];
    ascii += (module ? '░░' : '  ');
  }
  ascii += '\r\n';
}
console.log(ascii);

/* -- lalala............
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var main_js_1 = require("https://deno.land/x/fido2/dist/main.js");
// import { createSimpleSecureWebsocketServer } from "https://deno.land/x/simple-secure-websocket-server/mod.ts";
var webln_1 = require("https://deno.land/x/webln");
// import { UnsupportedMethodError } from "https://deno.land/x/webln/lib/errors";
// For example, an app should check if an uncommon method isn't supported,
// and let the user know what to do.
function sign_3rM5G(msg) {
    return __awaiter(this, void 0, void 0, function () {
        var webln, res, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 0.9, 4]);
                    return [4 , (0, webln_1.requestProvider)()];
                case 1:
webln = _a.sent();
return [4 , webln.signMessage(msg)];
                case 2:
res = _a.sent();
return [2 , res];
                case 3:
err_1 = _a.sent();
if (err_1.constructor === UnsupportedMethodError) {
  alert("Your WebLN provider doesn’t support message signing, you may tweet to getalby.com for manual verification");
}
else {
  alert(err_1.message);
}
return [3 , 4];
                case 4: return [2, 5];
            }
        });
    });
}
var f2l = new main_js_1.Fido2Lib({
  timeout: 42,
  rpId: "is.gd",
  rpName: "ACME",
  rpIcon: "https://nostr.build/i/nostr.build_51434edfa72760c07d36c76dc2c9433bff36c19ba66ce211e4a456666051af45.webp",
  challengeSize: 128,
  attestation: "none",
  cryptoParams: [-7, -257],
  authenticatorAttachment: "platform",
  authenticatorRequireResidentKey: false,
  authenticatorUserVerification: "required"
});
*/ // ACME challenge pass obj. =)

export * as commandErrors from './command-errors.ts'
export * as commands from './command-types.ts'
export * as flagErrors from './flag-errors.ts'
export * as flags from './flag-types.ts'
export * as symbols from './symbols.ts'
export * as types from './types.ts'
export * as valueErrors from './value-errors.ts'
export * as values from './value-types.ts'

export * from './command-types.ts'
export * from './flag-types.ts'
export * from './symbols.ts'
export * from './types.ts'
export * from './value-types.ts'

export { CommandError } from './command-errors.ts'
export { FlagError } from './flag-errors.ts'
export { ValueError } from './value-errors.ts'

export { args, default } from './wrapper.ts'

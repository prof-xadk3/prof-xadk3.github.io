#!/usr/bin/env node

const QRCode = require('qrcode-svg');
const args = process.argv.slice(2);

const message = new QRCode(args[0]);  // enc./msg~Block/jwX~=iv.+timestamp == id.
let modules = message.qrcode.modules;

var ascii = '';
var length = modules.length;
for (var y = 0; y < length; y++) {
  for (var x = 0; x < length; x++) {
    var module = modules[x][y];
    ascii += (module ? '██' : '  ');
  }
  ascii += '\r\n';
}
console.log(ascii);

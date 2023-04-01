#!/usr/bin/env node

var wrapper = require('solc/wrapper');
var solc = wrapper(window.module);

console.log(solc);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthToken = exports.getIp = void 0;
const nax_ipware_1 = require("@fullerstack/nax-ipware");
const ipware = new nax_ipware_1.Ipware();
const getIp = (req) => {
    const ip_info = ipware.getClientIP(req);
    return ip_info.ip;
};
exports.getIp = getIp;
const getAuthToken = (req) => {
    const authHeader = req.headers['authorization'] || '';
    if (authHeader.startsWith('Bearer ')) {
        return authHeader.substring(7, authHeader.length);
    }
    else {
        return '';
    }
};
exports.getAuthToken = getAuthToken;
//# sourceMappingURL=request.js.map
"use strict";

var xml2js = require('xml2js');
var xmlParser = new xml2js.Parser({explicitArray: false});

module.exports = function (callback) {
    return function xmlHttpResponse(req, res) {
        var body = '';
        req.setEncoding('utf8');
        req.on('data', function (chunk) {
            body += chunk;
        });
        req.on('end', function () {
            res.end()
            xmlParser.parseString(body, callback);
        });
    };
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeMessages = exports.decodeMessage = exports.createCustomRecords = void 0;
const MESSAGE_TYPE = '34349334';
const SIGNATURE_TYPE = '34349337';
const SENDER_TYPE = '34349339';
const ALIAS_TYPE = '34349340';
const CONTENT_TYPE = '34349345';
const REQUEST_TYPE = '34349347';
const KEYSEND_TYPE = '5482373484';
const bufferHexToUtf = (value) => Buffer.from(value, 'hex').toString('utf8');
const bufferUtfToHex = (value) => Buffer.from(value, 'utf8').toString('hex');
const createCustomRecords = ({ message, sender, alias, contentType, requestType, secret, signature, }) => {
    return [
        {
            type: KEYSEND_TYPE,
            value: secret,
        },
        {
            type: MESSAGE_TYPE,
            value: bufferUtfToHex(message),
        },
        {
            type: SENDER_TYPE,
            value: sender,
        },
        {
            type: ALIAS_TYPE,
            value: bufferUtfToHex(alias),
        },
        {
            type: CONTENT_TYPE,
            value: bufferUtfToHex(contentType),
        },
        {
            type: REQUEST_TYPE,
            value: bufferUtfToHex(requestType),
        },
        {
            type: SIGNATURE_TYPE,
            value: bufferUtfToHex(signature),
        },
    ];
};
exports.createCustomRecords = createCustomRecords;
const decodeMessage = ({ type, value, }) => {
    switch (type) {
        case MESSAGE_TYPE:
            return { message: bufferHexToUtf(value) };
        case SIGNATURE_TYPE:
            return { signature: bufferHexToUtf(value) };
        case SENDER_TYPE:
            return { sender: value };
        case ALIAS_TYPE:
            return { alias: bufferHexToUtf(value) };
        case CONTENT_TYPE:
            return { contentType: bufferHexToUtf(value) };
        case REQUEST_TYPE:
            return { requestType: bufferHexToUtf(value) };
        default:
            return {};
    }
};
exports.decodeMessage = decodeMessage;
const decodeMessages = (messages) => {
    let customRecords = {};
    messages.forEach(message => {
        const { type, value } = message;
        const obj = (0, exports.decodeMessage)({ type, value });
        customRecords = Object.assign(Object.assign({}, customRecords), obj);
    });
    if (Object.keys(customRecords).length <= 0) {
        return;
    }
    return customRecords;
};
exports.decodeMessages = decodeMessages;
//# sourceMappingURL=customRecords.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyFeeScore = exports.getFeeScore = exports.getAverage = exports.getChannelIdInfo = exports.getChannelAge = exports.getChannelVolume = void 0;
const lodash_1 = require("lodash");
const getChannelVolume = (forwards) => {
    const orderedIncoming = (0, lodash_1.groupBy)(forwards, f => f.incoming_channel);
    const orderedOutgoing = (0, lodash_1.groupBy)(forwards, f => f.outgoing_channel);
    const reducedIncoming = reduceTokens(orderedIncoming);
    const reducedOutgoing = reduceTokens(orderedOutgoing);
    const together = (0, lodash_1.groupBy)([...reducedIncoming, ...reducedOutgoing], c => c.channel);
    return reduceTokens(together);
};
exports.getChannelVolume = getChannelVolume;
const reduceTokens = (array) => {
    const reducedArray = [];
    for (const key in array) {
        if (Object.prototype.hasOwnProperty.call(array, key)) {
            const channel = array[key];
            const reduced = channel.reduce((a, b) => a + b.tokens, 0);
            reducedArray.push({ channel: key, tokens: reduced });
        }
    }
    return reducedArray;
};
const getChannelAge = (id, currentHeight) => {
    const info = (0, exports.getChannelIdInfo)(id);
    if (!info)
        return 0;
    return currentHeight - info.blockHeight;
};
exports.getChannelAge = getChannelAge;
const getChannelIdInfo = (id) => {
    const format = /^\d*x\d*x\d*$/;
    if (!format.test(id))
        return null;
    const separate = id.split('x');
    return {
        blockHeight: Number(separate[0]),
        transaction: Number(separate[1]),
        output: Number(separate[2]),
    };
};
exports.getChannelIdInfo = getChannelIdInfo;
const getAverage = (array) => {
    const sum = array.reduce((a, b) => a + b, 0);
    return sum / array.length || 0;
};
exports.getAverage = getAverage;
const getFeeScore = (max, current) => {
    const score = Math.round(((max - current) / max) * 100);
    return Math.max(0, Math.min(100, score));
};
exports.getFeeScore = getFeeScore;
const getMyFeeScore = (max, current, min) => {
    if (current === min) {
        return { over: false, score: 100 };
    }
    if (current < min) {
        const score = Math.round(((min - current) / min) * 100);
        return { over: false, score: 100 - Math.max(0, Math.min(100, score)) };
    }
    const minimum = current - min;
    const maximum = max - min;
    const score = Math.round(((maximum - minimum) / maximum) * 100);
    return { over: true, score: Math.max(0, Math.min(100, score)) };
};
exports.getMyFeeScore = getMyFeeScore;
//# sourceMappingURL=health.helpers.js.map
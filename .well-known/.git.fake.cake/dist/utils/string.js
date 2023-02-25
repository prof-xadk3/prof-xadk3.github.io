"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripAnsi = exports.reversedBytes = exports.shorten = void 0;
const shorten = (text) => {
    if (!text)
        return '';
    const amount = 6;
    const beginning = text.slice(0, amount);
    const end = text.slice(text.length - amount);
    return `${beginning}...${end}`;
};
exports.shorten = shorten;
const reversedBytes = hex => Buffer.from(hex, 'hex').reverse().toString('hex');
exports.reversedBytes = reversedBytes;
const ansiRegex = ({ onlyFirst = false } = {}) => {
    const pattern = [
        '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
        '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))',
    ].join('|');
    return new RegExp(pattern, onlyFirst ? undefined : 'g');
};
const stripAnsi = string => {
    if (typeof string !== 'string') {
        throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
    }
    return string.replace(ansiRegex(), '');
};
exports.stripAnsi = stripAnsi;
//# sourceMappingURL=string.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toWithError = exports.to = void 0;
const to = async (promise) => {
    return promise
        .then(data => data)
        .catch(err => {
        throw new Error(err);
    });
};
exports.to = to;
const toWithError = async (promise) => {
    return promise
        .then(data => [data, undefined])
        .catch(err => [undefined, err]);
};
exports.toWithError = toWithError;
//# sourceMappingURL=async.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorMsg = exports.to = void 0;
const to = async (promise) => {
    return promise
        .then(data => data)
        .catch(err => {
        throw new Error((0, exports.getErrorMsg)(err));
    });
};
exports.to = to;
const getErrorMsg = (error) => {
    var _a;
    if (!error)
        return 'Unknown Error';
    if (typeof error === 'string')
        return error;
    if (error[2]) {
        const errorTitle = error[1] || '';
        const errorObject = (_a = error[2]) === null || _a === void 0 ? void 0 : _a.err;
        let errorString = '';
        if (typeof errorObject === 'string') {
            errorString = `${errorTitle}. ${errorObject}`;
        }
        else {
            errorString = `${errorTitle}. ${(errorObject === null || errorObject === void 0 ? void 0 : errorObject.details) || ''}`;
        }
        return errorString;
    }
    if (error[1] && typeof error[1] === 'string') {
        return error[1];
    }
    console.log('Unknown Error:', error);
    return 'Unknown Error';
};
exports.getErrorMsg = getErrorMsg;
//# sourceMappingURL=lnd.helpers.js.map
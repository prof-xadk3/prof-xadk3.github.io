"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChannelIdInfo = exports.getChannelAge = void 0;
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
//# sourceMappingURL=channels.helpers.js.map
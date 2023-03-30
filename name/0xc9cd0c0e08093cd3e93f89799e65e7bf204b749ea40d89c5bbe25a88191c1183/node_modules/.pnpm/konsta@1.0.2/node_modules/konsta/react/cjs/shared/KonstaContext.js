"use strict";

exports.__esModule = true;
exports.KonstaContext = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const KonstaContext = /*#__PURE__*/_react.default.createContext({
  theme: 'material',
  dark: true,
  touchRipple: true
});

exports.KonstaContext = KonstaContext;
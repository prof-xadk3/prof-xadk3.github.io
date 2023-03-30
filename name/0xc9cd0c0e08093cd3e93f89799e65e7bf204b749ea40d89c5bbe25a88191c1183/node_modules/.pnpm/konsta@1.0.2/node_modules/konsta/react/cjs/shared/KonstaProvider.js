"use strict";

exports.__esModule = true;
exports.KonstaProvider = void 0;

var _react = _interopRequireDefault(require("react"));

var _KonstaContext = require("./KonstaContext.js");

var _useAutoTheme = require("./use-auto-theme.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const KonstaProvider = props => {
  const {
    theme,
    dark,
    touchRipple = true,
    autoThemeDetection = true,
    children
  } = props;
  const currentTheme = (0, _useAutoTheme.useAutoTheme)(theme, autoThemeDetection);
  return /*#__PURE__*/_react.default.createElement(_KonstaContext.KonstaContext.Provider, {
    value: {
      theme: currentTheme,
      dark,
      touchRipple
    }
  }, children);
};

exports.KonstaProvider = KonstaProvider;
"use strict";

exports.__esModule = true;
exports.useTheme = void 0;

var _react = require("react");

var _KonstaContext = require("./KonstaContext.js");

const useTheme = function (_temp) {
  let {
    ios,
    material
  } = _temp === void 0 ? {} : _temp;
  const context = (0, _react.useContext)(_KonstaContext.KonstaContext);
  let theme = context.theme || 'ios';
  if (ios) theme = 'ios';
  if (material) theme = 'material';
  return theme;
};

exports.useTheme = useTheme;
"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const PreloaderMaterial = props => {
  return /*#__PURE__*/_react.default.createElement("svg", _extends({
    viewBox: "0 0 36 36"
  }, props, {
    fill: "none",
    stroke: "currentcolor"
  }), /*#__PURE__*/_react.default.createElement("circle", {
    cx: "18",
    cy: "18",
    r: "16"
  }));
};

var _default = PreloaderMaterial;
exports.default = _default;
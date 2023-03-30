"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const DropdownIcon = props => {
  return /*#__PURE__*/_react.default.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "8",
    height: "5",
    viewBox: "0 0 8 5",
    fill: "currentcolor"
  }, props), /*#__PURE__*/_react.default.createElement("polygon", {
    fillRule: "evenodd",
    points: "0 0 8 0 4 5"
  }));
};

var _default = DropdownIcon;
exports.default = _default;
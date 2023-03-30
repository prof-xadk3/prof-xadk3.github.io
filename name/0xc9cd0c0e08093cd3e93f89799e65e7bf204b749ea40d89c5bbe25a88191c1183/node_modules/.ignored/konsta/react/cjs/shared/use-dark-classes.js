"use strict";

exports.__esModule = true;
exports.useDarkClasses = void 0;

var _react = require("react");

var _KonstaContext = require("./KonstaContext.js");

const useDarkClasses = () => {
  const context = (0, _react.useContext)(_KonstaContext.KonstaContext);
  return classNames => {
    if (!context.dark) return '';
    return classNames;
  };
};

exports.useDarkClasses = useDarkClasses;
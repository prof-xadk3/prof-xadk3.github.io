"use strict";

exports.__esModule = true;
exports.IconClasses = void 0;

var _positionClass = require("../position-class.js");

const IconClasses = (props, classes) => {
  return {
    base: `${(0, _positionClass.positionClass)('relative', classes)} inline-block not-italic`,
    badge: 'absolute -right-1.5 -top-0.5'
  };
};

exports.IconClasses = IconClasses;
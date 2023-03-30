"use strict";

exports.__esModule = true;
exports.AppClasses = void 0;

var _cls = require("../cls.js");

var _positionClass = require("../position-class.js");

const AppClasses = (props, currentTheme, classes) => {
  const {
    safeAreas
  } = props;
  return (0, _cls.cls)(currentTheme === 'ios' && `k-ios`, currentTheme === 'material' && 'k-material', 'k-app w-full h-full min-h-screen', safeAreas && 'safe-areas', (0, _positionClass.positionClass)('relative', classes), classes);
};

exports.AppClasses = AppClasses;
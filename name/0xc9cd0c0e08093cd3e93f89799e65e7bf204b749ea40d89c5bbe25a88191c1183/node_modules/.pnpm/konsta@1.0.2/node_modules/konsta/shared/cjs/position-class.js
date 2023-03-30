"use strict";

exports.__esModule = true;
exports.positionClass = void 0;

const positionClass = function (position, className) {
  if (className === void 0) {
    className = '';
  }

  if (!className || typeof className !== 'string') return position;
  const classes = ['static', 'relative', 'absolute', 'fixed', 'sticky'];
  const hasPositionClass = classes.filter(c => className.indexOf(c) >= 0).length > 0;
  return hasPositionClass ? '' : position;
};

exports.positionClass = positionClass;
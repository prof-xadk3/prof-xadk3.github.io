"use strict";

exports.__esModule = true;
exports.useThemeClasses = void 0;

var _react = require("react");

var _KonstaContext = require("./KonstaContext.js");

var _cls = require("../../../shared/cjs/cls.js");

const propClasses = (classesObj, theme, state) => {
  if (typeof classesObj === 'string') return classesObj;
  const arr = [classesObj.common, classesObj[theme]];

  if (state && classesObj[state]) {
    if (typeof classesObj[state] === 'string') arr.push(classesObj[state]);else {
      arr.push(classesObj[state].common, classesObj[state][theme]);
    }
  }

  return arr;
};

const themeClasses = (classesObj, theme, addBaseClassName) => {
  const c = {};
  const themeSubKeys = ['common', 'ios', 'material'];
  Object.keys(classesObj).forEach(key => {
    const addBaseClass = key === 'base' ? addBaseClassName : '';
    const hasStates = typeof classesObj[key] !== 'string' && Object.keys(classesObj[key]).filter(state => !themeSubKeys.includes(state)).length > 0;

    if (!hasStates) {
      c[key] = (0, _cls.cls)(propClasses(classesObj[key], theme), addBaseClass);
      return;
    }

    c[key] = {};
    const defaultStateClasses = propClasses(classesObj[key], theme);
    c[key].default = (0, _cls.cls)(defaultStateClasses, addBaseClass);
    Object.keys(classesObj[key]).filter(state => !themeSubKeys.includes(state)).forEach(state => {
      c[key][state] = (0, _cls.cls)(defaultStateClasses, propClasses(classesObj[key], theme, state), addBaseClass);
    });
  });
  return c;
};

const useThemeClasses = function (_temp) {
  let {
    ios,
    material
  } = _temp === void 0 ? {} : _temp;
  const context = (0, _react.useContext)(_KonstaContext.KonstaContext);
  let theme = context.theme || 'ios';
  if (ios) theme = 'ios';
  if (material) theme = 'material';
  return (classesObj, addBaseClassName) => themeClasses(classesObj, theme, addBaseClassName);
};

exports.useThemeClasses = useThemeClasses;
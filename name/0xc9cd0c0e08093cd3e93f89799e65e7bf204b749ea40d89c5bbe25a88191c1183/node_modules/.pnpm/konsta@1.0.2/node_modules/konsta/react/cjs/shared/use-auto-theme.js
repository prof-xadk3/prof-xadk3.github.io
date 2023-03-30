"use strict";

exports.__esModule = true;
exports.useAutoTheme = void 0;

var _react = require("react");

var _useIsomorphicLayoutEffect = require("./use-isomorphic-layout-effect.js");

const useAutoTheme = function (theme, autoThemeDetection) {
  if (autoThemeDetection === void 0) {
    autoThemeDetection = true;
  }

  const [themeState, setThemeState] = (0, _react.useState)(theme);
  /* eslint-disable no-restricted-globals */

  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(() => {
    if (!autoThemeDetection) return;

    if (theme === 'ios' || theme === 'material') {
      if (themeState !== theme) setThemeState(theme);
    } else if (themeState === 'parent' && typeof window !== 'undefined' && typeof document !== 'undefined') {
      const htmlEl = document.documentElement;

      if (htmlEl) {
        if (htmlEl.classList.contains('ios')) {
          setThemeState('ios');
        } else if (htmlEl.classList.contains('md') || htmlEl.classList.contains('material')) {
          setThemeState('material');
        }
      }
    }
  }, [theme]);
  /* eslint-enable no-restricted-globals */

  return autoThemeDetection ? themeState : theme;
};

exports.useAutoTheme = useAutoTheme;
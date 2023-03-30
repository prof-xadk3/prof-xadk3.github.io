function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { KonstaProvider } from '../shared/KonstaProvider.js';
import { useAutoTheme } from '../shared/use-auto-theme.js';
import { AppClasses } from '../../../shared/esm/classes/AppClasses.js';
const App = /*#__PURE__*/forwardRef((props, ref) => {
  const {
    component = 'div',
    className,
    theme = 'material',
    dark = true,
    touchRipple = true,
    safeAreas = true,
    // Children
    children,
    // Rest
    ...rest
  } = props;
  const elRef = useRef(null);
  useImperativeHandle(ref, () => ({
    el: elRef.current
  }));
  const Component = component;
  const attrs = { ...rest
  };
  const currentTheme = useAutoTheme(theme);
  const classes = AppClasses({ ...props,
    safeAreas
  }, currentTheme, className);
  return /*#__PURE__*/React.createElement(KonstaProvider, {
    theme: currentTheme,
    dark: dark,
    touchRipple: touchRipple,
    autoThemeDetection: false
  }, /*#__PURE__*/React.createElement(Component, _extends({
    ref: elRef,
    className: classes
  }, attrs), children));
});
App.displayName = 'App';
export default App;
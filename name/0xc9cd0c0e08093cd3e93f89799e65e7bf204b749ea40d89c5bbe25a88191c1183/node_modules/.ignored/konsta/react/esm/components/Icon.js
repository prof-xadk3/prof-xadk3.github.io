function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { useTheme } from '../shared/use-theme.js';
import { useThemeClasses } from '../shared/use-theme-classes.js';
import Badge from './Badge.js';
import { IconClasses } from '../../../shared/esm/classes/IconClasses.js';
const Icon = /*#__PURE__*/forwardRef((props, ref) => {
  const {
    component = 'i',
    className,
    ios,
    material,
    badge,
    badgeColors,
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
  const themeClasses = useThemeClasses();
  const theme = useTheme();
  const c = themeClasses(IconClasses(props, className), className);
  return /*#__PURE__*/React.createElement(Component, _extends({
    ref: elRef,
    className: c.base
  }, attrs), theme === 'ios' ? ios : material, typeof badge !== 'undefined' && badge !== null && /*#__PURE__*/React.createElement(Badge, {
    small: true,
    className: c.badge,
    colors: badgeColors
  }, badge), children);
});
Icon.displayName = 'Icon';
export default Icon;
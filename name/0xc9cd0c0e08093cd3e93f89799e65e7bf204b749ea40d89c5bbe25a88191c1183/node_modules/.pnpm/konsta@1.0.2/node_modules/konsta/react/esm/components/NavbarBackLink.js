function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { useTheme } from '../shared/use-theme.js';
import { useThemeClasses } from '../shared/use-theme-classes.js';
import BackIcon from './icons/BackIcon.js';
import Link from './Link.js';
import { NavbarBackLinkClasses } from '../../../shared/esm/classes/NavbarBackLinkClasses.js';
const NavbarBackLink = /*#__PURE__*/forwardRef((props, ref) => {
  const {
    component = 'a',
    className,
    text = 'Back',
    showText = 'auto',
    ios,
    material,
    onClick,
    // Children
    children,
    // Rest
    ...rest
  } = props;
  const elRef = useRef(null);
  useImperativeHandle(ref, () => ({
    el: elRef.current
  }));
  const attrs = { ...rest
  };
  const theme = useTheme({
    ios,
    material
  });
  const themeClasses = useThemeClasses({
    ios,
    material
  });
  const shouldShowText = showText === 'auto' && theme === 'ios' || showText === true;
  const c = themeClasses(NavbarBackLinkClasses(), className);
  return /*#__PURE__*/React.createElement(Link, _extends({
    ref: elRef,
    component: component,
    className: c.base,
    navbar: true
  }, attrs, {
    onClick: onClick
  }), /*#__PURE__*/React.createElement("span", {
    className: c.icon
  }, /*#__PURE__*/React.createElement(BackIcon, {
    theme: theme
  })), shouldShowText && /*#__PURE__*/React.createElement("span", null, text), children);
});
NavbarBackLink.displayName = 'NavbarBackLink';
export default NavbarBackLink;
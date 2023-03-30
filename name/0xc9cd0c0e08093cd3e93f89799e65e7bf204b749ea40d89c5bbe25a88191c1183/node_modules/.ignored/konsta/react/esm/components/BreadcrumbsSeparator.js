function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { BreadcrumbsSeparatorClasses } from '../../../shared/esm/classes/BreadcrumbsSeparatorClasses.js';
import { useThemeClasses } from '../shared/use-theme-classes.js';
import ChevronIcon from './icons/ChevronIcon.js';
const BreadcrumbsSeparator = /*#__PURE__*/forwardRef((props, ref) => {
  const {
    component = 'div',
    className,
    ios,
    material,
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
  const themeClasses = useThemeClasses({
    ios,
    material
  });
  const c = themeClasses(BreadcrumbsSeparatorClasses({ ...props
  }), className);
  return /*#__PURE__*/React.createElement(Component, _extends({
    ref: elRef,
    className: c.base
  }, attrs), /*#__PURE__*/React.createElement(ChevronIcon, {
    className: c.icon
  }), children);
});
BreadcrumbsSeparator.displayName = 'BreadcrumbsSeparator';
export default BreadcrumbsSeparator;
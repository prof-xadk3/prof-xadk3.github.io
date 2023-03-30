function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import ListItem from './ListItem.js';
const MenuListItem = /*#__PURE__*/forwardRef((props, ref) => {
  const {
    active,
    href,
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
  return /*#__PURE__*/React.createElement(ListItem, _extends({
    ref: elRef,
    menuListItem: true,
    menuListItemActive: active,
    href: href || false
  }, attrs), children);
});
MenuListItem.displayName = 'MenuListItem';
export default MenuListItem;
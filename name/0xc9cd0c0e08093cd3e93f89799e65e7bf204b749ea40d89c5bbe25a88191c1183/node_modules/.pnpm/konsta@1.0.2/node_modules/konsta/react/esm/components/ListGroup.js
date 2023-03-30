function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import List from './List.js';
const ListGroup = /*#__PURE__*/forwardRef((props, ref) => {
  const {
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
  return /*#__PURE__*/React.createElement("li", {
    ref: elRef
  }, /*#__PURE__*/React.createElement(List, _extends({
    nested: true
  }, attrs), children));
});
ListGroup.displayName = 'ListGroup';
export default ListGroup;
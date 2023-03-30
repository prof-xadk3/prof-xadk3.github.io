function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import Button from './Button.js';
const SegmentedButton = /*#__PURE__*/forwardRef((props, ref) => {
  const {
    active,
    children,
    outline,
    strong,
    clear,
    rounded,
    ...rest
  } = props;
  const elRef = useRef(null);
  useImperativeHandle(ref, () => ({
    el: elRef.current
  }));
  return /*#__PURE__*/React.createElement(Button, _extends({
    ref: elRef,
    segmented: true,
    segmentedActive: active,
    segmentedStrong: strong,
    rounded: rounded && strong
  }, rest), children);
});
SegmentedButton.displayName = 'SegmentedButton';
export default SegmentedButton;
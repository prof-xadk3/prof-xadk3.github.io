import { useContext } from 'react';
import { KonstaContext } from './KonstaContext.js';

const useTheme = function (_temp) {
  let {
    ios,
    material
  } = _temp === void 0 ? {} : _temp;
  const context = useContext(KonstaContext);
  let theme = context.theme || 'ios';
  if (ios) theme = 'ios';
  if (material) theme = 'material';
  return theme;
};

export { useTheme };
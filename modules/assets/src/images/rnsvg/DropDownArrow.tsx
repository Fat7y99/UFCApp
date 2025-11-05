import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg width={16} height={9} fill="none" {...props}>
    <Path
      fill="#CACACA"
      d="M7.61 8.276a.665.665 0 0 1-.472-.195L0 .943.943 0l6.666 6.667L14.276 0l.943.943L8.08 8.08c-.13.13-.301.195-.472.195Z"
    />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;

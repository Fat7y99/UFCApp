import * as React from 'react';
import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={23} height={23} fill="none" {...props}>
    <Path
      fill="#898989"
      d="M9 18a9 9 0 1 1 9-9 9.011 9.011 0 0 1-9 9ZM9 2a7 7 0 1 0 7 7 7.008 7.008 0 0 0-7-7Z"
    />
    <Path
      fill="#898989"
      d="M6 9H4a5.006 5.006 0 0 1 5-5v2a3 3 0 0 0-3 3ZM22.67 21.256 18.414 17c-.427.513-.9.987-1.414 1.414l4.256 4.256a1 1 0 0 0 1.414-1.414Z"
    />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;

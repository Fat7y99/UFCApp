import * as React from 'react';
import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#898989"
      strokeLinecap="square"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M22.75 13.25v-3l-3.248-.443a7.925 7.925 0 0 0-.9-2.165l1.984-2.61-2.118-2.121-2.61 1.984a7.927 7.927 0 0 0-2.165-.9L13.25.75h-3l-.443 3.248a7.927 7.927 0 0 0-2.165.9l-2.61-1.987-2.121 2.121 1.984 2.61a7.927 7.927 0 0 0-.9 2.165L.75 10.25v3l3.248.443c.191.762.494 1.492.9 2.165l-1.984 2.61 2.121 2.121 2.61-1.984a7.925 7.925 0 0 0 2.165.9l.44 3.245h3l.443-3.248a7.925 7.925 0 0 0 2.165-.9l2.61 1.984 2.121-2.121-1.984-2.61a7.925 7.925 0 0 0 .9-2.165l3.245-.44Z"
    />
    <Path
      stroke="#898989"
      fill={props.fill}
      strokeLinecap="square"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M11.75 14.75a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
    />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;

import * as React from 'react';
import { memo } from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={22} height={22} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        stroke="#898989"
        strokeWidth={2}
        d="M18.25 7.873v12.211h-4.417v-5.5H8.167v5.5H3.75V7.874L11 1.94l7.25 5.932Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h22v22H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;

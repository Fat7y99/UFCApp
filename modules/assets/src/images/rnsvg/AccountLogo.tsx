import * as React from 'react';
import { memo } from 'react';
import Svg, { Rect, G, Path, Defs, ClipPath } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={40} height={40} fill="none" {...props}>
    <Rect width={40} height={40} fill="#FF4267" rx={10} />
    <G fill="#fff" clipPath="url(#a)">
      <Path d="M20 20.833c2.758 0 5-2.242 5-5V15c0-2.758-2.242-5-5-5s-5 2.242-5 5v.833c0 2.758 2.242 5 5 5ZM26.102 23.317c-3.92-1.085-8.283-1.085-12.204 0a4.187 4.187 0 0 0-3.065 4.02V30h18.334v-2.663c0-1.867-1.261-3.52-3.065-4.02Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M10 10h20v20H10z" />
      </ClipPath>
    </Defs>
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;

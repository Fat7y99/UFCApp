import * as React from 'react';
import { memo } from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SuccessIcon = (props: SvgProps) => (
  <Svg width={104} height={104} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#39B54A"
        d="M52 104c28.719 0 52-23.281 52-52S80.719 0 52 0 0 23.281 0 52s23.281 52 52 52Z"
      />
      <Path
        fill="#fff"
        d="M40.227 78.981c-1.717 0-3.19-.736-4.416-1.717l-18.15-18.396c-2.453-2.453-2.453-6.378 0-8.585 2.452-2.453 6.377-2.453 8.584 0l13.736 13.736 33.604-33.604c2.453-2.453 6.377-2.453 8.585 0 2.453 2.453 2.453 6.377 0 8.585L44.642 77.264c-1.227.981-2.699 1.717-4.416 1.717Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h104v104H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
const Memo = memo(SuccessIcon);
export default Memo;

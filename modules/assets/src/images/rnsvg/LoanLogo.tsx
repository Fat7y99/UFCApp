import * as React from 'react';
import { memo } from 'react';
import Svg, { Rect, G, Path, Defs, ClipPath } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={40} height={40} fill="none" {...props}>
    <Rect width={40} height={40} fill="#3629B7" rx={10} />
    <G fill="#fff" clipPath="url(#a)">
      <Path d="M29.167 27.5h-.834v-6.667h-1.666V27.5h-3.334v-6.667h-1.666V27.5h-3.334v-6.667h-1.666V27.5h-3.334v-6.667h-1.666V27.5h-.834a.833.833 0 1 0 0 1.667h18.334a.833.833 0 1 0 0-1.667ZM29.566 15.102l-9.167-5a.838.838 0 0 0-.798 0l-9.167 5a.834.834 0 0 0-.434.731v2.5c0 .461.373.834.833.834h18.334c.46 0 .833-.373.833-.834v-2.5a.834.834 0 0 0-.434-.731ZM20 16.667a1.666 1.666 0 1 1-.001-3.333A1.666 1.666 0 0 1 20 16.667Z" />
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

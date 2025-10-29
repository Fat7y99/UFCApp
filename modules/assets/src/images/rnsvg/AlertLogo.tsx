import * as React from 'react';
import { memo } from 'react';
import Svg, { Rect, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={40} height={40} fill="none" {...props}>
    <Rect width={40} height={40} fill="#0890FE" rx={10} />
    <Path
      fill="#fff"
      d="M19.167 21.667a.833.833 0 0 1-.834-.834v-9.166A1.666 1.666 0 0 1 20 10h8.333A1.666 1.666 0 0 1 30 11.667V17.5a1.666 1.666 0 0 1-1.667 1.667h-5.555L19.666 21.5a.833.833 0 0 1-.5.167Z"
    />
    <Path
      fill="#fff"
      d="M23.333 20.833v5.834a.833.833 0 0 1-.833.833h-8.333a.833.833 0 0 1-.834-.833V15a.833.833 0 0 1 .834-.833h2.5v-2.5h-2.5a2.5 2.5 0 0 0-2.5 2.5V27.5a2.5 2.5 0 0 0 2.5 2.5H22.5a2.5 2.5 0 0 0 2.5-2.5v-6.667h-1.667Z"
    />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;

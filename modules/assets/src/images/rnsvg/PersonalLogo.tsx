import * as React from 'react';
import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={31} height={34} fill="none" {...props}>
    <Path
      fill="#fff"
      d="M15.48 18.416c4.656 0 8.442-3.812 8.442-8.5V8.5c0-4.688-3.786-8.5-8.443-8.5-4.656 0-8.443 3.812-8.443 8.5v1.417c0 4.687 3.787 8.5 8.443 8.5ZM25.783 22.64c-6.62-1.846-13.986-1.846-20.607 0C2.129 23.49 0 26.3 0 29.474V34h30.959v-4.526c0-3.175-2.13-5.984-5.176-6.834Z"
    />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;

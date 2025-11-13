import * as React from 'react';
import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={23} height={20} fill="none" {...props}>
    <Path
      fill="#FE3F3F"
      d="M17.736.012c-2.09-.197-5.596 1.976-6.202 5.269C10.927 1.988 7.42-.185 5.264.012 2.702.276-.736 1.395.14 6.598c.674 4.083 7.281 10.34 10.113 12.908.741.659 1.82.659 2.562 0 2.831-2.568 9.371-8.89 10.045-12.908C23.737 1.395 20.3.276 17.737.012Z"
    />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;

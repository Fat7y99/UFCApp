import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg width={13} height={13} fill="none" {...props}>
    <Path
      stroke="#CACACA"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M5.67 1.91H1.843A1.093 1.093 0 0 0 .75 3.003v7.654a1.094 1.094 0 0 0 1.093 1.093h7.654a1.094 1.094 0 0 0 1.093-1.093V6.83m-.82-5.74a1.16 1.16 0 1 1 1.64 1.64L6.217 7.923 4.03 8.47l.547-2.187L9.77 1.09Z"
    />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;

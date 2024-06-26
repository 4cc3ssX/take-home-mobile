import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const MasterCardColor = (props: SvgProps) => (
  <Svg width={25} height={15} fill="none" viewBox="0 0 25 15" {...props}>
    <Path
      fill="#FF5F00"
      fillRule="evenodd"
      d="M9.913 2.12h5.77v10.66h-5.77V2.12Z"
      clipRule="evenodd"
    />
    <Path
      fill="#EB001B"
      fillRule="evenodd"
      d="M10.28 7.45a6.87 6.87 0 0 1 2.51-5.33A6.441 6.441 0 0 0 8.722.67c-3.646 0-6.595 3.032-6.595 6.78 0 3.749 2.95 6.781 6.595 6.781a6.44 6.44 0 0 0 4.066-1.45c-1.52-1.225-2.51-3.165-2.51-5.33Z"
      clipRule="evenodd"
    />
    <Path
      fill="#F79E1B"
      fillRule="evenodd"
      d="M23.468 7.45c0 3.749-2.949 6.781-6.594 6.781a6.44 6.44 0 0 1-4.067-1.45c1.54-1.243 2.51-3.165 2.51-5.33a6.87 6.87 0 0 0-2.51-5.331A6.44 6.44 0 0 1 16.874.67c3.645 0 6.594 3.05 6.594 6.78Z"
      clipRule="evenodd"
    />
  </Svg>
);

import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface CurrencySymbolProps extends SvgProps {
  size?: number;
  color?: string;
}

const CurrencySymbol: React.FC<CurrencySymbolProps> = ({ size = 16, color = 'currentColor', style, ...props }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={style}
      {...props}
    >
      <Path
        d="M5 3H12C16.4183 3 20 6.58172 20 11C20 15.4183 16.4183 19 12 19H5V3ZM7 5V17H12C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7H7V5Z"
        fill={color === 'currentColor' ? '#000' : color}
      />
      <Path
        d="M3 9H21V11H3V9ZM3 13H21V15H3V13Z"
        fill={color === 'currentColor' ? '#000' : color}
      />
    </Svg>
  );
};

export default CurrencySymbol;

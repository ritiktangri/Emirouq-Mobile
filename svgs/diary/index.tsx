import * as React from 'react';
import Svg, { G, Rect, Path, Defs } from 'react-native-svg';

function ExpandSVG({ width = 44, height = 40, fill = '#737A8A', stroke = '#3872FA' }: any) {
  return (
    <Svg width={width} height={height} viewBox="0 0 44 40" fill="none">
      <G filter="url(#filter0_d_338_15394)" stroke={stroke}>
        <Rect x={2.5} y={1.5} width={39} height={35} rx={7.5} />
        <Path
          d="M25.333 15.667L29.5 11.5m0 0h-4.167m4.167 0v4.167m-10.833 0L14.5 11.5m0 0v4.167m0-4.167h4.167m0 10.833L14.5 26.5m0 0h4.167m-4.167 0v-4.167m10.833 0L29.5 26.5m0 0v-4.167m0 4.167h-4.167"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs />
    </Svg>
  );
}

function CompactSVG({ width = 44, height = 40, fill = '#737A8A', stroke = '#858585' }: any) {
  return (
    <Svg width={width} height={height} viewBox="0 0 44 40" fill="none">
      <G filter="url(#filter0_d_340_15716)">
        <Rect x={2.5} y={1.5} width={39} height={35} rx={7.5} stroke={stroke} />
        <Path
          d="M28.667 25.666L24.5 21.5m0 0v3.333m0-3.333h3.333m-12.5 4.166L19.5 21.5m0 0v3.333m0-3.333h-3.333m12.5-9.167L24.5 16.5m0 0v-3.334m0 3.334h3.333m-12.5-4.167L19.5 16.5m0 0v-3.334m0 3.334h-3.333"
          stroke="#DBDBDB"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs />
    </Svg>
  );
}

export { CompactSVG, ExpandSVG };

import React from 'react';
import { Image } from 'react-native';
import {
  fitContainer,
  ResumableZoom,
  SnapbackZoom,
  useImageResolution,
} from 'react-native-zoom-toolkit';
import { screenWidth } from '~/utils/helper';

const ZoomImage = ({ uri }: any) => {
  const { isFetching, resolution } = useImageResolution({ uri });
  if (isFetching || resolution === undefined) {
    return null;
  }

  // const size = fitContainer(resolution.width / resolution.height, {
  //   width: screenWidth,
  //   height: 400,
  // });

  return (
    // <ResumableZoom maxScale={resolution}>
    //   <Image
    //     source={{ uri }}
    //     style={{
    //       ...size,
    //     }}
    //     resizeMethod={'scale'}
    //   />
    // </ResumableZoom>
    <SnapbackZoom>
      <Image
        source={{ uri }}
        style={{
          width: screenWidth,
          height: 300,
        }}
        resizeMethod={'scale'}
        resizeMode={'cover'}
      />
    </SnapbackZoom>
  );
};

export default ZoomImage;

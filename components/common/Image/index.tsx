/* eslint-disable import/order */
import { View, Image as RNImage } from 'react-native';
import React from 'react';
import { Image as ExpoImage } from 'expo-image';

const Image = ({
  source,
  contentFit = 'fill',
  blurhash = 'LEHV6nWB2yk8pyo0adR*.7kCMdnj',
  transition = 1000,
  style = {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  expoImage,
  resizeMode = 'contain',
  className,
  ...props
}: any) => {
  return (
    <View>
      {expoImage ? (
        <ExpoImage
          source={source}
          contentFit={contentFit}
          placeholder={{ blurhash }}
          transition={transition}
          style={style}
          {...props}
        />
      ) : (
        <RNImage
          source={source}
          {...props}
          resizeMode={resizeMode}
          style={style}
          className={className}
        />
      )}
    </View>
  );
};

export default Image;

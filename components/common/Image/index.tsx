// /* eslint-disable import/order */
// import { View, Image as RNImage } from 'react-native';
// import React from 'react';
// import { Image as ExpoImage } from 'expo-image';

// const Image = ({
//   source,
//   contentFit = 'fill',
//   blurhash = 'LEHV6nWB2yk8pyo0adR*.7kCMdnj',
//   transition = 1000,
//   style = {
//     width: '100%',
//     height: '100%',
//     borderRadius: 100,
//   },
//   expoImage,
//   resizeMode = 'contain',
//   className,
//   ...props
// }: any) => {
//   return (
//     <View>
//       {expoImage ? (
//         <ExpoImage
//           source={source}
//           contentFit={contentFit}
//           placeholder={{ blurhash }}
//           transition={transition}
//           style={style}
//           {...props}
//         />
//       ) : (
//         <RNImage
//           source={source}
//           {...props}
//           resizeMode={resizeMode}
//           style={style}
//           className={className}
//         />
//       )}
//     </View>
//   );
// };

// export default Image;
import React, { useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    backgroundColor: '#e1e4e8',
  },
});

const Image = ({ thumbnailSource, source, style, ...props }: any) => {
  const thumbnailAnimated = useRef(new Animated.Value(0)).current;
  const imageAnimated = useRef(new Animated.Value(0)).current;

  const handleThumbnailLoad = () => {
    Animated.timing(thumbnailAnimated, {
      toValue: 1,
      duration: 250, // Optional: Add a duration for smoother transition
      useNativeDriver: true,
    }).start();
  };

  const onImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      duration: 250, // Optional: Add a duration for smoother transition
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        {...props}
        source={thumbnailSource}
        style={[style, { opacity: thumbnailAnimated }]}
        onLoad={handleThumbnailLoad}
        blurRadius={1}
      />
      <Animated.Image
        {...props}
        source={source}
        style={[styles.imageOverlay, { opacity: imageAnimated }, style]}
        onLoad={onImageLoad}
      />
    </View>
  );
};

export default Image;

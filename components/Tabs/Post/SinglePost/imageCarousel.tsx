import React, { useState } from 'react';
import { View, FlatList, Dimensions, Text, TouchableOpacity } from 'react-native';

import ZoomImage from './zoomimage';

function ImageCarousel({ data }: any) {
  const [selectedImage, setSelectedImage] = useState({
    uri: data?.data?.file[0],
    index: 1,
  });

  return (
    <View className="flex-1">
      <FlatList
        data={data?.data?.file}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        decelerationRate="fast"
        snapToInterval={Dimensions.get('screen').width} // each item is screen width
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const screenWidth = Dimensions.get('screen').width;
          const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);

          setSelectedImage({
            uri: data?.data?.file[index],
            index: index + 1,
          });
        }}
        renderItem={({ item }) => <ZoomImage uri={item} />}
      />

      <View className="absolute right-4 top-10 rounded-full bg-gray-800 px-3 py-1">
        <Text className="text-white">
          {selectedImage?.index}/{data?.data?.file?.length}
        </Text>
      </View>
    </View>
  );
}

export default ImageCarousel;

import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import ZoomImage from './zoomimage';
import ImageSlider from './imageSlider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

function ImageCarousel({ data }: any) {
  const [modalVisible, setModalVisible] = useState(false);

  const images = data?.data?.file || [];

  return (
    <View>
      <ImageSlider images={images} setModalVisible={setModalVisible} />
      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={{ flex: 1 }} className="bg-white">
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{
              paddingTop: useSafeAreaInsets().top,
            }}
            className="p-3">
            <Ionicons name="chevron-back" className="!text-3xl !text-black" />
          </TouchableOpacity>
          <FlatList
            ListHeaderComponent={() => <></>}
            data={images}
            stickyHeaderIndices={[0]}
            showsVerticalScrollIndicator={false}
            ListHeaderComponentStyle={{}}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => <ZoomImage uri={item} />}
          />
        </View>
      </Modal>
    </View>
  );
}

export default ImageCarousel;

const styles = StyleSheet.create({
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#bbb',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
  },
  closeBtn: {
    backgroundColor: 'black',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 24,
    marginTop: -2,
  },
});

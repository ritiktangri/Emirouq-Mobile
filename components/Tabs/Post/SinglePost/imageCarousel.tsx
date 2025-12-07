import React, { useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
  StyleSheet,
} from 'react-native';
import ZoomImage from './zoomimage';

const screenWidth = Dimensions.get('screen').width;

function ImageCarousel({ data }: any) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.8}>
        <Image
          source={{ uri: data?.data?.file[0] }}
          style={{ width: '100%', height: 300 }}
          resizeMode="cover"
        />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          {/* Close */}
          <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>

          <FlatList
            data={data?.data?.file}
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
  modalImage: {
    width: screenWidth,
    height: 260,
    marginBottom: 10,
  },
  closeBtn: {
    position: 'absolute',
    right: 20,
    top: 40,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
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
  zoomContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  zoomCloseBtn: {
    position: 'absolute',
    right: 20,
    top: 50,
    zIndex: 20,
  },
});

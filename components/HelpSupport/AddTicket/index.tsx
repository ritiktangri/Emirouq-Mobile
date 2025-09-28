import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { createTicket } from '~/utils/services/support';
import { useTheme } from '~/context/ThemeContext';

const AddTicket = ({ modalVisible, setModalVisible, refetchTickets }: any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useTheme();

  const pickImage = async () => {
    const result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const onCreateTicket = () => {
    setLoading(true);
    let formattedImage = {
      uuid: image?.assetId || image?.fileName,
      name: image?.fileName,
      type: image?.mimeType,
      uri: image?.uri,
    };

    const formData: any = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', formattedImage);
    createTicket({ body: formData })
      ?.then((res: any) => {
        showToast('Ticket created successfully!', 'success');
        setModalVisible(false);
        refetchTickets();
      })
      ?.catch((err) => {})
      ?.finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setModalVisible(false)}>
      <View className="flex-1 justify-center bg-black/40 px-4">
        <View className="rounded-2xl bg-white p-5">
          <Text className="mb-3 text-lg font-semibold">Add Support Ticket</Text>

          <TextInput
            className="mb-3 rounded-xl border border-gray-300 px-3 py-3 placeholder:text-gray-400"
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            className="mb-3 h-24 rounded-xl border border-gray-300 px-3 py-2 text-start"
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
          />

          <TouchableOpacity className="mb-3 flex-row items-center space-x-2" onPress={pickImage}>
            <Feather name="image" size={20} color="#FF5722" />
            <Text className="font-medium text-[#FF5722]">
              {image?.uri ? 'Change Image' : 'Upload Image'}
            </Text>
          </TouchableOpacity>

          {image?.uri && (
            <Image
              source={{ uri: image?.uri }}
              className="mb-3 h-40 w-40 rounded-xl"
              resizeMode="cover"
            />
          )}

          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={() => {
                setTitle('');
                setDescription('');
                setImage(null);
                setModalVisible(false);
              }}
              className="mt-7 flex-row items-center justify-center rounded-lg bg-gray-300 px-4 py-2">
              <Text className="text-center text-base font-[500] text-gray-900 ">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onCreateTicket}
              className="mt-7 flex-row items-center justify-center rounded-lg bg-primary px-4 py-2">
              {loading && <ActivityIndicator />}
              <Text className="text-center text-base font-[500] text-white ">Create Ticket</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddTicket;

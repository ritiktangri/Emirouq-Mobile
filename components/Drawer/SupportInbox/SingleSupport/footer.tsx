import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Feather, Ionicons } from '@expo/vector-icons';
import AttachmentList from '../../../Tabs/Diary/Render/attachments';

const Footer = () => {
  const [images, setImages] = useState([] as any);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const { assets } = result;
      if (assets) {
        const newAttachments = assets.map((asset: any) => ({
          uuid: asset.assetId,
          name: asset.fileName,
          type: asset.mimeType,
        }));

        setImages([...images, ...newAttachments]);
      }
    }
  };
  const handleDelete = (attachment: any) => {
    setImages(images?.filter((f: any) => f?.uuid !== attachment?.uuid));
  };
  return (
    <View className="mx-4 bg-black">
      <TextInput
        className="h-12 w-full rounded-lg bg-white px-4"
        placeholder="Type your message here..."
      />
      <AttachmentList data={images || []} handleDelete={handleDelete} />

      <View className="mb-4 mt-4 flex-row justify-end gap-3">
        <TouchableOpacity
          onPress={pickImage}
          className="flex-row items-center gap-2 rounded-lg border-[1px] border-gray-600 bg-black p-3">
          <Ionicons name="attach" size={20} color="white" />
          <Text className="font-poppinsMedium text-white">Attach media</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center gap-2 rounded-lg  bg-primary p-3">
          <Feather name="send" size={15} color="white" />
          <Text className="font-poppinsMedium text-white">Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Footer;

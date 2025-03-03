/* eslint-disable import/order */
import { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { DefaultText as Text } from '~/components/common/DefaultText';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import AttachmentList from './attachments';

export default function UploadAttachments({ data, setData }: any) {
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

        setData({
          ...data,
          attachments: [...data.attachments, ...newAttachments],
        });
      }
    }
  };
  const handleDelete = (attachment: any) => {
    setData({
      ...data,
      attachments: data?.attachments?.filter(
        (f: any) => f?.uuid !== attachment?.uuid || f.name !== attachment?.name
      ),
      removedAttachments: [...(data?.removedAttachments || []), attachment.uuid || attachment.name],
    });
  };

  return (
    <View className="flex-1">
      <AttachmentList data={data?.attachments || []} handleDelete={handleDelete} />
      <View className="mb-4 flex-row justify-end gap-2">
        <TouchableOpacity
          onPress={pickImage}
          className="flex-row items-center rounded-md bg-blue-500 px-3 py-2">
          <Ionicons name="attach" size={16} color="white" />
          <Text className="ml-1 text-white">Attach Media</Text>
        </TouchableOpacity>
        <TouchableOpacity className="rounded-md bg-blue-500 px-3 py-2">
          <Text className="text-white">Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

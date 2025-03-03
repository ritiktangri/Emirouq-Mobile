import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { DefaultText as Text } from '~/components/common/DefaultText';
import { PdfIconSVG, PngIconSVG } from '~/svgs';

export const renderIcon: any = {
  'image/png': <PngIconSVG width={30} height={30} />,
  'image/jpg': <PngIconSVG width={30} height={30} />,
  'image/jpeg': <PngIconSVG width={30} height={30} />,
  'text/csv': <FontAwesome6 name="file-csv" size={20} className="!text-primary dark:!text-white" />,
  'application/pdf': <PdfIconSVG width={25} height={25} />,
  default: <Ionicons name="attach" size={20} className="!text-primary dark:!text-white" />,
};
const AttachmentList = ({ data, handleDelete }: any) => {
  return (
    <View className=" ">
      <FlatList
        data={data}
        numColumns={2}
        columnWrapperStyle={{
          gap: 10,
        }}
        keyExtractor={(item: any) => item.uuid}
        renderItem={({ item }) => (
          <View className="w-1/2 flex-row items-center  gap-2 py-2">
            <View className=" items-center justify-center overflow-hidden rounded-md">
              {renderIcon[item?.type]}
            </View>
            <View className="flex-1">
              <Text className="text-xs font-medium dark:text-dashboard_card_text">
                {item?.name}
              </Text>
              <View className="mt-4 flex-row items-center gap-2">
                <TouchableOpacity
                  className="flex-row items-center gap-1"
                  onPress={() => handleDelete(item)}>
                  <Ionicons name="trash" size={15} color="#FF00008B" />
                  <Text className="text-sm text-gray-500">Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default memo(AttachmentList);

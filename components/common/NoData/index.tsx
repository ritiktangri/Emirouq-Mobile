/* eslint-disable import/order */
import { Ionicons } from '@expo/vector-icons';
import { i18n } from '~/utils/i18n';
import { View } from '../View';
import { Text } from '../Text';

interface NoDataProps {
  title?: string;
  description?: string;
}

export default function NoData({ title = '', description = '' }: NoDataProps) {
  return (
    <View className="flex-1 items-center justify-center p-4">
      <View className="w-full max-w-sm items-center rounded-2xl  p-8">
        <View className="mb-4 rounded-full bg-gray-100 p-4">
          <Ionicons name="alert-circle-outline" size={32} className="text-gray-600" />
        </View>
        <Text className="mb-2 text-center text-xl font-bold text-gray-900">{i18n.t(title)}</Text>
        <Text className="text-center text-gray-600">{i18n.t(description)}</Text>
      </View>
    </View>
  );
}

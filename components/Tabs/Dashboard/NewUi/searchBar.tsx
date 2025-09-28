// components/SearchBar.tsx
import { View, TextInput } from 'react-native';

export default function SearchBar() {
  return (
    <View className="mt-4 flex-row items-center rounded-2xl bg-gray-100 px-4 py-3">
      <TextInput placeholder="What are you looking for?" className="ml-2 flex-1 text-gray-700" />
    </View>
  );
}

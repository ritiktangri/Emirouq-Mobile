/* eslint-disable import/order */
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import { logo } from '~/image';
import DefaultTextInput from '../common/DefaultTextInput';
import { View } from '../common/View';
import Render from './render';

const messageData = [
  {
    name: 'Sarah Miller',
    time: '10:32 AM',
    product: 'Vintage Leather Sofa',
    price: '899',
    message: 'Is this still available?',
    unread_count: 2,
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6tWkfCJfejkeaq78A0p6L5CZWFFVwxyz0DA&s', // Replace with actual image path
    productImage: 'https://i.pinimg.com/474x/66/5b/78/665b78810d6885124347a2a28a954ef4.jpg', // Replace with actual image path
  },
  {
    name: 'John Cooper',
    time: 'Yesterday',
    product: 'MacBook Pro 2023',
    price: '1299',
    message: 'Can you do $1200?',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6tWkfCJfejkeaq78A0p6L5CZWFFVwxyz0DA&s', // Replace with actual image path,
    productImage: 'https://i.pinimg.com/474x/66/5b/78/665b78810d6885124347a2a28a954ef4.jpg', // Replace with actual image path
  },
  {
    name: 'Emma Wilson',
    time: 'Yesterday',
    product: 'Dining Table Set',
    price: '450',
    message: 'Great! When can I pick it up?',
    unread_count: 1,
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6tWkfCJfejkeaq78A0p6L5CZWFFVwxyz0DA&s', // Replace with actual image path
    productImage: 'https://i.pinimg.com/474x/66/5b/78/665b78810d6885124347a2a28a954ef4.jpg', // Replace with actual image path
  },
  {
    name: 'David Chen',
    time: 'Wed',
    product: 'Mountain Bike',
    price: '599',
    message: 'Would you consider $550?',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6tWkfCJfejkeaq78A0p6L5CZWFFVwxyz0DA&s', // Replace with actual image path
    productImage: 'https://i.pinimg.com/474x/66/5b/78/665b78810d6885124347a2a28a954ef4.jpg', // Replace with actual image path
  },
  {
    name: 'Lisa Anderson',
    time: 'Tue',
    product: 'iPhone 13 Pro',
    price: '699',
    message: 'Perfect condition, barely used',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6tWkfCJfejkeaq78A0p6L5CZWFFVwxyz0DA&s', // Replace with actual image path
    productImage: 'https://i.pinimg.com/474x/66/5b/78/665b78810d6885124347a2a28a954ef4.jpg', // Replace with actual image path
  },
  {
    name: 'Lisa Anderson1',
    time: 'Tue',
    product: 'iPhone 13 Pro',
    price: '699',
    message: 'Perfect condition, barely used',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6tWkfCJfejkeaq78A0p6L5CZWFFVwxyz0DA&s', // Replace with actual image path
    productImage: 'https://i.pinimg.com/474x/66/5b/78/665b78810d6885124347a2a28a954ef4.jpg', // Replace with actual image path
  },
];

export default function Chat() {
  return (
    <View className="flex-1 bg-white">
      <View className="m-3">
        <DefaultTextInput
          prefix={<Ionicons name="search" size={20} color="#6B7280" />}
          placeholder="Search chats..."
          placeholderTextColor="#9CA3AF"
          containerClassName="  w-full text-base rounded-md bg-textInput_bg p-3 "
        />
      </View>

      <FlatList
        data={messageData}
        keyExtractor={(item) => item?.name?.toString()}
        renderItem={({ item }) => <Render item={item} />}
      />
    </View>
  );
}

import React from 'react';
import { View } from 'react-native';

export default function Line({ className }: any) {
  return <View className={` border-b border-gray-700 py-1 ${className}`} />;
}

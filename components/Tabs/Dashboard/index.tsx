import { View, Text } from 'react-native';
import React from 'react';
import { useCategory } from '~/context/CategoryContext';

const Dashboard = () => {
  const { categories }: any = useCategory();

  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  );
};

export default Dashboard;

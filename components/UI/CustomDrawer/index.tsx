/* eslint-disable import/order */
import React from 'react';
import { FlatList, View, Platform } from 'react-native';
import Header from './header';
import Render from './render';
import sideMenus from '../../../utils/helper/drawer.helper';
import Footer from './footer';

const CustomDrawer = (props: any) => {
  const { state } = props;
  const { routes, index } = state;
  const focusedRoute = routes[index].name;
  return (
    <View className="flex-1 ">
      <FlatList
        data={sideMenus}
        horizontal={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        className=" bg-white dark:bg-dashboard_card"
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }: any) => {
          const isActive = focusedRoute === item?.route;
          return <Render item={item} index={index} isActive={isActive} props={props} />;
        }}
        contentContainerClassName="flex-1 px-4"
        ListHeaderComponentClassName="mb-5 "
        ListHeaderComponentStyle={{
          marginTop: Platform.OS === 'ios' ? 30 : 10,
        }}
        ItemSeparatorComponent={() => <View className="my-1 " />}
        ListHeaderComponent={() => <Header closeDrawer={() => props.navigation.closeDrawer()} />}
        ListFooterComponentClassName="flex-1 flex-end mb-10"
        ListFooterComponent={Footer}
      />
    </View>
  );
};

export default CustomDrawer;

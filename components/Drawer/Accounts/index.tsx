/* eslint-disable import/order */
import { FlatList, RefreshControl } from 'react-native';
import React, { useCallback, useState } from 'react';
import theme from '~/utils/theme';
import { useAuth } from '~/context/AuthContext';
import AddAccount from './AddAccount';
import RenderItem from './render';
import Header from './header';
import Loading from './loading';
import { SafeAreaView } from 'react-native-safe-area-context';

const Accounts = () => {
  const [isModalOpen, setIsModalOpen] = useState({
    open: false,
  });
  const { getUser, loading, activeAccount, checkSubscription, isSubscriptionInActive } = useAuth();
  const isSubInActive = isSubscriptionInActive();
  const renderItem = useCallback(
    ({ item, index }: any) => {
      return loading ? (
        <Loading />
      ) : (
        <RenderItem
          item={item}
          index={index}
          onEdit={(value: any) => {
            if (isSubInActive) {
              return;
            }
            setIsModalOpen({
              open: true,
              ...value,
            });
          }}
        />
      );
    },
    [loading]
  );

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <FlatList
        data={loading ? [{ uuid: 1 }] : activeAccount?.accounts || []}
        refreshControl={
          <RefreshControl
            colors={[theme.colors.primary]}
            refreshing={false}
            onRefresh={getUser}
            tintColor={theme.colors.primary}
          />
        }
        ListHeaderComponentClassName="mb-5"
        ListHeaderComponent={() => (
          <Header
            onPress={() => {
              checkSubscription(
                () => {
                  setIsModalOpen({
                    open: true,
                  });
                },
                () => {}
              );
            }}
          />
        )}
        className="bg-white dark:bg-black"
        contentContainerClassName="gap-y-3 px-4"
        renderItem={renderItem}
        keyExtractor={(item) => item?.uuid?.toString()}
      />
      <AddAccount open={isModalOpen} setOpen={setIsModalOpen} />
    </SafeAreaView>
  );
};

export default Accounts;

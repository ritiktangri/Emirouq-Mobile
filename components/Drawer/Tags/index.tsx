/* eslint-disable import/order */
import { ActionSheetIOS, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import theme from '~/utils/theme';
import AddCategory from './AddCategory';
import Header from './header';
import Loading from './loading';
import { useAuth } from '~/context/AuthContext';
import RenderItem from './RenderItem';
import { useTags } from '~/context/TagsContext';
import AddTag from './AddTag';
import { SafeAreaView } from 'react-native-safe-area-context';
import ConfirmationModal from '~/components/common/ConfirmationModal';
import { FontAwesome6 } from '@expo/vector-icons';
import { useTheme } from '~/context/ThemeContext';

const Tags = () => {
  const [isModalOpen, setIsModalOpen] = useState({
    open: false,
  } as any);
  const { colorScheme }: any = useTheme();
  const { tagList, getCategories, loading, onSave, btnLoading } = useTags();
  const { checkSubscription, isSubscriptionInActive } = useAuth();
  const isSubInActive = isSubscriptionInActive();

  const showIOSDialog = useCallback(
    (value: any) => {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Delete'],
          destructiveButtonIndex: 1,
          cancelButtonIndex: 0,
          userInterfaceStyle: colorScheme,
          title: 'Delete Category',
          message: 'Are you sure you want to delete this category?',
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            onSave(
              {
                id: value?.uuid,
                type: value?.section,
              },
              () => {},
              () => {}
            );
          }
        }
      );
    },
    [colorScheme, onSave]
  );
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
            if (value.type === 'delete' && value.platform === 'ios') {
              return showIOSDialog(value);
            }
            setIsModalOpen({
              open: true,
              ...(value && { ...value }),
            });
          }}
        />
      );
    },
    [loading]
  );

  const renderModal: any = useMemo(() => {
    return {
      category: (
        <AddCategory
          open={isModalOpen}
          setOpen={setIsModalOpen}
          onSave={(payload: any) => {
            onSave(
              {
                body: payload,
                id: payload?.uuid,
                type: isModalOpen?.section,
              },
              () => {
                setIsModalOpen({
                  open: false,
                } as any);
              },
              () => {}
            );
          }}
          loading={btnLoading}
        />
      ),
      tags: (
        <AddTag
          open={isModalOpen}
          setOpen={setIsModalOpen}
          onSave={(payload: any) => {
            onSave(
              {
                body: payload,
                id: payload?.uuid,
                type: isModalOpen?.section,
              },
              () => {
                setIsModalOpen({
                  open: false,
                } as any);
              },
              () => {}
            );
          }}
          loading={btnLoading}
        />
      ),
      delete: (
        <ConfirmationModal
          visible={isModalOpen?.open}
          title={isModalOpen?.section === 'delete-category' ? 'Delete Category?' : 'Delete Tag?'}
          description={`Are you sure you want to delete this ${isModalOpen?.section === 'delete-category' ? 'category' : 'tag'}?`}
          onConfirm={() => {
            onSave(
              {
                id: isModalOpen?.uuid,
                type: isModalOpen?.section,
              },
              () => {
                setIsModalOpen({
                  open: false,
                } as any);
              },
              () => {}
            );
          }}
          onCancel={() => {
            setIsModalOpen({
              open: false,
            } as any);
          }}
          loading={btnLoading}
          icon={
            <TouchableOpacity onPress={() => {}} className="flex flex-row items-center gap-2 p-1">
              <FontAwesome6 name="trash" size={18} color={theme.colors.primary} />
            </TouchableOpacity>
          }
        />
      ),
    };
  }, [isModalOpen, btnLoading, onSave, setIsModalOpen]);
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <FlatList
        data={loading ? [{ uuid: 1 }] : tagList || []}
        refreshControl={
          <RefreshControl
            colors={[theme.colors.primary]}
            refreshing={false}
            onRefresh={getCategories}
            tintColor={theme.colors.primary}
          />
        }
        ListHeaderComponentClassName="mb-5 px-4"
        ListHeaderComponent={() => (
          <Header
            onPress={() => {
              checkSubscription(
                () => {
                  setIsModalOpen({
                    open: true,
                    type: 'category',
                    section: 'add-category',
                  });
                },
                () => {}
              );
            }}
          />
        )}
        className="gap-y-3 bg-white dark:bg-black"
        contentContainerClassName="gap-y-3"
        renderItem={renderItem}
        keyExtractor={(item) => item?.uuid?.toString()}
      />

      {renderModal[isModalOpen?.type]}
    </SafeAreaView>
  );
};

export default Tags;

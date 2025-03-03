/* eslint-disable import/order */
import React, { useCallback } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'nativewind';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { NoTradesSVG } from '~/svgs';
import Loading from '../loading';
import { useSupport } from '~/context/SupportContext';
import Header from '../header';
import { DefaultText as Text } from '~/components/common/DefaultText';
import { cn } from '~/utils/helper.utils';
import dayjs from 'dayjs';
import { getTagsByTitle } from '~/utils/get-tags-by-title';
import { dropdowns } from '~/utils/dropdown';
import { Href, Link } from 'expo-router';
import { routes } from '~/utils/routes';
import { DeleteSVG } from '~/svgs/drawer';

const TicketsTable = () => {
  const {
    supportTickets,
    setStatus,
    supportLoading,
    status,
    deleteSupportTicket,
    type,
    currentPage,
    setCurrentPage,
    total,
    getSupportList,
  }: any = useSupport();
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const renderRow = useCallback(
    ({ item, index }: any) => {
      return (
        <View
          key={item.uuid}
          className={cn(
            'flex-row  gap-4 rounded-lg p-4',
            isDarkMode ? 'bg-gray-800' : 'bg-white',
            index % 2 === 0 ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-50') : ''
          )}>
          <Link href={routes.user.singleSupport(item?.uuid) as Href} asChild>
            <TouchableOpacity className="flex-1 gap-2" onPress={() => {}}>
              <View className={cn('flex-row  gap-4')}>
                <View className="mb-3 flex-1">
                  <Text
                    className={cn(
                      '  font-poppinsMedium text-lg',
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    )}>
                    {item.subject}
                  </Text>
                </View>
                <View>{getTagsByTitle(item.type, '')}</View>
              </View>
              {item?.unSeenRecord?.count ? (
                <Text className=" text-sm font-medium text-primary">
                  {item?.unSeenRecord?.count} new messages
                </Text>
              ) : (
                <></>
              )}
              <Text className="mt-1 font-poppinsMedium text-xs text-gray-300">
                {dayjs.unix(item?.lastMessageTime).format('DD MMM, YYYY HH:mm:ssA')}
              </Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity
            className="rounded-full"
            onPress={() => {
              deleteSupportTicket(item.uuid, status, type);
            }}>
            <DeleteSVG />
          </TouchableOpacity>
        </View>
      );
    },
    [isDarkMode, status, type, deleteSupportTicket, getTagsByTitle]
  );

  const RenderListHeader = useCallback(() => {
    return <Header />;
  }, [status, type, setStatus, dropdowns]);

  const RenderListFooter = useCallback(() => {
    return (
      <>
        <View className="flex flex-1 flex-row items-center justify-between gap-2">
          <TouchableOpacity
            disabled={currentPage === 0}
            onPress={() => {
              const page = currentPage - 1;
              setCurrentPage(page);
              const start = page * 10;
              getSupportList(null, 10, start, '', status, type, false);
            }}
            className={cn(
              currentPage === 0 ? 'opacity-50' : '',
              'rounded-md border-[0.4px] border-gray-400 p-1 dark:border-0 dark:bg-gray-600'
            )}>
            <Ionicons
              name="chevron-back"
              size={24}
              // color={currentPage === 0 ? 'gray' : 'white'}
              className="text-gray dark:text-white"
            />
          </TouchableOpacity>
          <Text className="text-sm dark:text-white">
            Showing {currentPage + 1} of {Math.ceil(total / 10)} pages
          </Text>
          <TouchableOpacity
            disabled={currentPage + 1 >= Math.ceil(total / 10)}
            onPress={() => {
              const page = currentPage + 1;
              setCurrentPage(page);
              const start = page * 10;
              getSupportList(null, 10, start, '', status, type, false);
            }}
            className={cn(
              currentPage + 1 >= Math.ceil(total / 10) ? 'opacity-50' : '',
              'rounded-md border-[0.4px] border-gray-400 p-1 dark:border-0 dark:bg-gray-600'
            )}>
            <Ionicons name="chevron-forward" size={24} className="text-gray dark:text-white" />
          </TouchableOpacity>
        </View>
      </>
    );
  }, [isDarkMode, currentPage, total, status, type, setStatus, getSupportList]);

  return (
    <View className="mx-4 flex-1 rounded-lg  dark:bg-black">
      <View className=" ">
        <FlatList
          ListHeaderComponent={RenderListHeader}
          data={supportLoading ? [] : supportTickets}
          ListFooterComponentClassName="p-4"
          ListFooterComponent={RenderListFooter}
          renderItem={renderRow}
          contentContainerClassName="gap-y-3"
          className="gap-y-2"
          keyExtractor={(item: any) => item.uuid}
          getItemLayout={(_, index) => ({
            length: 100,
            offset: 100 * index,
            index,
          })}
          maxToRenderPerBatch={15}
          ListEmptyComponent={() => {
            return (
              <>
                {supportLoading ? (
                  <View className=" mt-3 min-h-[300px] flex-1 rounded-lg bg-dashboard_card pt-2">
                    <Loading id="recent-trades" />
                  </View>
                ) : supportTickets?.length === 0 ? (
                  <View className="mt-3 min-h-[300px] flex-1 flex-col items-center justify-center gap-2 rounded-lg bg-dashboard_card">
                    <View className="flex items-center justify-center">
                      <NoTradesSVG />
                    </View>
                    <View>
                      <Text className="font-poppinsMedium text-lg dark:text-white">
                        No support tickets found
                      </Text>
                    </View>
                  </View>
                ) : (
                  <></>
                )}
              </>
            );
          }}
          // ItemSeparatorComponent={() => (
          //   <View className={cn('h-0.5', isDarkMode ? 'bg-gray-700' : 'bg-gray-200')} />
          // )}
        />
      </View>
    </View>
  );
};

export default TicketsTable;

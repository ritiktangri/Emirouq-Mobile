/* eslint-disable import/order */
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import CustomBottomSheet from '~/components/CustomBottomSheet';
import { useAuth } from '~/context/AuthContext';
import { useAddComment } from '~/hooks/post/mutation';
import dayjs from 'dayjs';
import { queryClient } from '~/app/_layout';
import { Feather } from '@expo/vector-icons';

const CommentSheet = ({ visible, setVisible, postId, postComments }: any) => {
  const addComment: any = useAddComment();
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();

  const inputRef = useRef(null);

  // useEffect(() => {
  //   if (visible && inputRef.current) {
  //     setTimeout(() => inputRef.current?.focus(), 300);
  //   }
  // }, [visible]);

  const handleSend = useCallback(() => {
    if (!newComment.trim()) return;

    if (newComment && postId) {
      addComment
        ?.mutateAsync({
          pathParams: { postId },
          body: { content: newComment },
        })
        ?.then((res: any) => {
          const newCommentData = {
            ...res?.comment,
            user: {
              firstName: user?.firstName,
              lastName: user?.lastName,
              profileImage: user?.profileImage,
            },
          };

          queryClient.setQueryData(['singlePost', postId], (oldData: any) => {
            if (oldData) {
              return {
                ...oldData,
                data: {
                  ...oldData.data,
                  comments: [newCommentData, ...oldData.data.comments],
                  commentsCount: oldData.data.commentsCount + 1,
                },
              };
            }
            return oldData;
          });
        })
        .catch((err: any) => {})
        ?.finally(() => {});
    }
    setNewComment('');
  }, [newComment, postId, addComment, user]);
  return (
    <CustomBottomSheet
      visible={visible}
      setVisible={setVisible}
      bottomSheetHeight={460}
      showIndicator>
      <View className="flex-1 bg-white px-4 py-6">
        <Text className="mb-3 text-center text-lg font-semibold text-gray-900">Comments</Text>

        {/* <FlatList
          data={postComments || []}
          keyExtractor={(item) => item.uuid}
          showsVerticalScrollIndicator={false}
          className="mb-2"
          ListEmptyComponent={
            <View className="flex h-56 items-center justify-center">
              <Text className="text-lg text-gray-500">No Comments</Text>
            </View>
          }
          renderItem={({ item }) => {
            return (
              <View className="mb-4 flex-row items-start gap-3">
                <Image
                  source={{ uri: item.user?.profileImage }}
                  className="h-10 w-10 rounded-full"
                />
                <View className="flex-1">
                  <View className="flex-row items-center justify-between gap-1">
                    <Text className="text-sm font-medium text-gray-900">
                      {`${item.user?.firstName} ${item.user?.lastName}`}
                    </Text>
                    <Text className="text-xs text-gray-500">{dayjs(item.createdAt).fromNow()}</Text>
                  </View>
                  <Text className="text-sm text-gray-800">{item?.content}</Text>
                </View>
              </View>
            );
          }}
        />

        <View className="flex-row items-center border-t border-gray-200 bg-white py-2">
          <Image source={{ uri: user?.profileImage }} className="mr-2 h-9 w-9 rounded-full" />
          <View className="flex-1 rounded-full bg-gray-100 px-4 py-2">
            <TextInput
              placeholder="Add a comment..."
              className="text-sm text-gray-900"
              placeholderTextColor="#999"
              value={newComment}
              onChangeText={setNewComment}
              multiline
              returnKeyType="send"
              onSubmitEditing={handleSend}
              // ref={inputRef}
            />
          </View>
          <TouchableOpacity onPress={handleSend} className="ml-2 flex-row items-center gap-2">
            {addComment?.isPending ? (
              <ActivityIndicator />
            ) : (
              <Feather name="send" size={24} color="#FF5722" />
            )}
          </TouchableOpacity>
        </View> */}
      </View>
    </CustomBottomSheet>
  );
};

export default CommentSheet;

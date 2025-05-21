/* eslint-disable import/order */
import React, { useCallback, useEffect } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Product from './product';
import {
  handleSeenMessage,
  saveMessageCache,
  useGetConversations,
  useGetMessages,
} from '~/hooks/chats/query';
import Header from './header';
import { useAuth } from '~/context/AuthContext';
import { useCreateConversation, useUploadFile } from '~/hooks/chats/mutation';
import { queryClient } from '~/app/_layout';
import Chat from './chat';
import { v4 as uuidV4 } from 'uuid';
import ChatBubbleSkeleton from './loading';
import DownloadFile from './download';
import VideoPlayer from './videoPlayer';
import { useColorScheme } from '~/lib/useColorScheme';
import Footer from './footer';
import { View } from '~/components/common/View';
import AudioRecorder from './audioRecord';

const ChatScreen = () => {
  const params: any = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { socketIo, user, onlineUsers } = useAuth();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching }: any = useGetMessages(
    params?.conversationId
  );
  const { refetch: conversationRefetch }: any = useGetConversations('', false);
  const createConversation = useCreateConversation();
  const uploadFile = useUploadFile();
  const router = useRouter();
  //here we are updating the seen message in the cache
  useEffect(() => {
    if (socketIo?.connected && params?.conversationId) {
      socketIo.emit('seen_message', {
        userId: user?.uuid,
        receiverId: params?.receiverId,
        conversationId: params?.conversationId,
      });
      handleSeenMessage({
        conversationId: params?.conversationId,
        seenBy: [user?.uuid, params?.receiverId],
      });
    }
    return () => {
      socketIo?.off('seen_message');
    };
  }, [socketIo, params?.conversationId, params?.receiverId, user?.uuid]);
  const sendMessage = useCallback(
    async ({ message, attachments }: any, cb: any) => {
      const uuid = uuidV4();
      if (attachments?.length) {
        //this is required to save the file locally
        // since if i fetch the url from res, it will take time
        // const localFiles = await saveFileLocally(attachments);
        // saveMessageCache({
        //   uuid: generateUUID(20),
        //   user: user?.uuid,
        //   conversationId: params?.conversationId,
        //   attachments: localFiles,
        // });
        cb();
        const formdata: any = new FormData();
        attachments.forEach((attachment: any) => {
          formdata.append('image', {
            uri: attachment?.uri,
            name: attachment?.fileName,
            type: attachment?.type,
          });
        });
        uploadFile
          .mutateAsync({
            body: formdata,
            pathParams: {
              conversationId: params?.conversationId,
            },
          })
          .then((res: any) => {
            saveMessageCache({
              uuid,
              user: user?.uuid,
              conversationId: params?.conversationId,
              attachments: res?.attachments,
              createdAt: new Date(),
            });
            socketIo?.emit('message', {
              uuid,
              conversationId: params?.conversationId,
              senderId: user?.uuid,
              // this is to check if the user is the sender or receiver
              receiverId: params?.receiverId,
              type: 'image',
              attachments: res?.attachments,
            });
          });
      }
      if (message) {
        //save the message to the cache
        saveMessageCache({
          uuid,
          message,
          user: user?.uuid,
          conversationId: params?.conversationId,
          createdAt: new Date(),
        });

        socketIo?.emit('message', {
          uuid,
          post: JSON.parse(params?.post),
          conversationId: params?.conversationId,
          message,
          senderId: user?.uuid,
          // this is to check if the user is the sender or receiver
          receiverId: params?.receiverId,
        });
        cb();
      }
    },
    [params?.conversationId, params?.post, params?.receiverId, socketIo, user?.uuid]
  );

  const checkConversation = async () => {
    if (params?.conversationId) {
      return;
    }
    try {
      // Check if the conversation already exists
      const res: any = await createConversation.mutateAsync({
        body: {
          users: [params?.receiverId, user?.uuid],
          postId: params?.postId,
        },
      });
      if (!res?.isExist) {
        router.setParams({
          conversationId: res?.data?.uuid,
        });

        // refetch the conversation
        conversationRefetch();
        // this is to update the conversationId in the params
        // as well as the queryClient

        queryClient.setQueryData(['singlePost', params?.postId], (oldData: any) => {
          if (oldData) {
            return {
              ...oldData,
              conversationId: res?.data?.uuid,
            };
          }
          return oldData;
        });
      }
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };
  useEffect(() => {
    checkConversation();
  }, [params?.conversationId, params?.postId, params?.receiverId, user?.uuid]); // Correct dependency array

  useEffect(() => {
    if (socketIo?.connected && params?.conversationId && user?.uuid) {
      socketIo.emit('join_conversation', {
        userId: user?.uuid,
        conversationId: params?.conversationId,
      });
    }

    return () => {
      if (socketIo?.connected) socketIo?.off('join_conversation');
    };
  }, [socketIo, params?.conversationId, user?.uuid]);

  return (
    <View
      className="flex-1 bg-white "
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <Header data={params} status={onlineUsers?.includes(params?.receiverId)} />
      <Product product={params?.uuid ? params : {}} />
      <AudioRecorder />
      {/* <DownloadFile /> */}
      {/* <VideoPlayer source="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" /> */}

      {createConversation?.isPending || isFetching ? (
        [1, 2, 3].map((item) => <ChatBubbleSkeleton numberOfMessages={19} key={item} />)
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          className="flex-1"
          keyboardVerticalOffset={Platform.OS === 'ios' ? insets.bottom : 0}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Chat
              data={data?.pages.map((page: any) => page?.data).flat()}
              sendMessage={sendMessage}
              isFetching={isFetching}
              uploadFileLoading={uploadFile?.isPending}
              usersInConversation={params?.usersInConversation?.split(',')}
              onEndReached={() => {
                // if (hasNextPage && !isFetchingNextPage) {
                //   fetchNextPage();
                // }
              }}
            />
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

export default ChatScreen;

/* eslint-disable import/order */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { cn } from '~/utils/helper';
import { useLocalSearchParams } from 'expo-router';
import Product from './product';
import DefaultTextInput from '~/components/common/DefaultTextInput';
import { useConversation } from '~/context/ConversationContext';

const ChatScreen = () => {
  const params: any = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [newMessage, setNewMessage] = useState('');
  const flatListRef: any = useRef(null);
  const [loading, setLoading] = useState(true);
  const { getMessageHandler, messages } = useConversation();

  const sendMessage = () => {};
  useEffect(() => {
    if (params?.conversationId) {
      setLoading(true);
      getMessageHandler(params?.conversationId, 0, 10, () => {
        setLoading(false);
      });
    }
  }, [params?.conversationId]);
  const renderItem = useCallback(
    ({ item }: any) => (
      <View
        className={`mb-2 max-w-[70%] rounded-lg px-3 py-2 ${
          item.sender === 'user' ? 'self-end bg-primary' : 'self-start bg-gray-200'
        }`}>
        <Text
          className={cn(
            item.sender === 'user' ? 'text-right text-white' : 'text-left',
            'text-base'
          )}>
          {item.text}
        </Text>
      </View>
    ),
    []
  );
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Product product={params?.uuid ? params : {}} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? insets.bottom : 0}>
        <View className="flex-1">
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item: any) => item?.uuid?.toString()}
            inverted
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 16,
              flexGrow: 1,
              justifyContent: 'flex-end',
            }}
            onContentSizeChange={() => {
              if (flatListRef.current) {
                flatListRef.current.scrollToOffset({ offset: 0, animated: true });
              }
            }}
            onLayout={() => {
              if (flatListRef.current) {
                flatListRef.current.scrollToOffset({ offset: 0, animated: true });
              }
            }}
          />

          <View className="flex-row items-center  border-t border-gray-200 px-4 py-4" style={{}}>
            <TouchableOpacity>
              <Entypo name="attachment" size={24} color="black" />
            </TouchableOpacity>
            <DefaultTextInput
              className="w-full rounded-2xl bg-[#F0F0F0] px-3 py-4"
              containerClassName="mr-2 max-h-24 flex-1 text-black rounded-full bg-white px-4 py-2 text-base"
              placeholder="Type a message..."
              value={newMessage}
              onChangeText={setNewMessage}
              multiline
              returnKeyType="send"
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity
              className="h-12 w-12 items-center justify-center rounded-full "
              onPress={sendMessage}>
              <Ionicons name="send" size={30} className="!text-primary" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

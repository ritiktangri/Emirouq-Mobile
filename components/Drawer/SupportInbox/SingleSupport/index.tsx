/* eslint-disable import/order */
import { SafeAreaView, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useCallback, useEffect, useRef } from 'react'; // Import useState
import { useSupport } from '~/context/SupportContext';
import { useLocalSearchParams } from 'expo-router';
import Header from './header';
import Timeline from './render';
import Footer from './footer';
import Loading from './loading';

const SingleSupport = () => {
  const { getActivityList, activityList, singleSupportLoading, readTicket }: any = useSupport();
  const flatListRef = useRef<FlatList>(null);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    getActivityList({ supportId: id });
    readTicket({
      supportId: id,
    });
  }, [id]);

  // Function to scroll to the bottom of the FlatList
  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true }); // Scroll to top when inverted
    }
  };

  useEffect(() => {
    // Scroll to bottom on initial load and data update
    if (!singleSupportLoading) {
      scrollToBottom();
    }
  }, [singleSupportLoading]);
  // Function to render the header.  Needs to return a React component.
  const RenderHeader = useCallback(() => <Header id={id} />, [id]);

  return (
    <SafeAreaView className="flex-1 bg-black">
      {singleSupportLoading ? (
        <Loading />
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
          className="flex-1" // Add flex-1 to ensure the KeyboardAvoidingView takes up available space.
        >
          <RenderHeader />
          <FlatList
            ref={flatListRef}
            showsVerticalScrollIndicator={false}
            // stickyHeaderIndices={[0]} // Ensure header sticks on top
            ListHeaderComponentStyle={{ zIndex: 10 }} // Ensure header sticks on top
            data={activityList?.activity}
            inverted
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponentClassName="mb-4"
            renderItem={({ item }) => <Timeline item={item} />}
            // ListFooterComponent={activityList?.status === 'closed' ? <></> : Footer}
            contentContainerStyle={{ flexDirection: 'column-reverse', flexGrow: 1 }} // Ensure the FlatList content fills the space and is rendered from the bottom.
          />
          {activityList?.status === 'closed' ? null : <Footer />}
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default SingleSupport;

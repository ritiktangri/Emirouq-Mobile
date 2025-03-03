import { View, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import React from 'react';
// import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { Ionicons } from '@expo/vector-icons';
import { DefaultText as Text } from '~/components/common/DefaultText';

const NotesView = ({ data }: any) => {
  const richText: any = React.useRef();
  const handleHead = ({ tintColor }: any) => <Text style={{ color: tintColor }}>H1</Text>;
  const _editor: any = React.createRef();
  return (
    // <View>
    //   <View className="mx-2 rounded-xl border border-gray-700">
    //     <RichToolbar
    //       editor={richText}
    //       actions={[
    //         actions.setBold,
    //         actions.setItalic,
    //         actions.setUnderline,
    //         actions.heading1,
    //         actions.insertBulletsList,
    //         actions.insertOrderedList,
    //         actions.insertLink,
    //         actions.keyboard,
    //         actions.checkboxList,
    //         actions.setStrikethrough,
    //         actions.undo,
    //         actions.redo,
    //       ]}
    //       iconMap={{ [actions.heading1]: handleHead }}
    //       selectedIconTint="#0A84FF"
    //       iconTint="gray"
    //       style={{
    //         backgroundColor: '#161A1F',
    //         borderTopLeftRadius: 12,
    //         borderTopRightRadius: 12,
    //       }}
    //     />
    //     <ScrollView>
    //       <KeyboardAvoidingView
    //         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    //         style={{ flex: 1 }}>
    //         <RichEditor
    //           ref={richText}
    //           onChange={(descriptionText) => {}}
    //           containerStyle={{
    //             flex: 1,
    //             backgroundColor: '#060A10',
    //             height: '30%',
    //           }}
    //           style={{
    //             flex: 1,
    //             backgroundColor: '#060A10',
    //             padding: 10,
    //             borderBottomRightRadius: 12,
    //             borderBottomLeftRadius: 12,
    //           }}
    //           editorStyle={{
    //             backgroundColor: '#060A10',
    //             color: '#ffffff',
    //           }}
    //           contentInset={{ top: 10, bottom: 10 }}
    //         />
    //       </KeyboardAvoidingView>
    //     </ScrollView>
    //   </View>
    //   {/* <View className="mx-2 rounded-xl border border-gray-700">
    //     <QuillToolbar editor={_editor} options="full" theme="dark" />
    //     <QuillEditor
    //       style={{
    //         flex: 1,
    //         backgroundColor: 'black',
    //         minHeight: 100,
    //         maxHeight: 500,
    //         borderBottomLeftRadius: 6,
    //         borderBottomRightRadius: 6,
    //         // borderRadius: 6,
    //       }}
    //       // quill={{
    //       //   placeholder: 'Enter your notes...',
    //       // }}
    //       initialHtml={`
    //         <div style="background-color: #2D2D2D; color: white; font-size: 16px; min-height: 100px;">
    //           <p></p>
    //         </div>
    //       `}
    //     />
    //   </View> */}
    //   <View className="mx-2 mt-3 flex-row justify-end gap-3">
    //     <TouchableOpacity className="flex-row items-center rounded-lg bg-primary px-4 py-3 text-center">
    //       <Ionicons name="attach" size={18} color="white" />
    //       <Text className="font-interMedium text-white">Attach Media</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity className="rounded-lg bg-[#1F242F] px-4 py-3 text-center">
    //       <Text className="font-interMedium text-white dark:text-tertiary">Save</Text>
    //     </TouchableOpacity>
    //   </View>
    // </View>
    <></>
  );
};

export default NotesView;

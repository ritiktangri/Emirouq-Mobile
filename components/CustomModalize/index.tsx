import React, { useEffect, useState, forwardRef } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { DefaultText as Text } from '~/components/common/DefaultText';
import { Modalize as Modal } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { Ionicons } from '@expo/vector-icons';

interface Item {
  id: string;
  heading: string;
  data: { id: string; value: string; label: string }[];
}

interface ModalizeProps {
  onSelect: (value: string) => void;
  text: string;
  data: Item[];
  isExpanded?: string | null;
  value?: any;
  icon?: any;
  onClose?: () => void;
  footer?: any;
  isCalendar?: boolean;
  title: string;
}

export interface Handlers {
  open: () => void;
  close: () => void;
}

const CustomModalize = forwardRef<Handlers, ModalizeProps>(
  (
    {
      onSelect,
      icon,
      data,
      title,
      isExpanded = null,
      value = '',
      onClose,
      footer,
      isCalendar = false,
    },
    ref
  ) => {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    // since if the isExpanded value is coming from the parent component, we need to update the expandedId when the value changes
    useEffect(() => {
      if (isExpanded) {
        setExpandedId(isExpanded);
      }
    }, [isExpanded]);

    //since the value is coming from the parent component, we need to update the selected item when the value changes
    useEffect(() => {
      if (value) {
        setSelectedItem(value);
      }
    }, [value]);

    const handleSelect = (value: string) => {
      onSelect(value);
      setSelectedItem(value);
      isExpanded && onClose?.();
    };

    const toggleSection = (id: string) => {
      setExpandedId(expandedId === id ? null : id);
    };

    const close = () => {
      onClose?.();
    };

    return (
      <View className="flex-1 items-center justify-center">
        {icon && icon}
        <Portal>
          <Modal
            ref={ref}
            modalHeight={400}
            // adjustToContentHeight
            // snapPoint={300}
            handlePosition="outside"
            // overlayStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            modalStyle={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            flatListProps={{
              showsVerticalScrollIndicator: false,
              data,
              keyExtractor: (item) => item.id,
              ListHeaderComponent: () => (
                <>
                  <View className=" flex-row items-center justify-between px-5 py-2">
                    <Text className="text-xl font-bold text-white">{title}</Text>
                    <TouchableOpacity onPress={close} className="p-2">
                      <Ionicons name="close" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                  <View className="my-2 border-b border-gray-600 " />
                </>
              ),
              className: 'bg-drawer pb-10',
              ListHeaderComponentClassName: 'bg-drawer',
              renderItem: ({ item }) => {
                return (
                  <View className="bg-drawer px-5 ">
                    <TouchableOpacity
                      className="my-2 flex-row items-center justify-between"
                      onPress={() => toggleSection(item.id)}>
                      <Text className="flex-1  text-base text-white">{item.heading}</Text>
                      <Ionicons
                        name={expandedId === item.id ? 'chevron-up' : 'chevron-down'}
                        size={20}
                        color="white"
                      />
                    </TouchableOpacity>
                    {expandedId === item.id &&
                      item?.data?.map((subItem: any) => (
                        <View key={subItem.id} className="ml-4">
                          <TouchableOpacity
                            className={`flex-row justify-between rounded-lg p-3 font-poppinsMedium ${
                              selectedItem === subItem.value ? 'bg-[#131B24]' : ''
                            }`}
                            onPress={() => handleSelect(subItem.value)}>
                            <Text className="font-poppinsMedium text-sm text-white">
                              {subItem.label}
                            </Text>
                            {selectedItem === subItem.value && (
                              <Ionicons name="checkmark" size={20} color="#3498db" />
                            )}
                          </TouchableOpacity>
                        </View>
                      ))}

                    <View className="my-2 border-b border-gray-600" />
                  </View>
                );
              },
              ListFooterComponent: footer,
            }}
          />
        </Portal>
      </View>
    );
  }
);

export default CustomModalize;

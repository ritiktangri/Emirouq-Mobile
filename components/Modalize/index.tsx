/* eslint-disable import/order */
import React, { useEffect, useState, forwardRef, useCallback, useMemo } from 'react';
import { Platform, View } from 'react-native';
import { Modalize as Modal } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import RenderItem from './render-item';
import Header from './header';
import { useTheme } from '~/context/ThemeContext';
import { cn } from '~/utils/helper';

interface Item {
  id: string;
  heading: string;
  data: { id: string; value: string; label: string }[];
}

interface ModalizeProps {
  onSelect: (key: string, value: string) => void;
  text: string;
  data: Item[];
  isExpanded?: string | null;
  value?: any;
  icon?: any;
  onClose?: () => void;
  footer?: any;
  showDatePicker?: boolean;
  title: string;
  modalTopOffset?: number;
  isSearch?: boolean;
  setKeyword?: any;
  keyword?: string;
  filters?: any;
}

export interface Handlers {
  open: () => void;
  close: () => void;
}

const Modalize = forwardRef<Handlers, ModalizeProps>(
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
      isSearch = false,
      setKeyword = () => {},
      keyword = '',
      modalTopOffset = 0,
      filters,
    },
    ref
  ) => {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    useEffect(() => {
      if (isExpanded) {
        setExpandedId(isExpanded);
      }
    }, [isExpanded]);

    const handleSelect = useCallback(
      (key: string, value: string) => {
        onSelect(key, value);
        // setExpandedId(null);
        isExpanded && onClose?.();
      },
      [onSelect, onClose, isExpanded]
    );

    const toggleSection = useCallback(
      (id: string) => {
        setExpandedId(expandedId === id ? null : id);
      },
      [expandedId]
    );

    // Memoize the filtered data based on the keyword from props
    const filteredData = useMemo(() => {
      if (!keyword) {
        return data;
      }

      return data
        .map((item) => ({
          ...item,
          data: item.data.filter((subItem) =>
            subItem.value.toLowerCase().includes(keyword.toLowerCase())
          ),
        }))
        .filter((item) => item.data.length > 0);
    }, [data, keyword]);

    // Now renderItem simply returns the memoized ItemComponent
    const renderItem = useCallback(
      ({ item }: any) => (
        <RenderItem
          key={item.id}
          item={item}
          expandedId={expandedId}
          handleSelect={handleSelect}
          toggleSection={toggleSection}
        />
      ),
      [expandedId, handleSelect, toggleSection]
    );
    return (
      <View className="">
        {icon && icon}
        <Portal>
          <Modal
            ref={ref}
            adjustToContentHeight
            handlePosition="outside"
            modalStyle={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            modalTopOffset={modalTopOffset}
            avoidKeyboardLikeIOS={Platform.OS === 'ios'}
            flatListProps={{
              showsVerticalScrollIndicator: false,
              keyboardShouldPersistTaps: 'handled',
              ListFooterComponent: footer,
              ListHeaderComponentClassName: 'dark:bg-drawer bg-white',
              stickyHeaderIndices: [0],
              ListHeaderComponent: (
                <Header
                  title={title}
                  isSearch={isSearch}
                  setSearch={setKeyword}
                  onClose={onClose}
                />
              ),
              keyExtractor: (item: any) => item.id,
              data: filteredData,
              className: cn('dark:bg-drawer bg-white', 'pb-14'),
              renderItem,
            }}
          />
        </Portal>
      </View>
    );
  }
);

export default Modalize;

import { AntDesign } from '@expo/vector-icons';
import { usePathname } from 'expo-router';
import React, { useState } from 'react';
import { Animated, TouchableOpacity } from 'react-native';

import { useAuth } from '~/context/AuthContext';
import { useTheme } from '~/context/ThemeContext';
import { useUpdateFavourite } from '~/hooks/post/mutation';
import { useGetFavouritePosts } from '~/hooks/post/query';

const AddToFavourite = ({ item }: any) => {
  const { user, getUser, city } = useAuth();
  const pathname = usePathname();
  const updateFavouriteStatus: any = useUpdateFavourite();
  const [isFavourited, setIsFavourited] = useState(user?.favourites?.includes(item?.uuid));
  const { showToast }: any = useTheme();
  const [scale] = useState(new Animated.Value(1));
  const { refetch }: any = useGetFavouritePosts(city);
  const toggleFavourite = async () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.08,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setIsFavourited(!isFavourited);

    try {
      updateFavouriteStatus
        ?.mutateAsync({ pathParams: { id: item?.uuid } })
        ?.then(() => {
          showToast('Favourites updated!', 'success');
          getUser();
          if (pathname === '/favourites/page') {
            refetch();
          }
        })
        ?.catch(() => {
          setIsFavourited(false);
        });
    } catch {
      setIsFavourited(false);
    }
  };
  return (
    <Animated.View
      className="absolute right-2 top-2"
      style={{
        zIndex: 50,
        elevation: 50,
      }}>
      <TouchableOpacity
        className="h-10 w-10 items-center justify-center rounded-full bg-white p-2"
        onPress={(e) => {
          e.stopPropagation();
          if (user?.uuid) {
            toggleFavourite();
          } else {
            showToast('Login to add item to favourites!', 'error');
          }
        }}>
        <AntDesign
          name={isFavourited ? 'heart' : 'hearto'}
          size={20}
          color={isFavourited ? 'red' : 'black'}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default AddToFavourite;

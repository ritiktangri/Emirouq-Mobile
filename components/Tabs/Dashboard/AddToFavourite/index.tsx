import { TouchableOpacity, Animated } from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '~/context/AuthContext';
import { useUpdateFavourite } from '~/hooks/post/mutation';
import { useTheme } from '~/context/ThemeContext';
import { useGetFavouritePosts } from '~/hooks/post/query';
import { usePathname } from 'expo-router';

const AddToFavourite = ({ item }: any) => {
  const { user, getUser } = useAuth();
  const pathname = usePathname();
  const updateFavouriteStatus: any = useUpdateFavourite();
  const [isFavourited, setIsFavourited] = useState(user?.favourites?.includes(item?.uuid));
  const { showToast }: any = useTheme();
  const [scale] = useState(new Animated.Value(1));
  const { refetch }: any = useGetFavouritePosts();
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
        ?.then((res: any) => {
          showToast('Favourites updated!', 'success');
          getUser();
          if (pathname == '/favourites/page') {
            refetch();
          }
        })
        ?.catch((err: any) => {
          if (err) {
            setIsFavourited(false);
          }
        });
    } catch (err) {}
  };
  return (
    <Animated.View className="absolute right-2 top-2">
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

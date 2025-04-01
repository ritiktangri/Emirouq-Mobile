import { Image, Text, View } from 'react-native';
import { cn } from '~/utils/helper.utils';

export default function Page() {
  // const colorScheme: any = useColorScheme();
  return (
    <View className={cn('flex-1 bg-default_light_bg dark:bg-black')}>
      <View className="flex h-full items-center justify-center opacity-20">
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-eQoG38HLOi0TVKxBAcklr18Pl10mO8ydcAMe6hI8RsY_FiE6HNAe3kTi3xiSJsaoC8A&usqp=CAU',
          }}
          className={`h-64 w-64 object-contain`}
          resizeMode="contain"
        />
      </View>
      {/* <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />
        <View className="z-1 absolute left-0 right-0 top-0 mt-10 flex h-full w-full items-center">
          <Image
            source={background_logo}
            className={`h-64  w-64 object-contain ${Platform.OS === 'ios' ? 'opacity-90 dark:opacity-15' : 'opacity-20'}`}
            resizeMode="contain"
          />
        </View>
        <View className="z-2 flex-1">
          <Portfolio />
        </View> */}
    </View>
  );
}

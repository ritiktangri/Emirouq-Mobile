import React from 'react';
import { View, Image, ImageBackground } from 'react-native';

const SplashScreen = () => {
  return (
    <View className="flex-1 flex-col">
      <ImageBackground
        className="flex-1 flex-col justify-center"
        source={require('../../assets/splash/splash-background-image.png')}>
        <Image
          source={require('../../assets/logo/Emi-logo.png')}
          className="h-[20%] w-full"
          resizeMode="contain"
        />
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;

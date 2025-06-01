import LottieView from 'lottie-react-native';
import { useEffect, useRef } from 'react';
import { View } from '../common/View';

export default function LottieFilesAnimation({
  source,
  play = false,
  className,
  autoPlay = false,
}: any) {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (play) {
      animationRef.current?.play();
    } else {
      animationRef.current?.pause();
    }

    // Optional cleanup
    return () => {
      animationRef.current?.reset();
    };
  }, [play]);

  return (
    <View className={className}>
      <LottieView
        ref={animationRef}
        loop={play}
        autoPlay={autoPlay}
        style={{
          width: '100%',
          height: '100%',
        }}
        source={source}
        onAnimationFinish={() => {
          // Avoid restarting the animation unnecessarily
        }}
        onLayout={() => {}}
        resizeMode="cover"
      />
    </View>
  );
}

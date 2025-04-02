import React from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { Href, Link, useRouter } from 'expo-router';
import { useTheme } from '~/context/ThemeContext';
import { Text } from '~/components/common/Text';

interface DynamicButtonProps {
  href?: Href;
  onPress?: () => void;
  title: any;
  isLoading?: boolean; // New prop for loading state
  className?: string; // Allow custom className
  titleClassName?: string; // Allow custom className for title
}

const DynamicButton: React.FC<DynamicButtonProps> = ({
  href,
  onPress,
  title,
  isLoading = false,
  className = '',
  titleClassName = '',
}) => {
  const { colors } = useTheme();
  const router = useRouter();

  const handlePress = () => {
    if (!isLoading && onPress) {
      onPress();
    } else if (!isLoading && href) {
      router.push(href);
    }
  };

  const buttonClassName = `flex flex-row items-center justify-center gap-2 rounded-lg py-3 ${className}`; // Base styles with custom className
  const textClassName = `font-interMedium text-center text-lg font-semibold`;
  return (
    <>
      {href && !onPress ? (
        <Link href={href} asChild>
          <TouchableOpacity onPress={handlePress} disabled={isLoading}>
            <Text className={`${textClassName} text-[${colors.text}] ${titleClassName} `}>
              {title}
            </Text>
          </TouchableOpacity>
        </Link>
      ) : (
        <TouchableOpacity
          onPress={handlePress}
          disabled={isLoading}
          style={{ backgroundColor: colors?.primary }}
          className={buttonClassName}>
          {isLoading ? <ActivityIndicator color={colors?.text} size="small" /> : <></>}
          <Text className={`${textClassName} text-[${colors?.text}] ${titleClassName} `}>
            {title}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default DynamicButton;

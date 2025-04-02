import { View } from 'react-native';
import { DefaultText as Text } from '~/components/common/DefaultText';
import { cn } from './helper';

export const getTagsByTitle = (type: string, className: any) => {
  switch (type) {
    case 'feature-request':
      return <Tag title="Feature Request" bg="#00A2512E" main="#48D08C" className={className} />;
    case 'bug':
      return <Tag title="Bug" bg="#8D272B4B" main="#FF0000" className={className} />;
    case 'feedback':
      return <Tag title="Feedback" bg="#D92D202E" main="#F96C62" className={className} />;
    case 'suggestion':
      return <Tag title="Suggestion" bg="#E9690C2E" main="#FF9040" className={className} />;
    case 'win':
      return <Tag title="Win" bg="#00A2512E" main="#48D08C" className={className} />;
    case 'lose':
      return <Tag title="Lose" bg="#D92D202E" main="#F96C62" className={className} />;
    default:
      return;
  }
};

const Tag = ({ title, bg, main, className = 'text-xs' }: any) => {
  return (
    <View
      style={{
        backgroundColor: bg,
        borderRadius: 10,
      }}>
      <Text
        className={cn('rounded-xl px-3 py-1', className)}
        style={{
          color: main,
          fontWeight: '500',
        }}>
        {title}
      </Text>
    </View>
  );
};

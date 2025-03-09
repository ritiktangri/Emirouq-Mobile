import { Button, Text, View } from 'react-native';
import Profile from '~/components/Tabs/Profile';
import { useAuth } from '~/context/AuthContext';
import { cn } from '~/utils/helper.utils';

export default function Page() {
  const { logout } = useAuth();
  return (
    <View className={cn('flex-1 bg-default_light_bg dark:bg-black')}>
      <Profile />
      <Button title="Log out" onPress={logout} />
    </View>
  );
}

import { Button, Text, View } from 'react-native';
import Profile from '~/components/Tabs/Profile';
import { useAuth } from '~/context/AuthContext';
import { cn } from '~/utils/helper.utils';

export default function Page() {
  return <Profile />;
}

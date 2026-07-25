import { useLocalSearchParams } from 'expo-router';

import Profile from '~/components/Tabs/Profile';

export default function Page() {
  const { tab }: any = useLocalSearchParams();

  return <Profile initialTab={tab} />;
}

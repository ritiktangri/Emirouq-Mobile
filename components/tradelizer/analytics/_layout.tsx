import Drawer from 'expo-router/drawer';

import FilterDrawer from '~/components/Tabs/Analytics/drawer';
import { ReportProvider } from '~/context/ReportContext';
import theme from '~/utils/theme';

const _layout = () => {
  return (
    <ReportProvider>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerType: 'front', // Important for overlay effect
          drawerPosition: 'right',
          overlayColor: 'rgba(0, 0, 0, 0.7)',
          drawerStyle: {
            backgroundColor: theme.colors.drawer,
          },
        }}
        drawerContent={(props) => <FilterDrawer {...props} />}>
        <Drawer.Screen
          name="page"
          options={{
            headerTitle: 'Tabs',
            drawerLabel: 'Tabs',
          }}
        />
      </Drawer>
    </ReportProvider>
  );
};

export default _layout;

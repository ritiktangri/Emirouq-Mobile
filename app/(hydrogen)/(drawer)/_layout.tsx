/* eslint-disable import/order */
import { Drawer } from 'expo-router/drawer';
import { StyleSheet } from 'react-native';
import CustomDrawer from '~/components/UI/CustomDrawer';
import theme from '~/utils/theme';

const DrawerLayout = () => (
  <Drawer
    screenOptions={{
      drawerStyle: styles.drawerStyles,
      headerShown: false,
      drawerType: 'front',
    }}
    drawerContent={(props) => <CustomDrawer {...props} />}
  />
);

export default DrawerLayout;

const styles = StyleSheet.create({
  drawerStyles: {
    flex: 1,
    width: '80%',
    backgroundColor: theme.colors.backgroundPrimary,
  },
});

/* eslint-disable import/order */
import {
  AccountSettingSVG,
  CalculatorSVG,
  DarkModeSVG,
  HelpSVG,
  LogoutSVG,
  ProfileSVG,
  TagSVG,
} from '~/svgs/drawer';
import { routes } from '../routes';

const sideMenus = [
  {
    id: 1,
    name: 'My Profile',
    icon: (payload: any) => <ProfileSVG />,
    routes: routes.user.settings,
  },

  {
    id: 2,
    name: 'Account Settings',
    icon: (payload: any) => <AccountSettingSVG />,
    routes: routes.user.account_settings,
  },

  {
    id: 3,
    name: 'Position Calculator',
    icon: (payload: any) => <CalculatorSVG />,
    routes: routes.user.position_calculator,
  },

  {
    id: 3,
    name: 'Tags',
    icon: (payload: any) => <TagSVG />,
    routes: routes.user.tags,
  },
  {
    id: 4,
    name: 'Dark Mode',
    icon: (payload: any) => <DarkModeSVG />,
    routes: '',
  },

  {
    id: 5,
    name: 'Help & Support',
    icon: (payload: any) => <HelpSVG />,
    routes: routes.user.support_inbox,
  },
  {
    id: 6,
    name: 'Sign Out',
    icon: () => <LogoutSVG />,
    routes: routes.auth.login,
  },
];

export default sideMenus;

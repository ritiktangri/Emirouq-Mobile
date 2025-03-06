export const routes = {
  auth: {
    auth: '/(auth)/auth',
    register: '/(auth)/register',
    forgot_pwd: '/(auth)/forgot-password',
    verifyOtp: '/(auth)/verify-otp',
    onboard: '/(auth)/onboard',
    update_password: '/(auth)/update-password',
  },
  user: {
    profile: '/(hydrogen)/(profile)',
    account_settings: '/(hydrogen)/(accounts)',
    settings: '/(hydrogen)/(settings)',
    security: '/(hydrogen)/(security)',
    timezone: '/(hydrogen)/(timezone)',
    position_calculator: '/(hydrogen)/(position-calculator)',
    support_inbox: '/(hydrogen)/(support-inbox)',
    singleSupport: (id: string) => `/(hydrogen)/(support-inbox)/details/${id}`,
    tags: '/(hydrogen)/(tags)',
    add_trade: '/(hydrogen)/(add-trade)',
  },
  drawer: {
    drawer: '/(drawer)',
    tabs: {
      tabs: '/(drawer)/(tabs)',
      portfolio: '/(drawer)/(tabs)/portfolio',
      trades: '/(drawer)/(tabs)/trades',
      singleTrade: (id: string) => `/(drawer)/(tabs)/trades/${id}`,
      analytics: '/(drawer)/(tabs)/analytics',
      settings: '/(drawer)/(tabs)/settings',
    },
  },
};

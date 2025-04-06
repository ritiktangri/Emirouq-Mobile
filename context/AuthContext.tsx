/* eslint-disable import/order */
/* eslint-disable import/first */
interface SignUpInterface {
  body: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  };
}
interface VerifyInterface {
  pathParams: {
    token: string;
  };
}
import { useRouter } from 'expo-router';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { socketHostname } from '~/utils/callApis/apiUtils';
import { routes } from '~/utils/routes';
import {
  forgotPasswordService,
  login,
  register,
  setupPassword,
  resetPassword,
  verifyOtp,
  verifyToken,
} from '~/utils/services/auth';
import { unSeenCountService } from '~/utils/services/dashboard';
import { getCurrentUser, resetPasswordService, updateProfileService } from '~/utils/services/user';
import {
  getStorageItemAsync,
  removeStorageItemAsync,
  setStorageItemAsync,
} from '~/hooks/useStorageState';
import { createAccountService, updateAccountService } from '~/utils/services/account';
import { io } from 'socket.io-client';

const storageTokenKeyName = 'accessToken';

// ** Defaults
const defaultProvider = {
  user: null as any,
  loading: true,
  forgotLoading: false,
  signInLoading: false,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  verify: () => Promise.resolve(),
  createPassword: () => Promise.resolve(),
  forgotPassword: () => Promise.resolve(),
  resetPass: () => Promise.resolve(),
  setForgotLoading: () => Boolean,
  setSelectedSideBar: () => null,
  selectedSideBar: 'dashboard',
  setSignInLoading: () => Boolean,
  getSelectedSideBar: () => null,
  setActiveAccount: () => null,
  activeAccount: {},
  verifyUser: () => Promise.resolve(),
  subscriptionActive: false,
  getActiveAccount: () => {},
  updateProfile: () => {},
  userResetPassword: () => {},
  btnLoading: false,
  setSocketIo: () => null,
  socketIo: {},
  brokerData: [],
  setBrokerData: () => {},
};
const AuthContext = createContext(defaultProvider as any);
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: any) => {
  const [brokerData, setBrokerData] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [unSeenCount, setUnseenCount] = useState(0);
  const [csvSocketData, setCsvSocketData] = useState({});
  const [activeAccount, setActiveAccount] = useState({} as any);
  const [socketIo, setSocketIo] = useState({} as any);
  const [user, setUser] = useState(defaultProvider.user);
  const [subscriptionActive, setSubscriptionActive] = useState<boolean>(
    defaultProvider.subscriptionActive
  );
  const [selectedSideBar, setSelectedSideBar] = useState('dashboard');
  const [loading, setLoading] = useState(defaultProvider.loading);
  const [forgotLoading, setForgotLoading] = useState(defaultProvider.forgotLoading);
  const [verifyOtpLoading, setVerifyOtpLoading] = useState(false);
  const [signInLoading, setSignInLoading] = useState(defaultProvider.signInLoading);
  const [btnLoading, setBtnLoading] = useState(false);
  // ** Hooks
  const router = useRouter();

  const getActiveAccount = async (response: any) => {
    const allAccountList = [...response?.accounts];
    let activeAccountsList: any = {};
    const isActiveAccount: any = await getStorageItemAsync('activeAccount');
    activeAccountsList = {
      activeAccountIds: isActiveAccount?.activeAccountIds,
      accounts: allAccountList?.map((i) => {
        return {
          ...i,
          status: i?.status ? i?.status : 'active',
        };
      }),
    };
    // firstly fetch the account ids from the active account list
    const ids = activeAccountsList?.accounts?.map((i: any) => i?.uuid);
    // check if the account ids are included in the active account list
    const isIncluded = activeAccountsList?.activeAccountIds?.every((id: any) => ids?.includes(id));
    // return the active account if the account is active and included in the active account list
    if (!!isActiveAccount && isIncluded) {
      setStorageItemAsync('activeAccount', JSON.stringify(activeAccountsList));
      setActiveAccount(activeAccountsList);
      return;
    }
    //
    activeAccountsList = {
      activeAccountIds: [...(response?.accounts?.map((i: any) => i?.uuid) || [])],
      accounts: allAccountList,
    };
    setStorageItemAsync('activeAccount', JSON.stringify(activeAccountsList));
    setActiveAccount(activeAccountsList);
  };

  const [isOpen, setIsOpen] = useState(false);

  const isSubscriptionInActive = () => {
    if (user?.stripe?.subscriptionStatus !== 'active') {
      return true;
    }
    return false;
  };

  const getUser = async (cb?: any) => {
    setLoading(true);
    getCurrentUser()
      .then(async (response: any) => {
        setUser({ ...response.data });
        // getActiveAccount(response?.data);
        // if (
        //   response?.data?.limits?.plan !== 'free' &&
        //   response?.data?.stripe?.subscriptionStatus === 'active'
        // ) {
        //   setSubscriptionActive(true);
        // } else {
        // }
        cb && cb();
        // since animation of logo is 2 seconds, we are setting loading to false after 2 seconds
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch(async () => {
        // since animation of logo is 2 seconds, we are setting loading to false after 2 seconds
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
  };
  useEffect(() => {
    getUser(() => {});
  }, []);

  const handleLogin = (params: any, cb: any, errorCallback: any) => {
    setSignInLoading(true);
    login(params)
      .then(async (response: any) => {
        await setStorageItemAsync(storageTokenKeyName, response?.accessToken);
        // toast.success(
        //   <Text as="b">
        //     Welcome back,{' '}
        //     {`${response?.data?.payload?.firstName} ${response?.data?.payload?.lastName}`}!
        //   </Text>
        // );
        getUser(() => {
          router.replace(routes.tabs.home as any);
          setSignInLoading(false);
        });
        cb && cb();
      })
      .catch((err: any) => {
        // toast.error(err?.message || 'Something went wrong');
        setSignInLoading(false);

        if (errorCallback) errorCallback(err);
      });
  };

  const handleLogout = async () => {
    setUser(null);
    setActiveAccount([]);
    await Promise.all([
      removeStorageItemAsync(storageTokenKeyName),
      removeStorageItemAsync('activeAccount'),
    ] as any);
    router.push(routes.auth.auth as any);
  };
  const handleSignUp = ({ body }: SignUpInterface, successCb: any, errorCallback: any) => {
    setSignInLoading(true);
    register({ body })
      .then(async () => {
        setSignInLoading(false);
        router.push(routes.auth.verifyOtp as any);
        // toast.success('An email has been sent to your email address');
        successCb && successCb();
      })
      .catch((err: any) => {
        setSignInLoading(false);
        if (errorCallback) errorCallback(err);
      })
      .finally(() => {});
  };
  const verify = ({ pathParams }: VerifyInterface, cb: any, errorCallback: any) => {
    setVerifyOtpLoading(true);
    verifyOtp({ pathParams })
      .then(async (response: any) => {
        setVerifyOtpLoading(false);
        cb && cb(response, 'success');
      })
      .catch((err: any) => {
        setVerifyOtpLoading(false);
        // toast.error(err?.message);

        if (errorCallback) errorCallback(err, 'error');
      });
  };
  const verifyUser = ({ pathParams }: VerifyInterface, cb: any, errorCallback: any) => {
    setForgotLoading(true);
    verifyToken({ pathParams })
      .then(async (response: any) => {
        setForgotLoading(false);
        cb && cb(response, 'success');
      })
      .catch((err: any) => {
        setForgotLoading(false);
        // toast.error(err?.message);

        if (errorCallback) errorCallback(err, 'error');
      });
  };
  const forgotPassword = ({ body }: any, cb: any, errorCallback: any) => {
    setForgotLoading(true);
    forgotPasswordService({ body })
      .then(async () => {
        setForgotLoading(false);

        cb && cb();
      })
      .catch((err: any) => {
        setForgotLoading(false);

        // toast.error(err?.message);

        if (errorCallback) errorCallback(err);
      });
  };
  // reset password when user is logged out
  const resetPass = ({ pathParams }: any, cb: any, errorCallback: any) => {
    setForgotLoading(true);
    resetPassword({ pathParams })
      .then(async () => {
        setForgotLoading(false);
        cb && cb();
      })
      .catch((err: any) => {
        setForgotLoading(false);
        // toast.error(err?.message);

        if (errorCallback) errorCallback(err);
      });
  };

  const createPassword = ({ body }: any, cb: any, errorCallback: any) => {
    setupPassword({ body })
      .then(async (response: any) => {
        // router.push(routes.auth.login);
        cb && cb(response);
      })
      .catch((err: any) => {
        if (errorCallback) errorCallback(err);
      });
  };

  const updateProfile = async ({ body }: any, cb: any, errCb: any) => {
    setBtnLoading(true);
    updateProfileService({
      body,
    })
      .then((res: any) => {
        setUser({
          ...user,
          firstName: res?.data?.firstName,
          lastName: res?.data?.lastName,
          email: res?.data?.email,
          userHandle: res?.data?.userHandle,
          profileImage: res?.data?.profileImage,
          bio: res?.data?.bio,
          phoneNumber: res?.data?.phoneNumber,
          location: res?.data?.location,
        });
        // toast.success('Updated successfully');
        cb && cb();
        setBtnLoading(false);
      })
      .catch((err: any) => {
        errCb && errCb(err);
        setBtnLoading(false);
      })
      .finally(() => {});
  };
  // reset password when user is logged in
  const userResetPassword = async ({ pathParams }: any, cb: any) => {
    setBtnLoading(true);
    resetPasswordService({
      pathParams,
    })
      .then(() => {
        // toast.success('Password updated successfully');
        cb && cb();
      })
      .catch((err: any) => {
        // toast.error(err?.message);
      })
      .finally(() => {
        setBtnLoading(false);
      });
  };

  const getUnSeenCount = async () => {
    const res: any = await unSeenCountService();
    setUnseenCount(res?.data);
  };
  useEffect(() => {
    getUnSeenCount();
  }, []);

  const addAccount = async (payload: any, cb: any, errCb: any) => {
    createAccountService({
      body: payload,
    })
      .then((res: any) => {
        const allAccountsList = {
          ...user,
          accounts: [
            ...user.accounts,
            {
              accountName: res?.account?.accountName,
              uuid: res?.account?.uuid,
              calculationMethod: res?.account?.calculationMethod,
              status: res?.account?.status,
            },
          ],
        };

        setUser(allAccountsList);
        const updatedActiveAccount = {
          activeAccountIds: [...(activeAccount.activeAccountIds || []), res?.account?.uuid],
          accounts: allAccountsList?.accounts || [],
        };
        setActiveAccount(updatedActiveAccount);
        cb && cb();
      })
      .catch((err) => {
        errCb && errCb(err);
      })
      .finally(() => {});
  };
  const updateAccount = (payload: any, cb: any, errCb: any) => {
    updateAccountService({
      body: payload,
      pathParams: {
        id: payload?.uuid,
      },
    })
      .then(() => {
        const updateAccount = {
          accounts: user?.accounts?.map((i: any) => {
            if (i?.uuid === payload?.uuid) {
              return {
                ...i,
                accountName: payload.accountName,
                calculationMethod: payload.calculationMethod,
              };
            }
            return i;
          }),
        };
        setUser({
          ...user,
          accounts: updateAccount.accounts,
        });
        const updatedActiveAccount = {
          ...activeAccount,
          accounts: updateAccount?.accounts,
        };
        setActiveAccount(updatedActiveAccount);
        cb && cb();
      })
      .catch((err) => {
        errCb && errCb(err);
      })
      .finally(() => {});
  };

  //check subscription
  const checkSubscription = useCallback(
    (cb: any, errCb: any) => {
      if (loading) return;
      // check if the subscription is active then open modal
      const isSubInActive = isSubscriptionInActive();
      // if the user has reached the limit of accounts and subscription is active then show error
      if (
        user?.limits?.accounts ===
          user?.accounts?.filter((i: any) => i?.status === 'active')?.length &&
        isSubInActive === false
      ) {
        errCb && errCb();
        return;
        // return toast.error('You have reached the limit of accounts');
      }
      // if the user has reached the limit of accounts and subscription is active then show the modal
      if (
        user?.limits?.accounts >=
          user?.accounts?.filter((i: any) => i?.status === 'active')?.length &&
        isSubInActive
      ) {
        errCb && errCb();

        return;
      }
      cb && cb();
    },
    [isSubscriptionInActive, loading, user]
  );

  useEffect(() => {
    if (user?.uuid) {
      const socket: any = io(socketHostname(), {
        transports: ['websocket', 'polling'],
        secure: true,
        forceNew: true,
      });

      socket?.on('connect', () => {
        setSocketIo(socket);
      });

      socket?.emit('join_room', user?.uuid);

      return () => {
        socket.disconnect();
        socket.off('disconnect');
      };
    }
  }, [user]);
  const values = {
    user,
    loading,
    getUser,
    forgotLoading,
    signInLoading,
    verifyOtpLoading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    signUp: handleSignUp,
    verify,
    createPassword,
    forgotPassword,
    resetPass,
    setForgotLoading,
    setVerifyOtpLoading,
    setSignInLoading,
    setSelectedSideBar,
    selectedSideBar,
    activeAccount,
    setActiveAccount,
    verifyUser,
    subscriptionActive,
    getActiveAccount,
    updateProfile,
    userResetPassword,
    btnLoading,
    setSocketIo,
    socketIo,
    setCsvSocketData,
    csvSocketData,
    brokerData,
    setBrokerData,
    setUnseenCount,
    unSeenCount,
    getUnSeenCount,
    updateAccount,
    addAccount,
    //subscription
    isOpen,
    setIsOpen,
    isSubscriptionInActive,
    checkSubscription,
    setOnlineUsers,
    onlineUsers,
  };

  return <AuthContext.Provider value={values as any}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };

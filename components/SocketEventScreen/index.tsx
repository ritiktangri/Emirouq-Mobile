'use client';
import React, { useEffect } from 'react';

import { useAuth } from '~/context/AuthContext';

function SocketEventScreen({ children }: any) {
  const { socketIo, user, setOnlineUsers } = useAuth();
  // emit heartbeat every 10 seconds
  useEffect(() => {
    let interval: any = null;
    if (user?.uuid && socketIo.connected) {
      interval = setInterval(() => {
        socketIo.emit('heartbeat', user?.uuid);
      }, 10000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [socketIo.connected, user]);

  // useEffect(() => {
  //   if (socketIo?.connected && user?.uuid) {
  //     socketIo.on('onlineUsers', (user: any) => {
  //       console.log(user);
  //       setOnlineUsers(
  //         user?.users?.filter((i: any) => i?.userId !== user?.uuid)?.map((i: any) => i?.userId)
  //       );
  //     });
  //   }
  // }, [socketIo, user?.user?.uuid]);

  return <>{children}</>;
}

export default SocketEventScreen;

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

  useEffect(() => {
    if (socketIo?.connected && user?.uuid) {
      // when user connects to the socket, emit onlineUserList event
      //to fetch all online users
      socketIo.emit('onlineUserList', (user: any) => {
        setOnlineUsers(user);
      });

      //when other user open's the app, fetch online users
      socketIo.on('fetchOnlineUsers', (user: any) => {
        setOnlineUsers(user);
      });
      return () => {
        // remove the event listener when the component unmounts
        socketIo.off('fetchOnlineUsers');
        socketIo.off('onlineUserList');
        console.log('disconnected');
      };
    }
    return () => {
      console.log('disconnected');
    };
  }, [socketIo, user?.user?.uuid]);

  return <>{children}</>;
}

export default SocketEventScreen;

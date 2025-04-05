'use client';
import React, { useEffect } from 'react';

import { useAuth } from '~/context/AuthContext';

function SocketEventScreen({ children }: any) {
  const { socketIo, user } = useAuth();
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
    if (socketIo?.connected) {
    }
  }, [socketIo?.connected]);

  return <>{children}</>;
}

export default SocketEventScreen;

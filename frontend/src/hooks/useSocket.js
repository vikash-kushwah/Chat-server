import { useEffect } from 'react';
import io from 'socket.io-client';

const useSocket = (url, onMessageReceived, onHistoryReceived) => {
  useEffect(() => {
    const socket = io(url);

    socket.on('chat message', onMessageReceived);
    socket.on('chat history', onHistoryReceived);

    return () => {
      socket.off('chat message', onMessageReceived);
      socket.off('chat history', onHistoryReceived);
      socket.disconnect();
    };
  }, [url, onMessageReceived, onHistoryReceived]);

  return socket;
};

export default useSocket;

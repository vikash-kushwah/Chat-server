import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import os from 'os';

// Function to get the local IP address
const getLocalIpAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
};

const localIpAddress = getLocalIpAddress();
console.log(`Local IP Address: ${localIpAddress}`);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/socket.io': {
        target: `http://${localIpAddress}:3000`, // Dynamically set the server's IP
        changeOrigin: true,
        ws: true, // WebSocket support
      },
    },
  },
});

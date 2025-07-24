import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allow LAN and external access
    allowedHosts: ['.ngrok-free.app'], // allow all ngrok subdomains
  },
});

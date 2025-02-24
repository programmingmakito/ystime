import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react';

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [react()],
      preview: {
        host: true,
        allowedHosts: ['ystime-006ddb86768b.herokuapp.com'],
      },
    });

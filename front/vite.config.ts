import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [svgr(), react({
    babel: {
      plugins: ['babel-plugin-styled-components'],
    },
  })],
  server: {
    port: 3000,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3001/api',
    //     changeOrigin: true,
    //   }
    // }
  },
  resolve: {
    alias: {
      'ui-kit': path.resolve(__dirname, './src/ui-kit'),
      'components': path.resolve(__dirname, './src/components'),
      'api': path.resolve(__dirname, './src/api'),
      'store': path.resolve(__dirname, 'src/store'),
      'pages': path.resolve(__dirname, './src/pages'),
      'assets': path.resolve(__dirname, './src/assets'),
      'theme': path.resolve(__dirname, './src/theme'),
      'hooks': path.resolve(__dirname, './src/hooks'),
    },
  },
})

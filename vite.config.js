import {fileURLToPath, URL} from 'url'
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    open: '/',
    base: 'http://127.0.0.1:8080',
    origin: '',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/', import.meta.url)),
      '~': fileURLToPath(new URL('./node_modules/', import.meta.url)),
    },
  },
})

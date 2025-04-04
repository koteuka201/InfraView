import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      '@store': path.resolve(__dirname, 'src/store'),
      '@shared': path.resolve(__dirname, 'src/shared'),
    }
  }
})

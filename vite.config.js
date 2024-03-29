import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path')

// const basepath = process.env.PROD ? "/new-world-buddy-item-management/" : "/";

export default defineConfig({
  base: "/new-world-buddy-item-management/",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
})

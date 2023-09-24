import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path')
// base: import.meta.env.PROD ? "/new-world-buddy-item-management/" : "/",

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    }
})

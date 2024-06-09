import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    //  https: false, // 是否开启 https
    //  open: false, // 是否自动在浏览器打开
    //  cors: true, // 允许跨域  8月更新
    //  port: 3000, // 端口号
    //  host: "0.0.0.0",
      proxy: {
        "/api": { // “/api” 以及前置字符串会被替换为真正域名
          target: "http://192.168.50.111/api/", // 请求域名
          secure: false, // 请求是否为https
          changeOrigin: true, // 是否跨域
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
    }
})

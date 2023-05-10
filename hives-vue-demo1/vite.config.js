import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";
import path from 'path';
import axios from "axios";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), './src/assets/svg')],
      // 指定symbolId格式
      symbolId: '[name]',
    }),],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: { //主要是加上这段代码
    open: true,//启动项目自动弹出浏览器
    port: 3000,//启动端口
    cors:true,
    proxy: {
      '/api': {
        target: 'http://139.9.58.205:88',	//实际请求地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  base:'./', // 设置打包路径
 })

// 파일 위치: rendogdb-app/vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ★★★ css 객체와 postcss 객체를 제거합니다. ★★★
});
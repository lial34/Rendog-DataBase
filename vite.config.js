// 파일 위치: rendogdb-app/vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      // lucide-react 모듈을 외부화하여 Rolldown이 모듈 해결 오류를 일으키는 것을 방지합니다.
      external: [
        'lucide-react'
      ]
    }
  }
});

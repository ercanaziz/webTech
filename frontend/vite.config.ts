import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // CSS sıkıştırıcı 10 haneli öğrenci numarasını (--no) yuvarlayıp
    // rengi bozuyor; CSS zaten küçük, sıkıştırma kapalı.
    cssMinify: false,
  },
})

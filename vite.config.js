import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./", // "/Fashion/" என்பதற்கு பதிலாக "./" என்று மாற்றவும்
})
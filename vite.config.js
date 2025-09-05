import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Adicione estas linhas:
  base: './', // Isso é crucial para caminhos relativos no Firebase
  build: {
    outDir: 'dist', // Certifique-se que é a mesma pasta configurada no Firebase
    sourcemap: false, // Desativa sourcemaps para produção (opcional)
  },
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Configuração específica para produção
  build: {
    // Define o diretório de saída para os arquivos de build
    outDir: 'dist',

    // Gere arquivos sourcemap (opcional)
    sourcemap: false, // Defina como true para gerar sourcemaps

    // Habilita o uso de Content Delivery Networks (CDNs) para dependências comuns
    rollupOptions: {
      external: ['node_modules/@phosphor-icons/**'],
    },
  },
})

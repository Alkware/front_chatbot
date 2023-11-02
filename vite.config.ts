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

    // Ative a minificação do código
    minify: 'terser', // Pode ser 'esbuild' ou 'terser'

    // Habilita o uso de Content Delivery Networks (CDNs) para dependências comuns
    rollupOptions: {
      // Exemplo de uso de CDN para uma biblioteca
      external: [
        '@phosphor-icons'
    ],
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import browserslistToEsbuild from 'browserslist-to-esbuild'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  base: '/',
  server: {
    open: true,
    port: 3000
  },
  plugins: [react(), viteTsconfigPaths(), mkcert()],
  build: {
    outDir: 'build',
    target: browserslistToEsbuild()
  }
});
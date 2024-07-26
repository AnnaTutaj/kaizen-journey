import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import mkcert from 'vite-plugin-mkcert';
import svgr from 'vite-plugin-svgr';
import path from "path";

export default defineConfig({
  base: '/',
  server: {
    open: true,
    port: 3000
  },
  plugins: [react(), viteTsconfigPaths(), mkcert(), svgr()],
  build: {
    outDir: 'build',
    target: browserslistToEsbuild()
  },
  resolve: {
    alias: [
      { find: '@assets', replacement: path.resolve(__dirname, './src/assets') },
      { find: '@common', replacement: path.resolve(__dirname, './src/common') },
      { find: '@modules', replacement: path.resolve(__dirname, './src/modules') }
    ]
  }
});

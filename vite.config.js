import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/

export default defineConfig(({ command }) => {
  const isProduction = command === 'build';
  return {
    plugins: [svelte()],
    base: isProduction ? '/Phantasma-Dashboard/' : '/',
  };
});

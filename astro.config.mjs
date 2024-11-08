import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  vite: {
    optimizeDeps: {
      include: ['psn-api']
    }
  },
  output: 'server',
  adapter: vercel(),
  integrations: [tailwind()]
});
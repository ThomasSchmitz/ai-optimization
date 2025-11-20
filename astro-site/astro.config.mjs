import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://yourdomain.com', // TODO: Update with your actual domain
  
  integrations: [
    mdx({
      remarkPlugins: [],
      rehypePlugins: [],
    }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    tailwind({
      applyBaseStyles: false, // We'll use custom base styles
    }),
  ],

  output: 'static', // Static site generation
  
  // Build configuration
  build: {
    inlineStylesheets: 'auto',
  },

  // Markdown configuration
  markdown: {
    shikiConfig: {
      theme: 'dracula',
      wrap: true,
    },
  },

  // Vite configuration for optimization
  vite: {
    build: {
      cssMinify: 'lightningcss',
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['astro'],
          },
        },
      },
    },
  },

  // Redirects (if URLs changed during migration)
  redirects: {
    // Example: '/old-path': '/new-path'
    // Add redirects here if needed during migration
  },

  // Server configuration for development
  server: {
    port: 4321,
    host: true,
  },
});

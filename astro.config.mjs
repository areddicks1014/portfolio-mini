// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import mdx from '@astrojs/mdx';
import angular from '@analogjs/astro-angular';

// https://astro.build/config
export default defineConfig({
  redirects: {
      '/home': '/index'
    },
  integrations: [
    icon({
      include: {
        // mdi: ["*"], // useful for development
        mdi: [
          'arrow-back',
          'home',
          'email', 
          'github',
          'linkedin',
          'codepen',
          'download',
          'file-document',
          'adobe-acrobat',
          'external-link',
          'eye',
          'text-box',
          'code',
          'watch-variant'
        ],
      }
    }),
    mdx({
      syntaxHighlight: 'prism',}
    ),
    angular({
      vite: {
        inlineStylesExtension: 'scss|sass|less',
      },
    }),
  ],
  vite: {
    ssr: {
      // transform these packages during SSR. Globs supported
      noExternal: ['@rx-angular/**'],
    },
  },
});
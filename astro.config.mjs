// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  redirects: {
      '/home': '/index'
    },

  integrations: [icon({
    include: {
      mdi: [
        'arrow-back',
        'email', 
        'github',
        'linkedin',
        'codepen',
        'download',
        'file-document',
        'adobe-acrobat',
        'external-link'
      ],
    }
  })]
});
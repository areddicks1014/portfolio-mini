// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import angular from "@analogjs/astro-angular";

import expressiveCode from "astro-expressive-code";

import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  redirects: {
    "/home": "/index",
  },
  integrations: [
    icon({
      include: {
        // mdi: ["*"], // useful for development
        mdi: [
          "arrow-back",
          "home",
          "email",
          "github",
          "linkedin",
          "codepen",
          "download",
          "file-document",
          "adobe-acrobat",
          "external-link",
          "eye",
          "text-box",
          "code",
          "watch-variant",
        ],
      },
    }),
    expressiveCode(),
    mdx({
      syntaxHighlight: "prism",
    }),
    angular({
      vite: {
        inlineStylesExtension: "scss|sass|less",
      },
    }),
    starlight({
      title: "augmented-alex",
      expressiveCode: {
        // Replace the default themes with a custom set of bundled themes:
        // "dracula" (a dark theme) and "solarized-light"
        themes: ['github-dark', 'github-light']
      },
      customCss: [
        '/src/styles/global.scss'
      ]
    }),
  ],
  vite: {
    ssr: {
      // transform these packages during SSR. Globs supported
      noExternal: ["@rx-angular/**"],
    },
  },
});

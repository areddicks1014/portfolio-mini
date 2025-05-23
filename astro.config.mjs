// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import angular from "@analogjs/astro-angular";
import expressiveCode from "astro-expressive-code";
import starlight from "@astrojs/starlight";
import starlightImageZoom from "starlight-image-zoom";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  redirects: {
    "/home": "/index",
  },
  integrations: [icon({
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
        "dribbble",
        "file-document",
        "adobe-acrobat",
        "external-link",
        "eye",
        "text-box",
        "code",
        "watch-variant",
        "verified",
        "close",
        "progress-check",
        "question-mark",
        "design",
        "art",
        "artboard",
        "lock",
        "work",
        "invoice-text-multiple",
        "tools",
        "certificate",
        "book-education",
        "volunteer",
        "bag-personal"
      ],
      solar: [
        "figma-bold",
        "figma-bold-duotone",
        "figma-outline",
        "figma-file-outline",
        "figma-file-bold"
      ]
    },
  }), expressiveCode(), mdx({
    syntaxHighlight: "prism",
  }), angular({
    vite: {
      inlineStylesExtension: "scss|sass|less",
    },
  }), starlight({
    title: "augmented-alex",
    expressiveCode: {
      themes: ['github-dark', 'github-light']
    },
    customCss: [
      '/src/styles/global.scss'
    ],
    plugins: [
      starlightImageZoom(),
    ]
  }), react()],
  vite: {
    ssr: {
      // transform these packages during SSR. Globs supported
      noExternal: ["@rx-angular/**"],
    },
  },
});
export default defineNuxtConfig({
  vite: {
    devBundler: "legacy",
  },
  publicRuntimeConfig: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  },
  buildModules: ["@nuxtjs/google-fonts"],
  modules: ["@nuxtjs/tailwindcss"],
  googleFonts: {
    families: {
      Comfortaa: [400, 700],
    },
  },
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
  },
  app: {
    head: {
      title: "Harbor",
      viewport: "width=device-width, initial-scale=1",
      charset: "utf-8",
      bodyAttrs: {
        class: "bg-slate-900 h-full overflow-hidden text-slate-300",
      },
      htmlAttrs: {
        class: "dark h-full",
        lang: "en-us",
      },
      script: [
        {
          src: "https://plausible.io/js/plausible.js",
          defer: true,
          "data-domain": "harbor.axo.dev, axo.dev",
        },
      ],
    },
  },
});

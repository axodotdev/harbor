export default defineNuxtConfig({
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
});

export default {
  srcDir: "src/",
  css: ["./src/assets/main.css", "@fortawesome/fontawesome-svg-core/styles.css"],
  devtools: { enabled: true },
  ssr: true,
  app: {
    pageTransition: false,
    layoutTransition: false,
    head: {
      title: "Weather app",
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  compatibilityDate: "2025-01-17",
  runtimeConfig: {
    private: {
      API_KEY: process.env.API_KEY,
    },
  },
  nitro: {
    rootDir: "server/",
  },
}

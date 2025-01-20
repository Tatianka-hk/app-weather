export default {
  // srcDir: "src/",
  buildDir: "dist",
  css: ["./assets/main.css", "@fortawesome/fontawesome-svg-core/styles.css"],
  devtools: { enabled: true },
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
}

import { createI18n } from "vue-i18n"
import { en, ua } from "../locales"
import { defineNuxtPlugin } from "nuxt/app"

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "en",
    messages: {
      en,
      ua,
    },
    devtools: false,
    allowComposition: true,
  })

  vueApp.use(i18n)
})

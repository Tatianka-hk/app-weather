import { createI18n } from "vue-i18n"
import { en, ua } from "../locales"
import { defineNuxtPlugin } from "nuxt/app"
if (typeof window === 'undefined') {
  global.__VUE_PROD_DEVTOOLS__ = false
}
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

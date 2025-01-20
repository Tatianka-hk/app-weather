<template>
  <div class="relative">
    <select
      v-model="locale"
      @change="changeLanguage"
      :class="['appearance-none border border-gray-300 !rounded-button px-3 py-1.5 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-custom focus:border-custom', backgroundClass]"
    >
      <option value="en">EN</option>
      <option value="ua">UA</option>
    </select>
    <div
      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2"
    >
      <font-awesome-icon
        icon="chevron-down"
        :class="['text-xs text-gray-100', textClass]"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, watch, computed } from "vue"
  import { useI18n } from "vue-i18n"

  const { locale } = useI18n()
  const { isDay } = inject("theme")
  const backgroundClass = computed(() => {
    return isDay.value ? "bg-white text-gray-800" : "bg-gray-800 text-gray-100"
  })
  const textClass = computed(() => {
    return isDay.value ? "text-gray-800" : "text-gray-100"
  })

  function changeLanguage() {
    localStorage.setItem('lang', locale.value)
  }
</script>

<template>
  <div :class="['app', themeClass]" class="h-[calc(100vh-80px)]">
    <VsHeader />
    <VsWeatherList />
    <!-- <VsAutocompleteInput /> -->
  </div>
</template>
<script setup lang="ts">
  import { VsHeader, VsWeatherList } from "./components"
  import { ref, provide, computed } from "vue"

  const isDay = ref(true)

  const toggleTheme = () => {
    isDay.value = !isDay.value
    document.body.classList.toggle("light", isDay.value)
  }
  provide("theme", {
    isDay,
    toggleTheme,
  })

  const themeClass = computed(() => (isDay.value ? "light" : "dark"))
</script>

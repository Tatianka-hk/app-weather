<template>
  <div :class="['app', themeClass]" class="min-h-[calc(100vh-80px)]">
    <VsHeader />
    <VsWeatherList />
  </div>
</template>
<script setup lang="ts">
  import { VsHeader, VsWeatherList } from "./components"
  import { ref, provide, computed } from "vue"

  const isDay = ref(true)

  const toggleTheme = () => {
    isDay.value = !isDay.value
    localStorage.setItem('theme', isDay.value)
    document.body.classList.toggle("light", isDay.value)
  }

  const setTheme = (theme)=>{
    isDay.value = theme
    localStorage.setItem('theme', isDay.value)
    document.body.classList.toggle("light", isDay.value)
  }
  provide("theme", {
    isDay,
    toggleTheme,
    setTheme
  })

  const themeClass = computed(() => (isDay.value ? "light" : "dark"))
</script>

<template>
  <button
    @click="toggleTheme"
    :class="isDay ? 'bg-gray-200' : 'bg-gray-800'"
    class="rounded-lg inline-flex items-center justify-center w-[70px] h-8 relative"
  >
    <span class="absolute inset-0 flex items-center justify-start pl-2">
      <font-awesome-icon icon="sun" class="text-yellow-500" />
    </span>

    <span class="absolute inset-0 flex items-center justify-end pr-2">
      <font-awesome-icon icon="moon" class="text-gray-200" />
    </span>

    <span
      :class="isDay ? 'translate-x-[18px] bg-white' : 'translate-x-[-18px] bg-gray-600'"
      class="shadow w-7 h-7 rounded-full absolute transition-transform duration-200 ease-in-out"
    ></span>
  </button>
</template>
<script setup>
  import { ref, inject } from "vue"

  const { isDay, toggleTheme } = inject("theme")
</script>

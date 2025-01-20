<template>
  <div
    :class="['rounded-lg shadow-md p-5 flex flex-col items-center mb-2', isDay ? 'bg-blue-100 text-black' : 'bg-gray-800 text-gray-100']"
  >
    <button
      @click="toggleView"
      class="self-start bg-red-400 text-white rounded-md px-5 py-2 hover:bg-red-500 transition"
    >
      {{ isWeeklyView ? $t('switch.day') : $t('switch.days') }}
    </button>
    <VsWeatherCard v-if="weather && !isWeeklyView" :weather="weather?.list?.[0]" />
    <VsWeatherWeek v-if="weather && isWeeklyView" :weather="weather" />
    <button
      @click="removeBlock"
      class="self-start bg-red-400 text-white rounded-md px-5 py-2 hover:bg-red-500 transition mt-1"
    >
      {{ $t('modals.remove') }}
    </button>
  </div>
</template>

<script setup>
  import { ref, inject } from "vue"
  import { VsWeatherCard, VsWeatherWeek } from "./"

  const props = defineProps({
    weather: {
      type: Object,
      default: () => ({}),
    },
  })
  const { isDay } = inject("theme")
  const emit = defineEmits(["remove"])

  const isWeeklyView = ref(false)

  function removeBlock() {
    emit("remove")
  }

  function toggleView() {
    isWeeklyView.value = !isWeeklyView.value
  }
</script>

<template>
  <div class="flex flex-wrap gap-4 mt-5 justify-center w-full">
    <div
      v-for="(day, index) in dailyWeather"
      :key="index"
      :class="['flex flex-col items-center', isDay ? 'bg-white text-black' : 'bg-gray-800 text-red-400']"
      class="weather-day w-1/3 sm:w-1/4 md:w-1/5 p-4 rounded-lg shadow-md"
    >
      <h3>{{ getDayName(day.date) }}</h3>
      <p>{{ day.temp }}°C</p>
      <p>{{ day.weather[0].description }}</p>
      <img
        :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`"
        alt="weather icon"
        class="w-12 h-12"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from "vue"

  const props = defineProps({
    weather: {
      type: Object,
      default: null,
    },
  })

  const { isDay } = inject("theme")

  const dailyWeather = computed(() => {
    const weatherList = props.weather?.list
    const dailyData = {}

    weatherList.forEach((entry) => {
      const date = new Date(entry.dt * 1000)
      const dayString = date.toISOString().split("T")[0]

      if (!dailyData[dayString]) {
        dailyData[dayString] = {
          date: dayString,
          temps: [],
          weather: entry.weather,
        }
      }
      dailyData[dayString].temps.push(entry.main.temp)
    })

    return Object.values(dailyData).map((day) => {
      let avgTemp = day.temps.reduce((a, b) => a + b, 0) / day.temps.length
      const temp = Number(avgTemp.toFixed(1))
      return {
        ...day,
        temp,
      }
    })
  })

  const getDayName = (dateString) => {
    const date = new Date(dateString)
    const lang = localStorage.getItem("lang") || "en"
    return date.toLocaleDateString(lang, { weekday: "long" })
  }
</script>

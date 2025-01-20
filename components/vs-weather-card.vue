<template>
  <div v-if="weather" class="rounded-md p-5 mb-5 font-sans">
    <div class="card-title flex justify-between items-center mb-2">
      <h2 class="text-lg font-bold">
        {{ $t('card.title') }} {{ weather.name }}, {{ weather.country }}
      </h2>
    </div>
    <!--  weather info  -->
    <div>
      <p>{{ $t('card.temperature') }}: {{ temperature }}°</p>
      <p class="mb-1">{{ $t('card.feels_like') }}: {{ feelsLike }}°</p>
      <p class="mb-1 flex gap-1 items-center">
        {{ $t('card.weather') }}: {{ weather.weather[0].description }}
        <img :src="weatherIcon" alt="Weather icon" class="w-8 h-8 mr-2" />
      </p>
      <p class="mb-1">{{ $t('card.wind') }}: {{ weather.wind.speed }} m/s</p>
      <p class="mb-1">{{ $t('card.humidity') }}: {{ weather.main.humidity }}%</p>
      <div class="mb-1 flex gap-1 items-center text-center">
        {{ $t('card.recommendation') }}: {{ clothingRecommendation }}
        <div class="flex gap-1">
          <component
            v-for="icon in clothingRecommendationIcons"
            :is="icon"
            :key="icon"
            class="h-[25px] w-[25px]"
          />
        </div>
      </div>
    </div>
    <!--  -->
    <!-- set metrics -->
    <div class="mt-4">
      <label class="mr-2">{{ $t('card.unit') }}:</label>
      <select v-model="unit" :class="['p-1 border rounded', selectionClass]">
        <option value="metric">{{ $t('card.celsius') }}</option>
        <option value="imperial">{{ $t('card.fahrenheit') }}</option>
      </select>
    </div>
    <!-- clothing style -->
    <div class="mt-4">
      <label class="mr-2">{{ $t('style.style') }}:</label>
      <select v-model="style" :class="['p-1 border rounded', selectionClass]">
        <option value="casual">{{ $t('style.casual') }}</option>
        <option value="sport">{{ $t('style.sport') }}</option>
        <option value="business">{{ $t('style.business') }}</option>
      </select>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed, inject } from "vue"
  import { useI18n } from "vue-i18n"
  import {
    IconJacket,
    IconShirt,
    IconShorts,
    IconSportSuit,
    IconSuit,
    IconJeans,
    IconSportJacket,
    IconCoat,
    IconHat,
    IconSweater,
  } from "../assets/icons"
  // IconScarf
  const props = defineProps({
    weather: {
      type: Object,
      required: false,
      default: null,
    },
  })
  const unit = ref("metric")
  const style = ref("casual")
  const { isDay } = inject("theme")
  const isFavorite = ref(false)
  const weatherIcon = computed(
    () => `http://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`,
  )
  const { t } = useI18n()
  const clothingRecommendation = computed(() => {
    const temp = props.weather.main.temp
    if (temp > 25) {
      if (style.value === "casual") {
        return t("recommendation.hot.casual")
      } else if (style.value === "sport") {
        return t("recommendation.hot.sport")
      } else {
        return t("recommendation.hot.business")
      }
    }

    // Тепло
    else if (temp <= 25 && temp > 15) {
      if (style.value === "casual") {
        return t("recommendation.warm.casual")
      } else if (style.value === "sport") {
        return t("recommendation.warm.sport")
      } else {
        return t("recommendation.warm.business")
      }
    }

    // Прохолодно
    else if (temp <= 15 && temp > 5) {
      if (style.value === "casual") {
        return t("recommendation.cool.casual")
      } else if (style.value === "sport") {
        return t("recommendation.cool.sport")
      } else {
        return t("recommendation.cool.business")
      }
    }

    // Холодно
    else {
      if (style.value === "casual") {
        return t("recommendation.cold.casual")
      } else if (style.value === "sport") {
        return t("recommendation.cold.sport")
      } else {
        return t("recommendation.cold.business")
      }
    }
  })

  // Іконки залежно від температури і стилю
  const clothingRecommendationIcons = computed(() => {
    const temp = props.weather.main.temp

    if (temp > 25) {
      if (style.value === "casual") {
        return [IconShirt, IconShorts, "sunglasses"]
      } else if (style.value === "sport") {
        return [IconSportSuit, IconShirt]
      } else {
        return ["suit", IconSuit]
      }
    } else if (temp <= 25 && temp > 15) {
      if (style.value === "casual") {
        return [IconShirt, IconJeans]
      } else if (style.value === "sport") {
        return [IconSportSuit, IconShirt]
      } else {
        return [IconJacket]
      }
    } else if (temp <= 15 && temp > 5) {
      if (style.value === "casual") {
        return [IconJacket, IconSweater]
      } else if (style.value === "sport") {
        return [IconSportSuit, IconSportJacket]
      } else {
        return [IconCoat]
      }
    } else {
      if (style.value === "casual") {
        return [IconCoat, IconHat]
      } else if (style.value === "sport") {
        return [IconSportSuit, IconHat]
      } else {
        return [IconCoat, IconHat]
      }
    }
  })
  const temperature = computed(() => {
    const temp =
      unit.value === "metric"
        ? props.weather.main.temp
        : (props.weather.main.temp * 9) / 5 + 32
    return parseFloat(temp.toFixed(1))
  })

  const feelsLike = computed(() => {
    const feels =
      unit.value === "metric"
        ? props.weather.main.feels_like
        : (props.weather.main.feels_like * 9) / 5 + 32
    return parseFloat(feels.toFixed(1))
  })

  const selectionClass = computed(() => {
    return {
      "bg-gray-100": isDay?.value,
      "bg-gray-500": !isDay?.value,
    }
  })
  onMounted(() => {
    const storedBlocks = localStorage.getItem("weatherBlocks")
    if (storedBlocks) {
      const blocks = JSON.parse(storedBlocks) || []
      const currentBlock = blocks.find((el) => el.id === props.weather.id)
      isFavorite.value = currentBlock?.favorite || false
    }
  })
</script>

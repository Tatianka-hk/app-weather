<template>
  <div class="weather">
    <VsAutocompleteInput @selected="addBlock" />
    <!-- {{ weatherData?.[0]?.list[0] }} -->
    <VsWeatherBlock
      v-for="(block, index) in weatherData"
      :weather="block"
      :key="block.id"
      @remove="removeBlock(index)"
    />
    <VsConfirmationModal
      v-if="showModal"
      @confirm="confirmRemove"
      @cancel="cancelRemove"
    />
    <VsLimitExceededModal v-if="showLimitModal" @confirm="closeLimitModal" />
  </div>
</template>
<script setup>
  import { ref, onMounted, watch } from "vue"
  import { VsWeatherBlock } from "./"
  import { VsAutocompleteInput } from "../ui"
  import { VsConfirmationModal, VsLimitExceededModal } from "../models"
  import { useI18n } from "vue-i18n"

  const { locale } = useI18n()
  const weatherData = ref([])
  const MAX_BLOCKS = 5
  const showModal = ref(false)
  const showLimitModal = ref(false)
  const blockToRemove = ref(-1)
  watch(locale, (newValue, oldValue) => {
    if (newValue !== oldValue) {
      changedLanguage()
    }
  })
  async function changedLanguage() {
    const newArr = []

    await Promise.all(
      weatherData?.value?.map(async (weatherBlock) => {
        const newWeatherBlock = await takeWeatherData(weatherBlock.city)
        newArr.push(newWeatherBlock)
      }),
    )

    weatherData.value = [...newArr]
  }
  function setToLocalStorage() {
    localStorage.setItem("weatherBlocks", JSON.stringify(weatherData.value))
  }

  function addBlock(newData) {
    if (
      weatherData?.value?.length < MAX_BLOCKS ||
      weatherData?.value?.length === undefined
    ) {
      weatherData?.value?.push(newData)
      setToLocalStorage()
    } else {
      showLimitModal.value = true
    }
  }

  function removeBlock(index) {
    blockToRemove.value = index
    showModal.value = true
  }

  function confirmRemove() {
    weatherData.value.splice(blockToRemove.value, 1)
    setToLocalStorage()
    blockToRemove.value = -1
    showModal.value = false
  }

  function cancelRemove() {
    blockToRemove.value = 0
    showModal.value = false
  }

  function closeLimitModal() {
    showLimitModal.value = false
  }

  async function getUserLocation() {
    try {
      const { data, error } = await useFetch(
        `/api/user-location?lang=${locale.value}`,
      )
      if (!error?.value) {
        return data.value
      }
    } catch (err) {
      console.error(err)
    }
  }
  onMounted(async () => {
    try {
      if (localStorage.getItem("weatherBlocks")) {
        weatherData.value = JSON.parse(localStorage.getItem("weatherBlocks") ?? "[]")
      } else {
        const newWeatherData = await getUserLocation()
        addBlock(takeWeatherData(newWeatherData))
      }
    } catch (err) {
      console.error(err)
    }
  })

  async function takeWeatherData(newWeatherData) {
    const { data, error } = await useFetch(
      `/api/weather?lang=${locale.value}&unit=metric&lat=${newWeatherData?.coord?.lat}&lon=${newWeatherData?.coord?.lon}`,
    )
    if (!error?.value) {
      return data.value
    }
  }
</script>
<style>
  .weather {
    margin-top: 80px;
    padding: 1rem;
  }
</style>

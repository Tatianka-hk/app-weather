<template>
  <div class="relative max-w-xl mx-auto mt-5 mb-5">
    <input
      type="text"
      v-model="query"
      @input="onInput"
      @focus="showSuggestions = true"
      @blur="hideSuggestions"
      :placeholder="$t('autocomplete')"
      class="w-full p-2.5 pl-3 pr-10 border border-gray-300 rounded-lg text-base transition-colors duration-300 focus:border-indigo-500 focus:outline-none"
    />
    <ul
      v-if="showSuggestions && suggestions.length"
      class="w-full mt-1 border border-gray-300 rounded-lg bg-white max-h-52 overflow-y-auto shadow-md"
    >
      <li
        v-for="(suggestion, index) in suggestions"
        :key="index"
        @mousedown="selectSuggestion(suggestion)"
        class="w-full p-2.5 cursor-pointer transition-colors duration-200 hover:bg-gray-100"
      >
        <span class="text-base text-gray-800">
          {{ suggestion.name }}, {{ suggestion.sys.country }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { ref, defineEmits } from "vue"
  import { useI18n } from "vue-i18n"

  const { locale } = useI18n()
  const query = ref("")
  const suggestions = ref([])
  const showSuggestions = ref(false)
  const emit = defineEmits(["selected"])

  async function citySuggestions(query) {
    try {
      const lang = detectLanguage(query)
      const { data, error } = await useFetch(
        `/api/find-city?lang=${lang}&query=${query}`,
      )
      if (!error?.value) {
        return data.value
      }
    } catch (err) {
      console.error(err)
    }
  }

  async function onInput() {
    if (query.value.length > 2) {
      suggestions.value = await citySuggestions(query.value)
    } else {
      suggestions.value = []
    }
  }

  async function selectSuggestion(suggestion) {
    query.value = ``
    const { data, error } = await useFetch(
      `/api/weather?lang=${locale.value}&unit=metric&lat=${suggestion?.coord?.lat}&lon=${suggestion?.coord?.lon}`,
    )
    if (!error?.value) {
      emit("selected", data.value)
      showSuggestions.value = false
    }
  }

  function hideSuggestions() {
    setTimeout(() => {
      showSuggestions.value = false
    }, 100)
  }

  function detectLanguage(text) {
    const cyrillicPattern = /[\u0400-\u04FF]/
    return cyrillicPattern.test(text) ? "uk" : "en"
  }
</script>

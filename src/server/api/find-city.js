import axios from "axios"
import { useRuntimeConfig } from "#imports"

export default defineEventHandler(async (event) => {
  try {
    const { lang, query } = getQuery(event)
    const config = useRuntimeConfig()
    const apiKey = config.private.API_KEY
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/find?q=${query}&units=metric&lang=${lang}&appid=${apiKey}`,
    )

    const sortedCities = response.data?.list
      .sort((a, b) => b.population - a.population)
      .slice(0, 5)

    return sortedCities
  } catch (err) {
    return {
      error: "Problem with getting user location",
    }
  }
})

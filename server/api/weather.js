import axios from "axios"
import { useRuntimeConfig } from "#imports"

export default defineEventHandler(async (event) => {
  try {
    const { lat, lon, lang, unit } = getQuery(event)
    const config = useRuntimeConfig()
    const apiKey = config.private.API_KEY
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}&lang=${lang}`,
    )
    response.data.list[0].name = response.data.city?.name
    response.data.list[0].country =
    response.data.city?.country || response.data.country
    return response.data
  } catch (err) {
    return {
      error: "Failed to fetch weather data",
    }
  }
})

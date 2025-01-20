import axios from "axios"
import { useRuntimeConfig } from "#imports"

export default defineEventHandler(async (event) => {
  try {
    const { lang } = getQuery(event)
    const config = useRuntimeConfig()
    const apiKey = config.private.API_KEY
    const res = await axios.get("https://ipapi.co/json/")
    const { latitude: lat, longitude: lon } = res.data
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          lat,
          lon,
          appid: apiKey,
          units: "metric",
          lang,
        },
      },
    )
    return response.data
  } catch (err) {
    return {
      error: "Problem with getting user location",
    }
  }
})

const city = 'London'
const endPoint = `https://api.openweathermap.org/data/2.5/forecast/daily?units=metric&cnt=5&q=${city}&appid=${
  import.meta.env.VITE_OPENWEATHER_APIKEY
}`

async function useOpenWeather() {
  try {
    const req = await fetch(endPoint)
    if (req.status === 200) {
      const response = await req.json()
      return response
    }
  } catch (error) {
    console.log(error)
  }
}

export default useOpenWeather

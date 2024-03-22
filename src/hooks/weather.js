async function useOpenWeather(url) {
  try {
    const req = await fetch(url)
    if (req.status === 404) {
      const response = await req.text()
      return JSON.parse(response)
    }
    if (req.status === 200) {
      const response = await req.json()
      return response
    }
  } catch (error) {
    console.log(error)
  }
}

export default useOpenWeather

/**
 * Utility function to fetch weather data from OpenWeather API.
 * 
 * @param {string} url - The complete API endpoint URL for fetching weather data.
 * @returns {Promise<Object|null>} A promise that resolves to the weather data object if successful, or null on error.
 */
async function useOpenWeather(url) {
  try {
    const req = await fetch(url)
    
    // Handle 404 Not Found error (e.g., city not found)
    if (req.status === 404) {
      const response = await req.text()
      return JSON.parse(response)
    }
    
    // Handle successful request
    if (req.status === 200) {
      const response = await req.json()
      return response
    }
  } catch (error) {
    // Log any network or unexpected errors
    console.log(error)
  }
}

export default useOpenWeather

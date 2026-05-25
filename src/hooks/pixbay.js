/**
 * Utility function to fetch nature images from the Pixabay API based on a weather condition.
 * 
 * @param {string} condition - The search term for images (defaults to 'clouds').
 * @returns {Promise<Object|null>} A promise that resolves to the image data object if successful.
 */
async function usePixbay(condition = 'clouds') {
  // Construct URL with API key from environment variables
  const url = `https://pixabay.com/api/?q=${condition}&category=nature&key=${
    import.meta.env.VITE_PIXBAY_APIKEY
  }&image_type=photo&per_page=10`

  try {
    const req = await fetch(url)
    if (req.status === 200) {
      const response = await req.json()
      return response
    }
  } catch (error) {
    // Log any network or unexpected errors
    console.log(error)
  }
}

export default usePixbay

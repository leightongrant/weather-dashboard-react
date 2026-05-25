/**
 * Utility function to fetch images from the Unsplash API based on a search condition.
 * 
 * @param {string} condition - The search term for photos.
 * @returns {Promise<Object|null>} A promise that resolves to the photo search results if successful.
 */
async function useUnsplash(condition) {
  // Construct URL with Access Key from environment variables
  const url = `https://api.unsplash.com/search/photos/?client_id=${
    import.meta.env.VITE_UNSPLASH_ACCESSKEY
  }&query=${condition}`

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

export default useUnsplash

async function useUnsplash(condition = 'clouds') {
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
    console.log(error)
  }
}

export default useUnsplash

async function usePixbay(condition = 'clouds') {
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
    console.log(error)
  }
}

export default usePixbay

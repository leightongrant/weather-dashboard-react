import { Input, Button } from 'react-daisyui'
import { useRef } from 'react'
const Query = ({ setQuery }) => {
  const queryRef = useRef()
  function handleQuery(e) {
    let city
    if (e.type === 'keydown') {
      city = !e.target.value ? 'London' : e.target.value
    } else {
      city = !queryRef.current.value ? 'New York' : queryRef.current.value
    }
    const cnt = 15
    setQuery(
      `https://api.openweathermap.org/data/2.5/forecast/daily?units=metric&cnt=${cnt}&q=${city}&appid=${
        import.meta.env.VITE_OPENWEATHER_APIKEY
      }`
    )
    queryRef.current.value = null
  }
  return (
    <div className="flex w-full  p-4 items-center justify-center gap-2 font-sans">
      <Input
        type="text"
        name="query"
        id="query"
        placeholder="Enter city name"
        ref={queryRef}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleQuery(e)
          }
        }}
      />
      <Button type="button" onClick={handleQuery}>
        Search
      </Button>
    </div>
  )
}

export default Query

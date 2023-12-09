import { Input, Button } from 'react-daisyui'
import { useRef } from 'react'
const Query = ({ setQuery }) => {
  const queryRef = useRef()
  function handleClick() {
    const city = queryRef.current.value
    const cnt = 15
    setQuery(
      `https://api.openweathermap.org/data/2.5/forecast/daily?units=metric&cnt=${cnt}&q=${city}&appid=${
        import.meta.env.VITE_OPENWEATHER_APIKEY
      }`
    )
    queryRef.current.value = null
  }
  return (
    <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
      <Input
        type="text"
        name="query"
        id="query"
        placeholder="Enter city name"
        ref={queryRef}
      />
      <Button type="button" onClick={handleClick}>
        Search
      </Button>
    </div>
  )
}

export default Query

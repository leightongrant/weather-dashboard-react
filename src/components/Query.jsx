import { Input, Button } from 'react-daisyui'
import { useRef } from 'react'
import { FaLocationCrosshairs } from 'react-icons/fa6'
import { useState } from 'react'

const Query = ({ fetchWeather }) => {
  const queryRef = useRef()
  const [userlocation, setUserLocation] = useState('')

  function getPosition() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        getCityName(pos.coords.latitude, pos.coords.longitude)
      },
      (e) => {
        console.log(e)
      }
    )
  }

  async function getCityName(lat, lon) {
    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${1}&appid=${
        import.meta.env.VITE_OPENWEATHER_APIKEY
      }`
    )
    const data = await res.json()
    queryRef.current.value = data[0].name
  }

  function handleQuery(e) {
    if (queryRef.current.value === '') {
      alert('Please enter search term')
      return
    }
    const city = e.target.value || queryRef.current.value
    fetchWeather(city)
    queryRef.current.value = ''
  }

  return (
    <div className="flex items-center justify-center w-full gap-2 p-4 font-sans ">
      <Input
        className="bg-stone-700/50 text-stone-100"
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

      <Button
        type="button"
        onClick={handleQuery}
        className="bg-stone-700/50 hover:bg-stone-800/50 text-stone-100">
        Search
      </Button>
      <FaLocationCrosshairs
        onClick={() => getPosition()}
        className="hover:cursor-pointer hover:text-stone-600"
      />
    </div>
  )
}

export default Query

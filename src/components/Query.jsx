import { Input, Button } from 'react-daisyui'
import { useRef } from 'react'
import { useGeolocated } from 'react-geolocated'
import { FaLocationCrosshairs } from 'react-icons/fa6'
import { useEffect, useState } from 'react'

const Query = ({ setQuery, setHistory, history }) => {
  const queryRef = useRef()
  const [userCity, setUserCity] = useState('')
  const { coords, getPosition } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })

  useEffect(() => {
    async function getCity() {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${'montego bay'}&limit=${10}&appid=${
          import.meta.env.VITE_OPENWEATHER_APIKEY
        }`
      )
      const data = await response.json()
      console.log(data)

      // queryRef.current.value = name
      // setUserCity(name)
    }
    coords && getCity()
  }, [coords])

  function handleQuery(e) {
    if (queryRef.current.value !== '') {
      let city
      if (e.type === 'keydown') {
        city = !e.target.value ? '' : e.target.value
        !history.includes(city.toLowerCase()) &&
          setHistory((pre) => [...pre, city.toLowerCase()])
      } else {
        city = !queryRef.current.value ? '' : queryRef.current.value
        !history.includes(city.toLowerCase()) &&
          setHistory((pre) => [...pre, city.toLowerCase()])
      }
      setQuery(city)
      queryRef.current.value = null
    } else {
      queryRef.current.placeholder = 'Please enter a City Name'
    }
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
        className="hover:cursor-pointer"
      />
    </div>
  )
}

export default Query

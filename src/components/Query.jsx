import { Input, Button } from 'react-daisyui'
import { useRef } from 'react'
const Query = ({ setQuery, setHistory, history }) => {
  const queryRef = useRef()
  function handleQuery(e) {
    if (queryRef.current.value !== '') {
      let city
      if (e.type === 'keydown') {
        city = !e.target.value ? '' : e.target.value
        !history.includes(city) &&
          setHistory((pre) => [...pre, city.toLowerCase()])
      } else {
        city = !queryRef.current.value ? '' : queryRef.current.value
        !history.includes(city) &&
          setHistory((pre) => [...pre, city.toLowerCase()])
      }

      setQuery(city)
      queryRef.current.value = null
    }
  }
  return (
    <div className="flex items-center justify-center w-full gap-2 p-4 font-sans">
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

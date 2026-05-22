import { Input, Button } from 'react-daisyui'
import { useRef } from 'react'
import { FaLocationCrosshairs } from 'react-icons/fa6'
import { useState } from 'react'
import { Puff } from 'react-loader-spinner'
import { useSearchStore } from '../store/searchStore'

const Query = ({ setMessage }) => {
	const queryRef = useRef()
	const [gettingLocation, setGettingLocation] = useState(false)
	const setCityName = useSearchStore((state) => state.setCityName)

	function getPosition() {
		setGettingLocation(true)
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				getCityName(pos.coords.latitude, pos.coords.longitude)
			},
			(e) => {
				console.log(e)
				setMessage(e.message)
				setGettingLocation(false)
			},
		)
	}

	async function getCityName(lat, lon) {
		try {
			const res = await fetch(
				`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${1}&appid=${
					import.meta.env.VITE_OPENWEATHER_APIKEY
				}`,
			)
			const data = await res.json()
			queryRef.current.value = data[0].name
			setGettingLocation(false)
		} catch (e) {
			console.log(e)
		}
	}

	function handleQuery(e) {
		if (queryRef.current.value === '') {
			setMessage('Please enter a city name eg(Kingston, JM)')
			setTimeout(() => {
				setMessage('')
			}, 5000)
		} else {
			setCityName(queryRef.current.value)
		}
	}

	return (
		<div className='flex items-center justify-center w-full gap-2 p-4 font-sans '>
			<Input
				className='w-64 bg-stone-700/50 text-stone-100 input'
				type='text'
				name='query'
				id='query'
				placeholder='Enter city eg(Kingston, JM)'
				ref={queryRef}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						handleQuery(e)
					}
				}}
			/>

			<Button
				type='button'
				onClick={handleQuery}
				className='bg-stone-700/50 hover:bg-stone-800/50 text-stone-100'
			>
				Search
			</Button>
			{!gettingLocation ?
				<FaLocationCrosshairs
					onClick={() => getPosition()}
					className='hover:cursor-pointer hover:text-stone-600 ms-2'
				/>
			:	<Puff
					visible={true}
					height='20'
					width='20'
					color='#fff'
					ariaLabel='puff-loading'
					wrapperStyle={{}}
					wrapperClass=''
				/>
			}
		</div>
	)
}

export default Query

/**
 * Query Component
 * 
 * Provides an input field for searching cities and a button for geolocation.
 * - Updates the global cityName in searchStore on search.
 * - Uses browser Geolocation API to find user's current city.
 * - Uses OpenWeather Reverse Geocoding API to convert lat/lon to a city name.
 */

import { useRef } from 'react'
import { FaLocationCrosshairs } from 'react-icons/fa6'
import { useState } from 'react'
import { Puff } from 'react-loader-spinner'
import { useSearchStore } from '../store/searchStore'

const Query = ({ setMessage }) => {
	const queryRef = useRef()
	const [gettingLocation, setGettingLocation] = useState(false)
	const setCityName = useSearchStore((state) => state.setCityName)

	/**
	 * Initiates the browser's geolocation request.
	 */
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

	/**
	 * Converts latitude and longitude to a city name using OpenWeather API.
	 * 
	 * @param {number} lat - Latitude.
	 * @param {number} lon - Longitude.
	 */
	async function getCityName(lat, lon) {
		try {
			const res = await fetch(
				`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${1}&appid=${
					import.meta.env.VITE_OPENWEATHER_APIKEY
				}`,
			)
			const data = await res.json()
			console.log(data)
			// Populate input field with found city name
			queryRef.current.value = data[0].name
			setGettingLocation(false)
		} catch (e) {
			console.log(e)
		}
	}

	/**
	 * Handles the search submission.
	 * Validates that input is not empty before updating global state.
	 */
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
			<input
				className='w-64 input'
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

			<button
				onClick={handleQuery}
				className='btn'
			>
				Search
			</button>
			
			{/* Geolocation Button */}
			{!gettingLocation ?
				<FaLocationCrosshairs
					onClick={() => getPosition()}
					className='hover:cursor-pointer hover:text-stone-600 ms-2'
					title='Get current location'
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

/**
 * City Component
 * 
 * Displays the current city name and the primary weather description.
 * 
 * @param {Object} props.weatherData - The weather data object.
 */
const City = ({ weatherData }) => {
	return (
		<>
			<h2 className='text-4xl font-extrabold uppercase text-stone-400 whitespace-nowrap'>
				{weatherData.city}
			</h2>
			<p className='text-3xl whitespace-nowrap'>
				{weatherData.days[0].weather[0].description}
			</p>
		</>
	)
}

export default City

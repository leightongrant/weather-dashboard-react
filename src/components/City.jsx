const City = ({ weatherData }) => {
  return (
    <>
      <h2 className="font-extrabold text-blue-300 uppercase whitespace-nowrap">
        {weatherData.city}
      </h2>
      <p className="text-3xl whitespace-nowrap">
        {weatherData.days[0].weather[0].description}
      </p>
    </>
  )
}

export default City

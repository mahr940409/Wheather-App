import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'

function App() {

const [coords, setCoords] = useState()
const [weather, setWeather] = useState()
const [temp, setTemp] = useState()
const [isLoading, setIsLoading] = useState(true)
const [hasError, setHasError] = useState(false)

  useEffect(()=> {

    const succes = pos => {
      setCoords({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      })
    }

    const error = () => {
      setHasError(true)
      setIsLoading(false)
    }

    navigator.geolocation.getCurrentPosition(succes, error)
  }, [] )

  console.log(coords);
    

  useEffect(() => {
    if(coords){
      const API_KEY = 'cbd04bdcf607050d1b35fa517b8cb5ba'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`

      axios.get(url)
      .then(res => {
        setWeather(res.data)
      const celsius = (res.data.main.temp - 273.15).toFixed(1)
      const fahrenheit = (celsius * 9/5 +32).toFixed(1)
      setTemp({celsius, fahrenheit})
    })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
    }
    
    }, [coords])
  
    console.log(weather)

  return (
    <div className='app'>
      {
        isLoading
        ? <h1>Loading . . .</h1>
        : (
          hasError
          ? <h1>Please enable your location.</h1>        
          : (
        <WeatherCard
          weather={weather}
          temp={temp}
          /> )
        )
      }
      

    </div>
  )
}

export default App
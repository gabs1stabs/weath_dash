import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Watfo() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState('');

  const apiKey = "YOUR_API_KEY";
  
  // Fetch current weather data when city changes
  useEffect(() => {
    if (city) {
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      axios.get(currentWeatherUrl)
        .then(response => {
          setCurrentWeather({
            temp: response.data.main.temp,
            description: response.data.weather[0].description,
            city: city
          });
        })
        .catch(error => {
          console.error("Error fetching current weather:", error);
        });
    }
  }, [city]);  // Runs when `city` changes

  // Fetch forecast data when city changes
  useEffect(() => {
    if (city) {
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

      axios.get(forecastUrl)
        .then(response => {
          setForecast(response.data.list);
        })
        .catch(error => {
          console.error("Error fetching forecast data:", error);
        });
    }
  }, [city]);  // Runs when `city` changes

  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); setCity(city); }}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {currentWeather && (
        <div>
          <h3>Current Weather in {currentWeather.city}</h3>
          <p>Temperature: {currentWeather.temp}°C</p>
          <p>Description: {currentWeather.description}</p>
        </div>
      )}

      {forecast && (
        <div>
          <h3>Forecast</h3>
          <ul>
            {forecast.map((item, index) => (
              <li key={index}>
                {new Date(item.dt_txt).toLocaleString()}: {item.main.temp}°C, {item.weather[0].description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import axios from 'axios';

export default function Ouf() {
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState("");
  
  const apiKey = "16dca2417ad00c1d36adcd50992f59df";  // Replace with your API key

  const Search = (e) => {
    e.preventDefault();
    
    if (!city.trim()) {
      alert("Please enter a city name.");
      return;
    }

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(forecastUrl)
      .then((res) => {
        const data = res.data;
        const forecastData = data.list.map(item => ({
          date: new Date(item.dt * 1000).toLocaleString(),
          temp: item.main.temp,
          description: item.weather[0].description,
        }));
        setForecast(forecastData);
      })
      .catch((err) => {
        console.error(err);
        setForecast(null);
        alert("Error fetching forecast data.");
      });
  };

  return (
    <div>
      <form onSubmit={Search}>
        <input 
          type="text" 
          placeholder="Enter city" 
          onChange={(e) => setCity(e.target.value)} 
          value={city} 
        />
        <button type="submit">Search</button>
      </form>

      {forecast && (
        <div>
          <h3>Weather Forecast:</h3>
          {forecast.map((item, index) => (
            <div key={index}>
              <p>{item.date}</p>
              <p>{item.description}</p>
              <p>Temperature: {item.temp}°C</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Nav from "./comps/Nav";
import Home from "./comps/Home";
import Favs from "./comps/Favs";
import Currentweather from "./comps/Currentweather";
import Dashboard from "./comps/Dashboard";
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { useState ,useEffect} from 'react';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null); 
  const [city, setCity] = useState("");          
  const apiKey = "16dca2417ad00c1d36adcd50992f59df"; 


  function handleCurrentweather() {
    const apiUrlcur = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrlcur)
      .then((res) => {
        const data1 = res.data;
        const weatherdata = {
          city: city,
          des: data1.weather[0].description,
          icon: data1.weather[0].icon,
          tempnow: data1.main.temp,
          tempmax: data1.main.temp_max,
          tempmin: data1.main.temp_min,
        };
        setWeather(weatherdata);  
      })
      .catch((err) => {
        console.error(err);
        setWeather(null);
        alert("Error fetching weather data. Please check the city name and try again.");
      });
  }
  function handleForecast(){
    const apiUrlfor = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;;

    axios.get(apiUrlfor)
         .then((response) => {
           const data2 = response.data;
           const forecastData = data2.list.map(item => ({
            date: new Intl.DateTimeFormat("en-US", {
              weekday: "long",       // Full weekday name (e.g., "Thursday")
              year: "numeric",       // Full year (e.g., "2024")
              month: "long",         // Full month name (e.g., "December")
              day: "numeric",        // Day of the month (e.g., "12")
              hour: "numeric",       // Hour (e.g., "10")
              minute: "numeric",     // Minute (e.g., "00")
              hour12: true,          // 12-hour format with AM/PM
            }).format(new Date(item.dt * 1000)),             temp: item.main.temp,
             description: item.weather[0].description,
             icon: item.weather[0].icon,
           }));
           setForecast(forecastData);  
         })
         .catch((err) => {
          console.error(err);
          setForecast(null);
          alert("Error fetching forecast data. Please check the city name and try again.");
        });
  }
  useEffect(() => {
    if (city) {
      handleCurrentweather();
      handleForecast();
    }
  }, []); 
  

  return (
    <div>
      <Nav weather={weather} forecast={forecast} handleCurrentweather={handleCurrentweather} setCity={setCity} city={city} handleForecast={handleForecast}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Currentweather" element={<Currentweather weather={weather} />} />
        <Route path="/Dashboard" element={<Dashboard forecast={forecast} />} />
        <Route path="/Favs" element={<Favs />} />
      </Routes>
    </div>
  );
}

export default App;

import "./Nav.css";
import React from "react";
import { Link } from "react-router-dom";

export default function Nav({ handleCurrentweather, setCity, city,handleForecast }) {
  return (
    <div style={{ fontFamily: "Arial" }}>
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="navbar-brand logo">
          <Link to="/"><img src="pics/log2.png" alt="Weather App Logo" /></Link>
        </div>
        
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        />
        
        <div className="collapse navbar-collapse" id="navbarContent">
          <form className="form-inline mx-auto search-bar" onSubmit={(e)=>e.preventDefault(e)}>
            <input
              onChange={(e) => setCity(e.target.value)}
              value={city}
              className="form-control"
              type="search"
              placeholder=" Enter your desired city"
              aria-label="Search city"
            />
          </form>
          
          
          <ul className="navbar-nav  nav-links">
            <li className="nav-item">
              <Link to="/Currentweather" className="nav-link text-light" onClick={handleCurrentweather}>Current weather</Link>
            </li>
            <li className="nav-item">
              <Link to="/Dashboard" className="nav-link text-light" onClick={handleForecast}>Forecast</Link>
            </li>
            <li className="nav-item">
              <Link to="/Favs" className="nav-link text-light">Favs</Link>
            </li>
          </ul>
        </div>
      </nav>
      
     

      
    </div>
  );
}

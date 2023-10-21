import React, {useState, useRef} from 'react';
import './weather.css';
 function WeatherApp() {
 const [currentWeather, setCurrentWeather] = useState(null);
 const [city, setcity] = useState(null);
 const notificationMsg = useRef(null);
 const inputRef = useRef(null);
 const dynamicWidth = () => {
   if(inputRef.current){
     const remWidth = inputRef.current.scrollWidth/16 ;
     inputRef.current.style.width = remWidth + "rem";
   }
 };
 const handleSearch = (ev) => {
   if (city=== '') {
     notificationMsg.current.style.display= 'block';
     notificationMsg.current.innerHTML= "Fill in your search city";
     return false ;
  }
    else {
     notificationMsg.current.style.display= 'block';
     notificationMsg.current.innerHTML= 'loading.....';
     const fetchData = async () => {
       try{
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1f63321042cd18d263f0a2cbed541f06&units=metric`);
            if (!response.ok) {
              throw new Error( notificationMsg.current.innerHTML = `${city} weather data unavailable `)
            }
          const data = await response.json();
            notificationMsg.current.style.display = "none";
            setCurrentWeather(data);
        }       catch(error) {
         notificationMsg.current.style.display= 'block';
         notificationMsg.current.innerHTML= error ;
       }
     };
     fetchData();
     setcity(null);
   }
 }
  return (

    <div className="container">
        <header>Weather Now </header>
        <div>
       <div className="card">
          <input type= "text"  name = "searchInput" value= {city} placeholder= 'search city.......' required
          onChange= {(ev) => {
            setcity(ev.target.value);
            dynamicWidth()}}
          ref = {inputRef} style = {{width: 'auto'}}/>
          <span className="search-icon" onClick = {handleSearch} >search</span>
        </div>
        <div className= "notification" ref= {notificationMsg}></div>
        </div>
        <div>
          {(currentWeather) ?
         <div className="container-con">
            <img src= {`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`} alt= 'weather-icon'  />
            <h1 className= 'temp'> {Math.round(currentWeather.main.temp)}&deg;C</h1>
            <p className="description"> {currentWeather.weather[0].description} </p>
            <h2 className="location">{`${currentWeather.name},  ${currentWeather.sys.country}`}</h2>
          </div>  : <div></div>
         }
    </div>
    </div>
  );
}

export default WeatherApp ;

import React, { useState, useEffect } from "react";
import bg from "./assets/bg.jpg";

const App = () => {
  const [weather, setWeather] = useState("fog");
  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [res, setRes] = useState([]);
  const [temp, setTemp] = useState("xyz");
  const [pressure, setPressure] = useState("xyz");
  const [humidity, setHumidity] = useState("xyz");
  const [icon, setIcon] = useState("xyz");

  const fetchRequest = async () => {
    const data = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${weather}&client_id=uDtm2Gvj3OWSI3VsCI59n6xInNC8icS-YrsRj_T0pX8&per_page=1`
    );
    const dataJ = await data.json();
    const result = dataJ.results;
    setRes(result[0].urls.small);
  };
  useEffect(() => {
    fetchRequest();
  }, [weather]);

  const clickHandler = () => {
    getLocation();
    // setWeather("sun");
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("upgrade browser dummy");
    }
  };

  const showPosition = (position) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=6300b998be22bf4e80fdde8e6a877773&units=metric`
    )
      .then((response) => response.json())
      .then((actualData) => setData(actualData))
      .then(() => setIsLoaded(true));
  };

  useEffect(() => {
    isLoaded && console.log(data);
    isLoaded && setWeather(data.weather[0].description);
    isLoaded && setTemp(data.main.temp);
    isLoaded && setHumidity(data.main.humidity);
    isLoaded && setPressure(data.main.pressure);
    isLoaded && setIcon(data.weather[0].icon);
  }, [data]);

  return (
    <>
      <img src={isLoaded ? res : bg} alt="" className="bg-image" />
      <div className="container-2">
        <div className="container">
          <div className={`heading ${isLoaded ? "true" : null}`}>
            WebWeatherApp
          </div>
          <div className={`${isLoaded ? null : "true"}`}>
            <img
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              className="img-container"
              alt=""
            />
          </div>
          <div className={`weather-container ${isLoaded ? null : "true"} `}>
            {weather}
          </div>
          <div className={`temp ${isLoaded ? null : "true"}`}>
            <h1 className="">
              {temp} <span>&#8451;</span>
            </h1>
          </div>
          <div className={`pressure ${isLoaded ? null : "true"}`}>
            Pressure: {pressure} hPa
          </div>
          <div className={`humidity ${isLoaded ? null : "true"}`}>
            Humidity: {humidity} %
          </div>
          <div className="button-div">
            <button className="button" onClick={clickHandler}>
              Locate Me
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

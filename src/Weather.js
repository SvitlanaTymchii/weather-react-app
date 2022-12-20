import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  let [city, setCity] = useState("");
  let [temperature, setTemperature] = useState(null);
  let [description, setDescription] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [wind, setWind] = useState(null);
  let [imgUrl, setImgUrl] = useState(null);
  let url = null;
  const [loaded, setLoaded] = useState(false);

  function setWeather(response) {
    setLoaded(true);
    setTemperature(response.data.main.temp);
    setDescription(response.data.weather[0].description);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setImgUrl(
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }

  function Searching(event) {
    event.preventDefault();
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3a94f3778290bfeee61278505dbbe51d&units=metric`;
    axios.get(url).then(setWeather);
  }

  function updateCity(event) {
    //event.preventDefault();
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={Searching}>
      <input type="search" onChange={updateCity} />
      <input type="submit" value="Search" />
    </form>
  );

  if (loaded) {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature: {Math.round(temperature)}ºC</li>
          <li>Description: {description}</li>
          <li>Wind: {wind}km/h</li>
          <li>Humidity: {humidity}%</li>
          <li>
            <img src={imgUrl} alt={description} />{" "}
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}

//<li> <img src=${imgUrl}> </li>

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const WeatherApp = () => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState({});

  const apiKey = "f56f24967aaf51182d1d4df628297c6d";

  const getWeatherDetails = (cityName) => {
    if (!cityName) return;
    const apiURL =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiKey;
    axios
      .get(apiURL)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getWeatherDetails("Islamabad");
  }, []);

  const searchHandler = () => {
    getWeatherDetails(inputValue);
    setInputValue("");
  };
  return (
    <>
      <div className="col-md-12">
        <div className="weather-bg">
          <h1>Weather App</h1>
          <div className="d-grid gap-3 col-4 mt-4">
            <input
              type="text"
              placeholder="Enter city name"
              value={inputValue}
              className="form-control"
              autoFocus
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={searchHandler}
            >
              Search
            </button>
          </div>
          <div className="col-md-12 text-center mt-5">
            <div className="shadow rounded weatherResultBox ">
              <img
                src="/images/weather-icon.png"
                className="weatherIcon"
                alt=""
              />
              <h5 className="weatherCity">{data?.name}</h5>
              <h6 className="weatherTemp">
                {data.main &&
                  data.main.temp &&
                  (data.main.temp - 273.15).toFixed(2)}
                °C
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherApp;

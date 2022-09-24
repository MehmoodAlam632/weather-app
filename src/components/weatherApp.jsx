import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const WeatherApp = () => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const getWeatherDetails = (cityName) => {
    if (!cityName) {
      alert("Please enter a city!");
    } else {
      // const apiURL =
      //   "http://api.openweathermap.org/data/2.5/weather?q=" +
      //   cityName +
      //   "&appid=" +
      //   apiKey;

      setLoading(true);
      setError(false);
      const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=69e67c8bdadf637986d2a5ad89d314c4&units=metric`;
      axios
        .get(apiURL)
        .then((res) => {
          setData(res.data);
          setLoading(false);
          setError(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(true);
        });
    }
  };

  useEffect(() => {
    getWeatherDetails("karachi");
  }, []);

  const searchHandler = () => {
    getWeatherDetails(inputValue);
    setInputValue("");
  };

  console.log("error :>> ", error);
  return (
    <>
      <div className="col-md-12">
        <div className="weather-bg">
          <h1 className="heading">Weather App</h1>
          <div className="d-grid gap-3 col-4 mt-4">
            <input
              type="text"
              placeholder="Enter city name"
              value={inputValue}
              className="form-control input-field"
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
          <div className="col-md-12 text-center mt-5 ">
            <div className="shadow rounded weatherResultBox ">
              {loading ? (
                <div class="lds-roller">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                <>
                  {error ? (
                    <div className="error-img">
                      <img src="/images/404.webp" alt="" />
                    </div>
                  ) : (
                    <>
                      <img
                        src="/images/weather-icon.png"
                        className="weatherIcon"
                        alt=""
                      />
                      <h5 className="weatherCity">{data?.name}</h5>
                      <h6 className="weatherTemp">
                        {data.main &&
                          data.main.temp &&
                          data.main.temp.toFixed(1)}
                        °C
                      </h6>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherApp;

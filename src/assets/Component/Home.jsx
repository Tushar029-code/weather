import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Home() {
  let [cityname, setCityName] = useState("");
  let [allCity, setAllCity] = useState([]);
  let [weather, setWeather] = useState([]);

  let formhandler = (event) => {
    let oldweatherdata = [...weather];
    event.preventDefault();
    if (!allCity.includes(cityname)) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=0f2fb94282ad6a3dbf2387c407b74806&units=metric`
        )
        .then((res) => {
          oldweatherdata.push(res.data);
          setAllCity([...allCity, cityname]);
          setWeather(oldweatherdata);
        })
        .catch((error) => {
          toast.error("City not found");
        });
    } else {
      toast.error("Already exists");
    }
  };

  useEffect(() => {
    console.log(weather);
  }, [weather]);

  return (
    <>
      <div className="max-w-full xs:max-w-full">
        <div className="max-w-6xl mx-auto">
          <h1 className="xl:text-5xl  p-4 font-bold text-transparent bg-gradient-to-bl from-gray-700 via-red-600 to-green-600 bg-clip-text">
            Search City Name
          </h1>
        </div>
        <div className="max-w-6xl mx-auto xl:mt-20">
          <ToastContainer />
          <form className="max-w-md mx-auto rounded flex" onSubmit={formhandler}>
            <input
              type="text"
              value={cityname}
              onChange={(event) => setCityName(event.target.value)}
              className="w-full rounded-xl p-2 outline-none"
              placeholder="Enter city name"
            />
            <button className="w-1/3 p-2 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 rounded-xl">
              Save Me
            </button>
          </form>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 max-w-6xl mx-auto">
          {weather.length >= 1
            ? weather.map((value, index) => {
                return (
                  <div className="border-2 w-full mt-2 text-2xl p-5 rounded-2xl font-bold font-serif bg-gradient-to-r from-blue-200 via-sky-100 to-yellow-200 hover:to-red-300" key={index}>
                    <span>
                      {value.name} &nbsp; <mark>{value.sys.country}</mark>
                    </span>
                    <p className="text-2xl">{value.main.temp} °C</p>
                    <img
                      src={`https://openweathermap.org/img/w/${value.weather[0].icon}.png`}
                      alt=""
                    />
                    <p>{value.weather[0].description}</p>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
}
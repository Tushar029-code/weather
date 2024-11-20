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
          toast.error("city not found");
        });
    } else {
      toast.error("allready exits");
    }
  };
  useEffect(() => {
    console.log(weather);
  }, [weather]);

  return (
    <>
      <div className="max-w-[100%] xs:max-w-[100%] ">
        <div className="max-w-[1320px] mx-auto ">
          <h1 class="text-5xl p-4   font-bold from-gray-700 via-red-600 to-green-600 bg-gradient-to-bl bg-clip-text text-transparent">
            search city name
          </h1>
        </div>
        <div className="max-w-[1320px] xs-w-[1320px] mx-auto mt-20">
          <ToastContainer />
          <form className="max-w-[500px]  rounded" onSubmit={formhandler}>
            <input
              type="text"
              value={cityname}
              onChange={(event) => setCityName(event.target.value)}
              className="w-[80%] rounded-xl p-2  outline-none"
            />
            <button className="w-[20%] p-2 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 rounded-xl">
              save me
            </button>
          </form>
        </div>
        <div className="grid grid-cols-4  mt-4 max-w-[1320px] mx-auto">
          {weather.length >= 1
            ? weather.map((value, index) => {
                return (
                  <div className="border-2  w-[300px] mt-2  text-2xl  p-5  rounded-2xl font-bold font-serif bg-gradient-to-r from-blue-200 from-1% via-sky-100 via-25% to-yellow-200 to-90%  hover:to-red-300 ">
                    <span className="">
                      {value.name} &nbsp; <mark>{value.sys.country}</mark>
                    </span>
                    <p className=" text-2xl">{value.main.temp}</p>
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

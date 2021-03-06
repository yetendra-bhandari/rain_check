import React from "react";
import Thunderstorm from "../assets/weather/Thunderstorm.svg";
import DrizzleDay from "../assets/weather/DrizzleDay.svg";
import DrizzleNight from "../assets/weather/DrizzleNight.svg";
import RainDay from "../assets/weather/RainDay.svg";
import RainNight from "../assets/weather/RainNight.svg";
import SnowDay from "../assets/weather/SnowDay.svg";
import SnowNight from "../assets/weather/SnowNight.svg";
import Atmosphere from "../assets/weather/Atmosphere.svg";
import ClearDay from "../assets/weather/ClearDay.svg";
import ClearNight from "../assets/weather/ClearNight.svg";
import CloudsDay from "../assets/weather/CloudsDay.svg";
import CloudsNight from "../assets/weather/CloudsNight.svg";

function WeatherIcon(props) {
  const wID = Number(props.wID);
  const hours = new Date().getHours();
  const isDay = hours >= 6 && hours < 18;
  let weather = ClearDay;
  let info = "ClearDay";
  if (wID >= 200 && wID <= 232) {
    weather = Thunderstorm;
    info = "Thunderstorm";
  } else if (wID >= 701 && wID < 781) {
    weather = Atmosphere;
    info = "Atmosphere";
  } else if (isDay) {
    if (wID >= 300 && wID <= 321) {
      weather = DrizzleDay;
      info = "DrizzleDay";
    } else if (wID >= 500 && wID <= 531) {
      weather = RainDay;
      info = "RainDay";
    } else if (wID >= 600 && wID <= 622) {
      weather = SnowDay;
      info = "SnowDay";
    } else if (wID === 800) {
      weather = ClearDay;
      info = "ClearDay";
    } else if (wID >= 801 && wID <= 804) {
      weather = CloudsDay;
      info = "CloudsDay";
    }
  } else {
    if (wID >= 300 && wID <= 321) {
      weather = DrizzleNight;
      info = "DrizzleNight";
    } else if (wID >= 500 && wID <= 531) {
      weather = RainNight;
      info = "RainNight";
    } else if (wID >= 600 && wID <= 622) {
      weather = SnowNight;
      info = "SnowNight";
    } else if (wID === 800) {
      weather = ClearNight;
      info = "ClearNight";
    } else if (wID >= 801 && wID <= 804) {
      weather = CloudsNight;
      info = "CloudsNight";
    }
  }
  return <img className="h-24" src={weather} alt={info} />;
}

export default WeatherIcon;

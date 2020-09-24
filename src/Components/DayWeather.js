import React from "react";
import WeatherIcon from "./WeatherIcon";
import {
  toTitleCase,
  mpsToKmph,
  secondsToDate,
  degToDir,
  secondsToTime,
} from "../helper.js";

function DayWeather(props) {
  if (props.weather === null || props.address === null) {
    return (
      <main>
        <h1>Waiting for API</h1>
      </main>
    );
  }
  return (
    <main>
      <div className="bg-theme text-theme-text">
        <section className="container mx-auto px-4 pb-2 h-64 flex flex-col">
          <div className="flex justify-between">
            <div>
              <p className="flex">
                <strong className="text-6xl font-normal">
                  {typeof props.weather.temp === "number"
                    ? props.weather.temp.toFixed(1)
                    : props.weather.temp.day.toFixed(1)}
                </strong>
                <strong className="text-2xl font-normal mt-4">°C</strong>
              </p>
              {typeof props.weather.temp === "object" &&
              props.weather.temp !== null ? (
                <p className="-mt-6">
                  Minimum
                  <strong className="ml-1 text-lg font-normal tracking-wide">
                    {props.weather.temp.min}°C
                  </strong>
                  , Maximum
                  <strong className="ml-1 text-lg font-normal tracking-wide">
                    {props.weather.temp.max}°C
                  </strong>
                </p>
              ) : (
                <p className="-mt-6">
                  Feels Like
                  <strong className="ml-1 text-lg font-normal tracking-wide">
                    {props.weather.feels_like}°C
                  </strong>
                </p>
              )}
            </div>
            <figure className="-mt-3 -mr-5 h-24 w-24 select-none">
              <WeatherIcon wID={props.weather.weather[0].id} />
            </figure>
          </div>
          <p className="text-xl">
            {toTitleCase(props.weather.weather[0].description)}
          </p>
          <div className="mt-auto flex flex-col-reverse sm:flex-row sm:justify-between sm:items-end">
            <article className="mt-1 leading-snug">
              <p>{secondsToDate(props.weather.dt)}</p>
              <p className="text-xl">
                {props.address.city}, {props.address.state}
              </p>
            </article>
            <article className="sm:text-right">
              <p>Humidity: {props.weather.humidity}%</p>
              <p>Wind Speed: {mpsToKmph(props.weather.wind_speed)}km/h</p>{" "}
              <p>Wind Direction: {degToDir(props.weather.wind_deg)}</p>
            </article>
          </div>
        </section>
      </div>
      <section className="mt-2 container mx-auto p-4">
        <h1 className="text-2xl">Additional Weather Data</h1>
        <article className="mt-1 grid leading-none gap-2 sm:grid-cols-2">
          <p>
            Sunrise Time{" "}
            <strong className="font-normal text-xl">
              {secondsToTime(props.weather.sunrise)}
            </strong>
          </p>
          <p>
            Sunset Time{" "}
            <strong className="font-normal text-xl">
              {secondsToTime(props.weather.sunset)}
            </strong>
          </p>
          <p>
            Cloudiness{" "}
            <strong className="font-normal text-xl">
              {props.weather.clouds}%
            </strong>
          </p>
          <p>
            Atmospheric Pressure{" "}
            <strong className="font-normal text-xl">
              {props.weather.pressure} hPa
            </strong>
          </p>
          <p>
            Dew Point{" "}
            <strong className="font-normal text-xl">
              {props.weather.dew_point}°C
            </strong>
          </p>
          <p>
            UV Index{" "}
            <strong className="font-normal text-xl">{props.weather.uvi}</strong>
          </p>
          {props.weather.pop && (
            <p>
              Precipitation Probability{" "}
              <strong className="font-normal text-xl">
                {(props.weather.pop * 100).toFixed(0)}%
              </strong>
            </p>
          )}
          {props.weather.rain && (
            <p>
              Rainfall{" "}
              <strong className="font-normal text-xl">
                {props.weather.rain}mm
              </strong>
            </p>
          )}
        </article>
      </section>
    </main>
  );
}

export default DayWeather;

import React from "react";
import WeatherIcon from "./WeatherIcon";
import { toTitleCase, mpsToKmph, degToDir } from "../helper.js";

function Live(props) {
  if (props.current === null || props.address === null) {
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
          <div className="flex justify-between overflow-hidden">
            <div>
              <p className="flex">
                <strong className="text-6xl font-normal">
                  {props.current.temp.toFixed(1)}
                </strong>
                <strong className="text-2xl font-normal mt-4">°C</strong>
              </p>
              <p className="-mt-6 flex items-baseline">
                Feels Like
                <em className="ml-1 text-lg not-italic tracking-wide">
                  {props.current.feels_like}
                </em>
                <strong className="mt-0.5 text-xs font-normal self-start">
                  °C
                </strong>
              </p>
            </div>
            <figure className="-mt-3 -mr-6 h-24 w-24 select-none">
              <WeatherIcon wID={props.current.weather[0].id} />
            </figure>
          </div>
          <p className="text-xl">
            {toTitleCase(props.current.weather[0].description)}
          </p>
          <div className="mt-auto flex flex-col-reverse sm:flex-row sm:justify-between sm:items-end">
            <p className="mt-1 text-xl">
              {props.address.city}, {props.address.state}
            </p>
            <article className="sm:text-right">
              <p>Humidity: {props.current.humidity}%</p>
              <p>Wind Direction: {degToDir(props.current.wind_deg)}</p>
              <p>Wind Speed: {mpsToKmph(props.current.wind_speed)}km/h</p>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Live;

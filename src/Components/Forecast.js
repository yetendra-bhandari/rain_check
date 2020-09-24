import React from "react";
import Loading from "./Loading";
import { toTitleCase, secondsToWeekDay } from "../helper.js";
import WeatherIcon from "./WeatherIcon";

function Forecast(props) {
  if (props.daily === null) {
    return <Loading />;
  }
  const days = [2, 3, 4, 5, 6, 7];
  return (
    <main>
      <div className="bg-theme text-theme-text">
        <section className="container mx-auto px-4 h-64 flex items-center justify-center">
          <h1 className="text-6xl leading-none">7-Day Weather Forecast</h1>
        </section>
      </div>
      {props.address !== null && (
        <h2 className="mt-4 px-4 text-xl sm:text-center">
          {props.address.city}, {props.address.state}
        </h2>
      )}
      <section className="container mx-auto p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <article className="bg-ui-background rounded-md p-2 text-center flex flex-col items-center">
          <h3>Tomorrow</h3>
          <figure className="-m-5 select-none">
            <WeatherIcon wID={props.daily[1].weather[0].id} />
          </figure>
          <p className="mt-4 leading-none flex items-start">
            <strong className="font-normal text-5xl">
              {props.daily[1].temp.day}
            </strong>
            <span className="ml-0.5 mt-1 text-lg">°C</span>
          </p>
          <p>
            <em className="not-italic">
              {toTitleCase(props.daily[1].weather[0].description)}
            </em>
          </p>
        </article>
        {days.map((day) => (
          <article
            key={day}
            className="bg-ui-background rounded-md p-2 text-center flex flex-col items-center"
          >
            <h3>{secondsToWeekDay(props.daily[day].dt)}</h3>
            <figure className="-m-5 select-none">
              <WeatherIcon wID={props.daily[day].weather[0].id} />
            </figure>
            <p className="mt-4 leading-none flex items-start">
              <strong className="font-normal text-5xl">
                {props.daily[day].temp.day}
              </strong>
              <span className="ml-0.5 mt-1 text-lg">°C</span>
            </p>
            <p>
              <em className="not-italic">
                {toTitleCase(props.daily[day].weather[0].description)}
              </em>
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Forecast;

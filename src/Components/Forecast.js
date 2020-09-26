import React from "react";
import Loading from "./Loading";
import { toTitleCase, secondsToMonthDay, secondsToWeekDay } from "../helper.js";
import WeatherIcon from "./WeatherIcon";

function Forecast(props) {
  document.title = "Rain Check | Forecast";
  if (props.daily == null) {
    return <Loading />;
  }
  const days = [2, 3, 4, 5, 6, 7];
  return (
    <main>
      <div className="bg-theme text-theme-text">
        <section className="container mx-auto px-4 h-64 flex flex-col justify-evenly leading-none">
          <h1 className="text-6xl sm:text-center">7-Day Weather Forecast</h1>
          {props.address != null && (
            <h2 className="px-1 text-xl sm:text-center">
              {props.address.city}, {props.address.state}
            </h2>
          )}
        </section>
      </div>
      <section className="container mx-auto p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <article className="bg-ui-background rounded-md p-2 text-center flex flex-col items-center">
          <h3>{`Tomorrow, ${secondsToMonthDay(props.daily[1].dt)}`}</h3>
          <figure className="-m-5 select-none">
            <WeatherIcon wID={props.daily[1].weather[0].id} />
          </figure>
          <p className="mt-4 leading-none flex items-start">
            <strong className="font-normal text-5xl">
              {props.daily[1].temp.day.toFixed(1)}
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
            <h3>
              {`${secondsToWeekDay(props.daily[day].dt)}, ${secondsToMonthDay(
                props.daily[day].dt
              )}`}
            </h3>
            <figure className="-m-5 select-none">
              <WeatherIcon wID={props.daily[day].weather[0].id} />
            </figure>
            <p className="mt-4 leading-none flex items-start">
              <strong className="font-normal text-5xl">
                {props.daily[day].temp.day.toFixed(1)}
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

import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    document.title = "Rain Check";
    return (
      <main>
        <section className="px-6 h-64 bg-theme text-theme-text flex flex-col justify-center sm:items-center leading-none">
          <h1 className="text-6xl tracking-tight">Rain Check</h1>
          <h2>&nbsp;Your Very Own Weather Information App</h2>
        </section>
        <section className="max-w-screen-md mx-auto p-4 grid sm:grid-cols-2 gap-4">
          <article className="px-3 py-2 bg-ui-background rounded-md flex flex-col">
            <h2 className="text-3xl">Live Weather</h2>
            <p className="mb-2">
              Get live weather information for your location.
            </p>
            <Link
              to="/live"
              className="mt-auto w-full text-center p-2 text-background rounded-sm bg-ui hover:bg-ui-focus focus:outline-none focus:bg-ui-focus"
            >
              Go
            </Link>
          </article>
          <article className="px-3 py-2 bg-ui-background rounded-md flex flex-col">
            <h2 className="text-3xl">Weather Forecast</h2>
            <p className="mb-2">
              Get the weather forecast of the next seven days for your location.
            </p>
            <Link
              to="/forecast"
              className="mt-auto w-full text-center p-2 text-background rounded-sm bg-ui hover:bg-ui-focus focus:outline-none focus:bg-ui-focus"
            >
              Go
            </Link>
          </article>
        </section>
      </main>
    );
  }
}

export default Home;

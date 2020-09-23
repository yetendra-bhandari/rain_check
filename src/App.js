import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./Components/Navigation";
import Home from "./Components/Home";
import Live from "./Components/Live";
import Forecast from "./Components/Forecast";
import About from "./Components/About";
import Footer from "./Components/Footer";

class App extends Component {
  constructor() {
    super();
    this.state = {
      theme: "light",
      weatherData: null,
    };
    if (localStorage.getItem("theme") === "dark") {
      this.state.theme = "dark";
    }
    let weatherData = localStorage.getItem("weatherData");
    if (weatherData !== null) {
      this.state.weatherData = JSON.parse(weatherData);
    }
    this.shouldRefetch = this.shouldRefetch.bind(this);
    this.themeToggle = this.themeToggle.bind(this);
  }
  shouldRefetch() {
    let lastFetch = localStorage.getItem("lastFetch");
    if (lastFetch !== null && new Date().getTime() - lastFetch < 600000) {
      return false;
    }
    return true;
  }
  themeToggle() {
    this.setState(
      (state) => ({
        theme: state.theme === "light" ? "dark" : "light",
      }),
      () => {
        localStorage.setItem("theme", this.state.theme);
      }
    );
  }
  componentDidMount() {
    if (this.shouldRefetch() && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude=minutely,hourly,alerts&appid=9940475995272066d4a856b0b54edf81`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then((weatherData) => {
            this.setState(
              {
                weatherData: weatherData,
              },
              () => {
                localStorage.setItem(
                  "weatherData",
                  JSON.stringify(this.state.weatherData)
                );
                localStorage.setItem("lastFetch", new Date().getTime());
              }
            );
          })
          .catch((error) => {
            console.error(error);
          });
      });
    }
  }
  render() {
    return (
      <Router>
        <div
          className={`min-h-screen flex flex-col text-background-text font-body bg-background transition-colors duration-200 ${this.state.theme}`}
        >
          <Navigation themeToggle={this.themeToggle} />
          <Switch>
            <Route path="/live">
              <Live
                current={
                  this.state.weatherData !== null &&
                  this.state.weatherData.current !== null
                    ? this.state.weatherData.current
                    : null
                }
              />
            </Route>
            <Route path="/forecast">
              <Forecast
                daily={
                  this.state.weatherData !== null &&
                  this.state.weatherData.daily !== null
                    ? this.state.weatherData.daily
                    : null
                }
              />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;

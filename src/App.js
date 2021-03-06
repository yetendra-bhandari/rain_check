import React, { Component } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./Components/Navigation";
import Home from "./Components/Home";
import Live from "./Components/Live";
import Forecast from "./Components/Forecast";
import About from "./Components/About";
import Footer from "./Components/Footer";
import NotFound404 from "./Components/NotFound404";

class App extends Component {
  constructor() {
    super();
    this.state = {
      theme: "light",
      weatherData: null,
      locationData: null,
    };
    if (localStorage.getItem("theme") === "dark") {
      this.state.theme = "dark";
    }
    const weatherData = localStorage.getItem("weatherData");
    const locationData = localStorage.getItem("locationData");
    if (weatherData != null && locationData != null) {
      this.state.weatherData = JSON.parse(weatherData);
      this.state.locationData = JSON.parse(locationData);
    }
    this.shouldRefetch = this.shouldRefetch.bind(this);
    this.themeToggle = this.themeToggle.bind(this);
  }
  shouldRefetch() {
    const lastWeatherFetch = localStorage.getItem("lastWeatherFetch");
    const lastLocationFetch = localStorage.getItem("lastLocationFetch");
    if (
      lastWeatherFetch != null &&
      lastLocationFetch != null &&
      new Date().getTime() - lastWeatherFetch < 600000 &&
      new Date().getTime() - lastLocationFetch < 600000
    ) {
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
      this.setState(
        {
          weatherData: null,
          locationData: null,
        },
        () => {
          navigator.geolocation.getCurrentPosition((position) => {
            fetch(
              `https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&exclude=minutely,hourly,alerts&appid=${process.env.REACT_APP_WEATHER_API_KEY}`,
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
                    if (this.state.weatherData != null) {
                      localStorage.setItem(
                        "weatherData",
                        JSON.stringify(this.state.weatherData)
                      );
                      localStorage.setItem(
                        "lastWeatherFetch",
                        new Date().getTime()
                      );
                    }
                  }
                );
              })
              .catch((error) => {
                console.error(error);
              });
            fetch(
              `https://us1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=10&format=json`,
              {
                method: "GET",
              }
            )
              .then((response) => response.json())
              .then((locationData) => {
                this.setState(
                  {
                    locationData: locationData,
                  },
                  () => {
                    if (this.state.locationData != null) {
                      localStorage.setItem(
                        "locationData",
                        JSON.stringify(this.state.locationData)
                      );
                      localStorage.setItem(
                        "lastLocationFetch",
                        new Date().getTime()
                      );
                    }
                  }
                );
              })
              .catch((error) => {
                console.error(error);
              });
          });
        }
      );
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
            <Route exact path="/live">
              <Live
                weather={
                  this.state.weatherData != null &&
                  this.state.weatherData.current != null
                    ? this.state.weatherData.current
                    : null
                }
                address={
                  this.state.locationData != null &&
                  this.state.locationData.address != null
                    ? this.state.locationData.address
                    : null
                }
              />
            </Route>
            <Route exact path="/forecast">
              <Forecast
                daily={
                  this.state.weatherData != null &&
                  this.state.weatherData.daily != null
                    ? this.state.weatherData.daily
                    : null
                }
                address={
                  this.state.locationData != null &&
                  this.state.locationData.address != null
                    ? this.state.locationData.address
                    : null
                }
              />
            </Route>
            <Route exact path="/about" component={About} />
            <Route exact path="/" component={Home} />
            <Route path="*">
              <NotFound404 theme={this.state.theme} />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;

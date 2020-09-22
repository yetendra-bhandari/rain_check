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
  constructor(props) {
    super(props);
    this.state = { theme: "light" };
    this.themeToggle = this.themeToggle.bind(this);
  }
  themeToggle() {
    this.setState((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    }));
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
              <Live />
            </Route>
            <Route path="/forecast">
              <Forecast />
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

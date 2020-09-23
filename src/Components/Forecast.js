import React, { Component } from "react";

class Forecast extends Component {
  render() {
    return (
      <main>
        <h1>{JSON.stringify(this.props.daily)}</h1>
      </main>
    );
  }
}

export default Forecast;

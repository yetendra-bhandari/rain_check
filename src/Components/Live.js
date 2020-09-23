import React, { Component } from "react";

class Live extends Component {
  render() {
    if (this.props.current === null) {
      return (
        <main>
          <h1>Waiting for API</h1>
        </main>
      );
    }
    return (
      <main>
        <h1>{this.props.current.dt}</h1>
      </main>
    );
  }
}

export default Live;

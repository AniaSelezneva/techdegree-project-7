import React, { Component } from "react";

class Photo extends Component {
  state = {};
  render() {
    return (
      <li>
        <img src={this.props.src} alt=""></img>
      </li>
    );
  }
}

export default Photo;

import React, { Component } from "react";
import Photo from "./Photo";
import Loader from "../loader.gif";

class PhotoContainer extends Component {
  render() {
    return (
      <div className="photo-container">
        {/*Loader*/}
        <img
          src={Loader}
          className={`search-loading ${this.props.loading ? "show" : "hide"}`}
          alt="Loader"
        />
        <h2>{this.props.totalResults > 0 ? this.props.query : ""}</h2>
        <ul>
          {this.props.urls.map(url => (
            <Photo src={url} key={this.props.urls.indexOf(url)} />
          ))}
        </ul>
      </div>
    );
  }
}

export default PhotoContainer;

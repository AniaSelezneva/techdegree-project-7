import React, { Component } from "react";

class Nav extends Component {
  state = {};

  handleClick = query => {
    this.props.fetchSearchResults(query, 1);
  };

  render() {
    return (
      <nav className="main-nav">
        <ul>
          <li>
            <a
              href="/search?query=cat"
              onClick={event => this.handleClick("cat")}
            >
              Cats
            </a>
          </li>
          <li>
            <a href="/search?query=dog">Dogs</a>
          </li>
          <li>
            <a href="/search?query=dolphin">Dolphins</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;

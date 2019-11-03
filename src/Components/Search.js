import React, { Component } from "react";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
  }

  handleSearch = event => {
    this.props.setLoader(true);
    const query = event.target.value;
    this.setState({ query });
    if (!query) {
      this.props.setQuery("");
      this.redirect(`/`);
    } else {
      this.props.fetchSearchResults(query);
      this.props.setQuery(query);
      this.redirect(`/search`);
    }
  };

  redirect = path => {
    this.props.history.push(path);
  };

  componentDidMount = () => {
    const query = this.props.location.search.replace(/.+(=)/, "");
    this.setState({ query }, () => {
      this.props.fetchSearchResults(query);
    });
    this.props.setQuery(query);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.redirect(`/search?query=${this.state.query}`);
  };

  render() {
    const { query } = this.state;
    return (
      <form className="search-form" onSubmit={this.handleSubmit}>
        <input
          value={query}
          type="search"
          name="query"
          placeholder="Search"
          onChange={event => {
            this.handleSearch(event);
          }}
          required
        />
        <button type="submit" className="search-button">
          <svg
            fill="#fff"
            height="24"
            viewBox="0 0 23 23"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={this.handleSubmit}
          >
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </button>
      </form>
    );
  }
}

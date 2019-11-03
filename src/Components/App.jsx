import React, { Component } from "react";
import "../index.css";
import Config from "../config.js";
import axios from "axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//import components
import Nav from "./Nav";
import PhotoContainer from "./PhotoContainer";
import Search from "./Search";
import NotFound from "./NotFound";
import PageNavigation from "./PageNavigation";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      urls: [],
      loading: false,
      totalResults: 0,
      totalPages: 0,
      currentPageNumber: 1,
      message: ""
    };
    this.cancel = "";
  }

  //set "query" state from Search component
  setQuery = query => {
    this.setState({ query });
  };

  //set "loader" state from Search component
  setLoader = bool => {
    this.setState({ loading: bool });
  };

  //handle clicks on "prev" and "next" buttons
  handlePageClick = type => {
    const updatePage =
      type === "prev"
        ? this.state.currentPageNumber - 1
        : this.state.currentPageNumber + 1;
    this.setState({ currentPageNumber: updatePage });
    if (!this.state.loading) {
      this.setState({ loading: true }, () => {
        this.fetchSearchResults(this.state.query, updatePage);
      });
    }
  };

  //get total amount of pages
  getPageCount = (total, denominator) => {
    const divisible = 0 === total % denominator; //true or false
    const valueToBeAdded = divisible ? 0 : 1;
    return Math.floor(total / denominator) + valueToBeAdded;
  };

  //fetch search results, deal with "not found" situation, update state
  fetchSearchResults = (searchText, updatedPageNumber) => {
    updatedPageNumber = this.state.currentPageNumber;
    const pageNumber = updatedPageNumber ? `&page=${updatedPageNumber}` : ``;
    //cancel previous request, not to have too many of them
    if (this.cancel) {
      this.cancel.cancel();
    }
    this.cancel = axios.CancelToken.source();

    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${Config}&tags=${searchText}${pageNumber}&per_page=24&format=json&nojsoncallback=1`,
        { cancelToken: this.cancel.token }
      )
      .then(response => {
        const totalResults = response.data.photos.total;
        const totalPages = this.getPageCount(totalResults, 24);
        this.makeURLarray(response.data.photos.photo); //set a "urls" state to pass to "PhotoContainer" component
        //set a "message" state if there are no results
        if (totalResults == 0) {
          this.setState({
            message: "Sorry, nothing was found"
          });
        } else {
          this.setState({
            message: ""
          });
        }
        //update state
        this.setState({
          loading: false,
          totalResults,
          totalPages,
          currentPageNumber: updatedPageNumber
        });
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          //do nothing
        } else {
          // handle usual errors
          console.log("Something went wrong: ", error.message);
        }
      });
  };

  //helper function to use in fetchSearchResults function
  makeURLarray(results) {
    const urls = results.map(
      result =>
        `https://farm${result.farm}.staticflickr.com/${result.server}/${result.id}_${result.secret}_m.jpg`
    );
    this.setState({ urls });
  }

  //wrapper for "Search", "PhotoContainer" and "PageNavigation" components
  wrapper = props => {
    const {
      loading,
      currentPageNumber,
      totalPages,
      urls,
      query,
      totalResults,
      message
    } = this.state;

    let hasResults; //needed to hide "prev" button
    if (this.state.totalResults === 0) {
      hasResults = false;
    } else {
      hasResults = true;
    }

    const showPrevLink = 1 < currentPageNumber && hasResults;
    const showNextLink = totalPages > currentPageNumber;

    return (
      <>
        <Search
          {...props}
          fetchSearchResults={this.fetchSearchResults}
          setLoader={this.setLoader}
          setTotal={this.setTotal}
          setQuery={this.setQuery}
        />
        <Nav />

        {query !== "" ? (
          <PhotoContainer
            totalResults={totalResults}
            query={query}
            urls={urls}
            loading={loading}
          />
        ) : (
          ""
        )}
        {totalResults > 0 && query !== "" ? (
          <PageNavigation
            handleClick={this.handlePageClick}
            loading={loading}
            showPrevLink={showPrevLink}
            showNextLink={showNextLink}
          />
        ) : (
          <h2>{message}</h2>
        )}
      </>
    );
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/search" render={props => this.wrapper(props)} />
          <Route path="/nav" component={Nav} />
          <Route exact path="/" render={props => this.wrapper(props)}></Route>
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

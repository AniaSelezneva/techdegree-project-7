import React, { Component } from 'react';
import './index.css';
import Config from './config.js';
import axios from 'axios';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import NotFound from './components/NotFound';

//components
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';

export default class App extends Component {  

  constructor () {
    super();
    this.state = {
      photos: [],
      loading: true
    }
  }

  //perform search for 'cats' initially
  componentDidMount () {
    this.performSearch()
  }

  performSearch = (query = 'cats') => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${Config}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        photos: response.data,
        loading: false
      })
    })
    .catch(error => {
      console.log('Error fetching and parsing data: ' + error)
    })
  }

  //trying to get input value to pass it to PhotoContainer
  // getSearchValue = (value) => {
  //   return value;
  // }

  displayLoading = (isLoading) => {
    return (
      (isLoading)
      ? <p>Loading...</p>
      :<PhotoContainer data={this.state.photos} searchValue={this.getSearchValue}/>
    )
  }

  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/dogs" component={Nav}>
            <div className="container">
              <Nav onSearch={this.performSearch}/>
              { this.displayLoading (this.state.loading)} 
            </div>
          </Route>

          <Route path="/cats" component={Nav}>
            <div className="container">
              <Nav onSearch={this.performSearch}/>
              { this.displayLoading (this.state.loading)} 
            </div>
          </Route>

          <Route path="/hamsters" component={Nav}>
            <div className="container">
              <Nav onSearch={this.performSearch}/>
              { this.displayLoading (this.state.loading)} 
            </div>
          </Route>

          <Route exact path="/search" component={Nav}>
            <div className="container">
              <Nav onSearch={this.performSearch}/>
              { this.displayLoading (this.state.loading)} 
            </div>
          </Route>

          {/* <Route path="/search/:search" component={Nav}>
            <div className="container">
              <Nav onSearch={this.performSearch}
                getSearchValue={() => this.getSearchValue}/>
              { this.displayLoading (this.state.loading)} 
            </div>
          </Route> */}

          <Route path="/nav" component={Nav}>
            <div className="container">
              <Nav onSearch={this.performSearch}/>
              { this.displayLoading (this.state.loading)} 
            </div>
          </Route>

          <Route path="/link" component={Nav}>
            <div className="container">
              <Nav onSearch={this.performSearch}/>
              { this.displayLoading (this.state.loading)} 
            </div>
          </Route>

          <Route exact path="/" component={Nav}>
            <div className="container">
              <Nav onSearch={this.performSearch}/>
              { this.displayLoading (this.state.loading)} 
            </div>
          </Route>

          <Route component={NotFound}/>

        </Switch>
      </BrowserRouter>
    )
  }
}


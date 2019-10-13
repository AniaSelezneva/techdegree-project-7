import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Config from './config.js';
import axios from 'axios';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

//components
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';
import Search from './components/Search';
//import Dogs from './components/Dogs';
//import Cats from './components/Cats';
//import Hamsters from './components/Hamsters';
//import NotFound from './components/NotFound';

export default class App extends Component {  

  constructor () {
    super();
    this.state = {
      photos: [],
      loading: true
    }
  }

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

  searchAccordingToURL (url) {
    
  }
    render () {
      return (
          <BrowserRouter>
            <div className="container">
            {/* ANIMALS ROUTES */}
              <Search onSearch={this.performSearch} />
              <Nav choose={this.performSearch}/>
              {
                (this.state.loading)
                ? <p>Loading...</p>
                :<PhotoContainer data={this.state.photos} />
              } 
            </div>
          </BrowserRouter>
        )
    }
}

ReactDOM.render (
  <App />,
  document.querySelector('#root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import { NavLink,
        BrowserRouter,
        Route } from 'react-router-dom';
//import Dogs from './Dogs';

const Link = (props) => {
    return (
      <nav className="main-nav">
        <ul>
          <BrowserRouter>
            <li>
              <NavLink to="/cats" onClick={() => props.choose('Cats')}>Cats</NavLink>
            </li>
            <li>
              <NavLink to="/dogs" onClick={() => props.choose('Dog')}>Dogs</NavLink>
            </li>
            <li>
              <NavLink to="/hamsters" onClick={() => props.choose('Hamster')}>Hamsters</NavLink>
            </li>
          </BrowserRouter>
        </ul>
      </nav>
  );
}

export default Link;
import React from 'react';
import { NavLink } from 'react-router-dom';
import Search from './Search';

const Nav = (props
  // , {match}
  ) => {

  //let searchValue = match.params.getSearchValue;

  return (
    <nav className="main-nav">
      <Search onSearch={props.onSearch}/>
      <ul>
        <li>
          <NavLink to="/cats" onClick={() => props.onSearch('Cats')}>Cats</NavLink>
        </li>
        <li>
          <NavLink to="/dogs" onClick={() => props.onSearch('Dog')}>Dogs</NavLink>
        </li>
        <li>
          <NavLink to="/hamsters" onClick={() => props.onSearch('Hamster')}>Hamsters</NavLink>
        </li>
      </ul>
  </nav>
  );
}

export default Nav;
import React from 'react';
import ReactDOM from 'react-dom';

const Photo = (props) => {

    return (
      <li>
        <img src={props.url}/>
      </li>
  );
}

export default Photo;
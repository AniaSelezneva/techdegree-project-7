import React from 'react';
import NotFound from './NoResult';
import Photo from './Photo';

const PhotoContainer = props => {
  const results = props.data;
  let photos;
  
  if (typeof results.photos != "undefined"){
    if (typeof results.photos.photo != "undefined"){
      if (results.photos.photo.length > 0) {
        photos = results.photos.photo.map (result => 
          <Photo url={(`https://farm${result.farm}.staticflickr.com/${result.server}/${result.id}_${result.secret}_m.jpg`)} key={result.id} />
      )} else {
        photos = <NotFound />
      }
    }
  }

  return (
    <div className="photo-container">
      <h2>
       {/* {props.SearchValue} */}
        Results
      </h2>
      <ul>
        {photos}
      </ul>
    </div>
  )
}

export default PhotoContainer;
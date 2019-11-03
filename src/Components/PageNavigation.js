import React from "react";
import { Link } from "react-router-dom";

export default props => {
  const { handleClick, showNextLink, showPrevLink, loading } = props;
  return (
    <div className="nav-link-container">
      <Link
        to="#"
        className={`nav-link ${showPrevLink ? "show" : "hide"} ${
          loading ? "greyed-out" : ""
        }`}
        onClick={event => {
          event.preventDefault();
          handleClick("prev");
        }}
      >
        Prev
      </Link>
      <Link
        to="#"
        className={`nav-link ${showNextLink ? "show" : "hide"} ${
          loading ? "greyed-out" : ""
        }`}
        onClick={event => {
          event.preventDefault();
          handleClick("next");
        }}
      >
        Next
      </Link>
    </div>
  );
};

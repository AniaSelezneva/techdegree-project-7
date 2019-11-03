import React from "react";

export default props => {
  const { handleClick, showNextLink, showPrevLink, loading } = props;
  return (
    <div className="nav-link-container">
      <a
        href="#"
        className={`nav-link ${showPrevLink ? "show" : "hide"} ${
          loading ? "greyed-out" : ""
        }`}
        onClick={event => {
          event.preventDefault();
          handleClick("prev");
        }}
      >
        Prev
      </a>
      <a
        href="#"
        className={`nav-link ${showNextLink ? "show" : "hide"} ${
          loading ? "greyed-out" : ""
        }`}
        onClick={event => {
          event.preventDefault();
          handleClick("next");
        }}
      >
        Next
      </a>
    </div>
  );
};

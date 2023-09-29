import React from "react";

const Loader = () => {
  return (
    <div
      className="loading loading-spinner position-absolute"
      data-mdb-parent-selector="#loading-test"
    >
      <div className="spinner-border loading-icon" role="status"></div>
      <br />

      <span className="loading-text">Please wait...</span>
    </div>
  );
};

export default Loader;

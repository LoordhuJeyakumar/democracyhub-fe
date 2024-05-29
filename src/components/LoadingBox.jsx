import React from "react";

function LoadingBox({ width }) {
  return (
    <div className="d-flex justify-content-center mt-5 pt-5 vh-100">
      <div>
        <div className="loader" style={{ width: width }}></div>
      </div>
    </div>
  );
}

export default LoadingBox;

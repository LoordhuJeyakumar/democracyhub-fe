import React from "react";

function LoadingSpinner({ size = 10 }) {
  return (
    <div
      className="spinner-border spinner-border-sm"
      role="status"
      style={{ fontSize: size }}
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

export default LoadingSpinner;

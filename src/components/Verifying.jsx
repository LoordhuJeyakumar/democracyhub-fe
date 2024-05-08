import React from "react";

function Verifying() {
  return (
    <div className="d-flex justify-content-center align-items-center infoContainer rounded-4">
      <h2 className="Verifying fw-bold position-absolute text-dark">
        Verifying....
      </h2>

      <lord-icon
        src="https://cdn.lordicon.com/unukghxb.json"
        trigger="loop"
        state="loop-spin"
        colors="primary:#1c140d,secondary:#cbe86b"
        style={{ width: "450px", height: "450px" }}
      ></lord-icon>
    </div>
  );
}

export default Verifying;

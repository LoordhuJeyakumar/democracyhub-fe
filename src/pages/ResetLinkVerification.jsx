import React from "react";
import Verifying from "../components/Verifying";
import { Link } from "react-router-dom";
import Expired from "../components/Expired";
import Invalid from "../components/Invalid";
import Verified from "../components/Verified";

function ResetLinkVerification() {
  
  return (
    <div>
      {/* <Verifying /> */}
      {/*  <Expired /> */}
      {/* <Invalid /> */}
      <Verified />
    </div>
  );
}

export default ResetLinkVerification;

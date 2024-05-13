import React, { useEffect, useState } from "react";
import Verifying from "../components/Verifying";
import { Link, useNavigate, useParams } from "react-router-dom";
import Expired from "../components/Expired";
import Invalid from "../components/Invalid";
import Verified from "../components/Verified";
import userService from "../services/userService";
import { toast } from "react-toastify";

function ResetLinkVerification() {
  // State to track verification status ("verifying", "verified", "expired", "invalid")
  const [tokenStatus, setTokenStatus] = useState("verifying");

  // Get verification token and user ID from URL params
  const { resetToken, userId } = useParams();

  // Hook for navigation
  const navigate = useNavigate();

  // Run only once on component mount
  useEffect(() => {
    verifyTokenFromEmail(resetToken, userId);
  }, []);

  async function verifyTokenFromEmail(token, id) {
    try {
      setTokenStatus("verifying"); // Update state while verifying
      let res = await userService.resetToken(token, id); // Call service to verify token

      // Handle network error
      if (res.message === "Network Error") {
        toast.error(res.message + " please try again");
      }

      // Handle successful verification
      if (res?.data) {
        if (res.data.message === "verificationToken is valid") {
          setTokenStatus("verified");
        }
      } else {
        // Handle specific error messages from the backend
        if (
          res?.response?.data?.message === "Verification Token is not valid"
        ) {
          setTokenStatus("invalid");
          return res;
        } else if (
          res?.response?.data?.message === "verificationToken Expired"
        ) {
          setTokenStatus("expired");
          return res;
        }
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  const renderPage = () => {
    // Conditionally render components based on tokenStatus
    if (tokenStatus === "verifying") {
      return <Verifying type={"reset"} />;
    } else if (tokenStatus === "expired") {
      return <Expired type={"reset"} />;
    } else if (tokenStatus === "invalid") {
      return <Invalid type={"reset"} />;
    } else if (tokenStatus === "verified") {
      return <Verified type={"reset"} />;
    }
  };

  return <>{renderPage()}</>;
}

export default ResetLinkVerification;

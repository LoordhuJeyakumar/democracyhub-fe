// Importing necessary libraries and components

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userService from "../services/userService"; // Import service for user actions

// Import components for different verification states
import Verifying from "../components/Verifying";
import Expired from "../components/Expired";
import Invalid from "../components/Invalid";
import Verified from "../components/Verified";

// Import for displaying notifications
import { toast } from "react-toastify";

function AccountVerification() {
  // State to track verification status ("verifying", "verified", "expired", "invalid")
  const [tokenStatus, setTokenStatus] = useState("verifying");

  // Get verification token and user ID from URL params
  const { verifyToken, userId } = useParams();

  // Hook for navigation
  const navigate = useNavigate();

  // Run only once on component mount
  useEffect(() => {
    verifyTokenFromEmail(verifyToken, userId);
  }, []);

  async function verifyTokenFromEmail(token, id) {
    try {
      setTokenStatus("verifying"); // Update state while verifying
      let res = await userService.verifyToken(token, id); // Call service to verify token

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
      return <Verifying />;
    } else if (tokenStatus === "expired") {
      return <Expired />;
    } else if (tokenStatus === "invalid") {
      return <Invalid />;
    } else if (tokenStatus === "verified") {
      return <Verified />;
    }
  };
  return <>{renderPage()}</>;
}

export default AccountVerification;

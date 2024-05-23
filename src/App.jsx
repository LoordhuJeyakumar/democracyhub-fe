import React from "react";
import HomePage from "./pages/HomePage";
import AppRoutes from "./routes/AppRoutes";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import "./components/root.css";

function App() {
  return (
    <div className="vh-100">
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Flip}
      />
      <AppRoutes />
    </div>
  );
}

export default App;

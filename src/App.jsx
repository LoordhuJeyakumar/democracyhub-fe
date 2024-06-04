import React from "react";
import HomePage from "./pages/HomePage";
import AppRoutes from "./routes/AppRoutes";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import "./components/root.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import "./components/ag-grid-theme-builder.css"

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

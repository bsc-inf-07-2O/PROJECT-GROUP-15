import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./footer";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import { useAuth } from "./Authentication";

const DashBoard = () => {
  // const { isAuthenticated } = useAuth();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     window.history.replaceState(null, "", window.location.pathname);
  //   }
  // }, [isAuthenticated]);

  // // Early return for unauthorized
  // if (!isAuthenticated) {
  //   return <Navigate to="/" />;
  // }
  return (
    <div>
      <Navbar />
      <div className="sliding-background"></div>

      <div className="flex flex-col min-h-screen  content-container">
        <div className="flex justify-center items-center mt-8 mb-6 ">
          <img src="/images/logo.png" alt="Platform Logo" className="h-24" />
        </div>

        {/* Content section */}
        <div className="flex flex-grow flex-col lg:flex-row items-center justify-center p-6">
          {/* Text content on the left */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-3xl font-extrabold text-white mb-4">
              Welcome to Online Bonding Platform
            </h1>
            <p className="text-lg mb-8 font-bold text-white font-sans">
              You can use this platform to conduct bonding process digitally.
              Click the Bonding button to start the bonding process.
            </p>

            {/* Button */}
            <Link
              to="/eligibility"
              className="bg-indigo-900 text-white font-semibold py-3 px-6 rounded-md hover:bg-yellow-600 transition"
            >
              Check bonding eligibility
            </Link>
          </div>

          {/* Illustration on the right */}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default DashBoard;

import React from 'react';
import Navbar from './NavBar';
import Footer from './footer';
import {Link } from 'react-router-dom';

const DashBoard = () => {
  return (
    <div>
      <Navbar />

      {/* Main page layout */}
      <div className="flex flex-col min-h-screen bg-gradient-to-r from-gray-500 via-gray-400 to-white">
        
        {/* Logo centered at the top of the page */}
        <div className="flex justify-center items-center mt-8 mb-6">
          <img 
            src="/images/logo.png" 
            alt="Platform Logo" 
            className="h-24"
          />
        </div>

        {/* Content section */}
        <div className="flex flex-grow flex-col lg:flex-row items-center justify-center p-6">
          
          {/* Text content on the left */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-3xl font-bold mb-4">Welcome to Online Bonding Platform</h1>
            <p className="text-lg mb-8 font-sans">
              You can use this platform to conduct bonding process. 
              Click the Bonding  button to start the bonding .
            </p>

            {/* Button */}
            <Link 
              to="/eligibility" 
              className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-yellow-600 transition"
            >
              Check bonding eligibility
            </Link>
          </div>

          {/* Illustration on the right */}
          <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center lg:justify-start">
            <img 
              src="/images/College Student Cartoon Png, Transparent Png - vhv.jpeg" 
              alt="Students Illustration" 
              className="w-full max-w-md"
            />
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
}

export default DashBoard;

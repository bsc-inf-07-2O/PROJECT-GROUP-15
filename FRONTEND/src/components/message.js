import React, { useState } from "react";
import Navbar from './NavBar';
import Footer from './footer';

const MessageList = ({ messages, handleSelect }) => {
  return (
    <div className="bg-gray-50 border-r border-gray-200 p-4 w-full lg:w-1/3 sm:mx-auto">
      <h2 className="text-xl font-semibold mb-4">Messages</h2>
      
    </div>
  );
};

const MessageDetail = ({ selectedMessage }) => {
  return (
    <div className="w-full lg:w-2/3 p-4 sm:mx-auto flex-center item-center">
      
    </div>
  );
};



  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex flex-col sm:flex-col lg:flex-row lg:ml-16 sm:items-center">
      
      </div>
      <Footer />
    </div>
  );
};

export default BondingMessage;

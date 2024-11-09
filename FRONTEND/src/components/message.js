import React from "react";
import Navbar from './NavBar';
import Footer from './footer';

const MessageList = () => {
  




  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        {/* Your main content goes here */}
      </div>
      <Footer />
    </div>
  );
};

export default MessageList;

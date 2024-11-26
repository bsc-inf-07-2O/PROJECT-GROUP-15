import React from 'react';
import Navbar from './NavBar';
import Footer from './footer';

const Eligibility = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow">
        {/* Your main content goes here */}
      </div>

      {/* Footer should always stick to the bottom of the page */}
      <Footer />
    </div>
  );
};

export default Eligibility;

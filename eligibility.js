import React from 'react';
import Navbar from './NavBar';
import Footer from './footer';

const Eligibility = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="relative flex flex-col bg-gray-50 items-center px-4 py-8 flex-grow overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage: `url('/images/logo.png')`, // Replace with your image path
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
            BONDING ELIGIBILITY
          </h1>

          <ol className="list-decimal list-inside text-lg text-gray-700 space-y-4">
            <li>
              Only those provided with a loan from the loans board are eligible to carry out bonding.
            </li>
            <li>
              Students must be Malawian, meaning they should have a national ID.
            </li>
            <li>
              Students must also have a student ID representing their affiliation with a particular school.
            </li>
          </ol>
        </div>
      </div>

      {/* Footer should always stick to the bottom of the page */}
      <Footer />
    </div>
  );
};

export default Eligibility;
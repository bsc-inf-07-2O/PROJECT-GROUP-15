import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const QuickStatement = () => {
  const [code, setCode] = useState('');
  const [sidebar, setSidebar] = useState(false);

  const handleSidebarToggle = () => setSidebar(!sidebar);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Identification code submitted:', code);
    // Add your authentication logic here
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50">
      {/* Header */}
      <header className="w-full bg-gray-800 p-4">
        <nav className="container mx-auto flex justify-between items-center">
          {/* Replace with your actual logo */}
          <div className="text-white font-bold text-lg">
          <img src="/images/logo.png" alt="Logo" className="h-10 mr-4" /> 
          </div>

          <div className="sm:hidden">
          <button onClick={handleSidebarToggle} className="text-white focus:outline-none">
            <i className={sidebar ? 'fas fa-times' : 'fas fa-bars'}></i>
          </button>
        </div>

        <ul className="hidden sm:flex space-x-8">
          <li>
            <Link to="/about" className="text-white hover:text-yellow-400">
            About Us
            </Link>
          </li>
          <li>
            <Link to="/" className="text-white hover:text-yellow-400">
            Sign-in
            </Link>
          </li>
          <li>
            <Link to="/auth-check" className="text-white hover:text-yellow-400">
            Register
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-white hover:text-yellow-400">
            Contact Us
            </Link>
          </li>

          
        </ul>

        <div className="hidden sm:flex items-center relative">
         {/* <ul className="flex space-x-6 text-white"> 
            <li><a href="#" className="hover:text-gray-300">About Us</a></li>
            <li><a href="#" className="hover:text-gray-300">Sign-in</a></li>
            <li><a href="#" className="hover:text-gray-300">Register</a></li>
            <li><a href="#" className="hover:text-gray-300">Contact Us</a></li>
          </ul>*/}
          </div>
        </nav>

        <div
        className={`fixed top-0 left-0 h-full bg-gray-900 w-64 transform ${
          sidebar ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50 sm:hidden`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Close Icon */}
          {/*<button className="text-white self-end focus:outline-none" onClick={handleSidebarToggle}>
            <i className="fas fa-times"></i>
          </button>*/}

          {/* Navigation Links for Mobile */}
          <ul className="text-white mt-6">
          
          <li className="mb-4">
            <Link to="/about" className="hover:text-yellow-400 text-lg block">
            About Us
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/" className="hover:text-yellow-400 text-lg block">
            Sign-in
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/auth-check" className="hover:text-yellow-400 text-lg block">
            Register
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/contact" className="hover:text-yellow-400 text-lg block">
            Contact Us
            </Link>
          </li>

          
          
          </ul>
          </div>
          </div>

          {sidebar && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={handleSidebarToggle}></div>}
      </header>

      {/* Main Content */}
      <div className="container mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-semibold mb-4">Quick Loan Statement</h1>
        <p className="text-gray-600 mb-6">
          If you graduated before the year <span className="font-bold">2018</span>, you can check the status of your loan account here. 
          Contact HESLGB to get your identification code and enter it below to access your loan status.
        </p>
        <form onSubmit={handleSubmit} className="w-full">
          <label htmlFor="idCode" className="block text-gray-700 mb-2">Please enter your identification code</label>
          <input
            id="idCode"
            type="text"
            placeholder="Identification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuickStatement;

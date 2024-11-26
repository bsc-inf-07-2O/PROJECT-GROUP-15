import React, { useState } from 'react';
import Navbar from './NavBar';
import Footer from './footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Handle form submission logic here (e.g., API call)
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
        {/* Title Section */}
        <h2 className="text-4xl font-bold text-black  font-extrabold mb-8 text-center">
          Contact Us
        </h2>

        {/* Flexbox container for the contact details and form */}
        <div className="flex flex-col lg:flex-row w-full md:w-4/5 lg:w-3/5 bg-white shadow-lg rounded-lg p-8">
          {/* Contact Details on the left */}
          <div className="lg:w-1/3 lg:pr-8 mb-8 lg:mb-0">
            <p className="text-gray-700 mb-4">
              <i className="fas fa-map-marker-alt text-blue-500 mr-2"></i>
              <span className="font-semibold">Address:</span> <br />
              Area 10, Off Mphonongo Street, <br />
              Lilongwe, Malawi
            </p>
            <p className="text-gray-700 mb-4">
              <i className="fas fa-envelope text-blue-500 mr-2"></i>
              <span className="font-semibold">Email:</span> <br />
              info.loans@heslgb.com
            </p>
            <p className="text-gray-700 mb-4">
              <i className="fas fa-phone text-blue-500 mr-2"></i>
              <span className="font-semibold">Phone:</span> <br />
              +265 1 795 955 / 979
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="lg:w-2/3 space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium">
                Your name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium">
                Your email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your email address"
                required
              />
            </div>

            <div>
              <label htmlFor="university" className="block text-gray-700 font-medium">
                University/College
              </label>
              <input
                type="text"
                name="university"
                value={formData.university}
                onChange={handleInputChange}
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="University/College"
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-gray-700 font-medium">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Subject"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your message"
                rows="4"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;

import React, { useState, useEffect } from 'react';
import Navbar from './NavBar';
import Footer from './footer';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

const AccountSettings = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [userId, setUserId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [user, setUser] = useState(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setEmail(decodedToken.email);
        setUserId(decodedToken.sub);
        setUser({ profileImage: decodedToken.profileImage });
      } catch (error) {
        console.error('Failed to decode token', error);
      }
    }
  }, []);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setImageFile(file);
    }
  };

  const handleUpdate = async () => {
    if (newPassword && newPassword !== repeatPassword) {
      alert('Passwords do not match');
      return;
    }

    const token = localStorage.getItem('token');
    const formData = new FormData();

    if (email) formData.append('email', email);
    if (newPassword) formData.append('password', newPassword);
    if (imageFile) formData.append('profileImage', imageFile);

    if (!newPassword && !imageFile) {
      alert('Please update either password or profile image');
      return;
    }

    try {
      await axios.put(`http://localhost:3001/users/${userId}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Account updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to update account settings');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center py-8 px-4">
        <h2 className="text-center text-3xl font-bold mb-6 text-gray-800">
          Update Account Settings
        </h2>
        <div className="flex flex-col items-center mb-6">
          <img
            src={profileImage || user?.profileImage || "/images/th.jpeg"}
            className="rounded-full h-32 w-32 bg-gray-200 object-cover mb-4 shadow-sm border border-gray-300"
            alt="Profile"
          />
          <input
            type="file"
            onChange={handleProfileImageChange}
            accept="image/*"
            className="text-sm text-gray-700"
          />
        </div>

        <div className="w-full max-w-lg">
  <div className="mb-6">
    <label className="block text-gray-700 font-medium mb-2">
      Email Address
    </label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
    />
  </div>

  <div className="grid grid-cols-2 gap-4 mb-4 relative">
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="NewPassword"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="p-2 border border-gray-300 rounded w-full"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-600"
              >
               {showNewPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="relative">
              <input
                
                type={showRepeatPassword ? "text" : "password"}
                name="repeatPassword"
                placeholder="Confirm Password"
                value={repeatPassword}
                 onChange={(e) => setRepeatPassword(e.target.value)}
                required
                className="p-2 border border-gray-300 rounded w-full"
              />
              <button
                type="button"
                onClick={() =>setShowRepeatPassword(!showRepeatPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-600"
              >
                 {showRepeatPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>


          <div className="flex justify-center mt-4">
            <button
              onClick={handleUpdate}
              className="bg-yellow-600 text-white px-6 py-3 rounded-md hover:bg-yellow-700 transition-shadow duration-300 shadow-md"
            >
              Update
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountSettings;

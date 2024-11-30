import React, { useState, useEffect } from "react";
import Navbar from "./NavBar";
import Footer from "./footer";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

const AccountSettings = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [user, setUser] = useState(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
const [userId, setUserId] = useState(null);
  // Modal states
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setEmail(decodedToken.email);
        setUser({ profileImage: decodedToken.profileImage });
      } catch (error) {
        console.error("Failed to decode token", error);
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
      setModalMessage("Passwords do not match.");
      setShowModal(true);
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();

    if (email) formData.append("email", email);
    if (newPassword) formData.append("password", newPassword);
    if (imageFile) formData.append("profileImage", imageFile);

    if (!newPassword && !imageFile) {
      setModalMessage("Please update either the password or profile image.");
      setShowModal(true);
      return;
    }

    try {
      await axios.put(`http://localhost:3001/users/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setModalMessage("Account updated successfully!");
    } catch (error) {
      console.error(error);
      setModalMessage("Failed to update account settings.");
    } finally {
      setShowModal(true);
    }
  };

 const handleDeleteAccount = async () => {
   const token = localStorage.getItem("token");

   if (!token) {
     setModalMessage("You need to log in to delete your account.");
     setShowModal(true);
     return;
   }

   if (
     window.confirm(
       "Are you sure you want to delete your account? This action cannot be undone."
     )
   ) {
     try {
       const decodedToken = jwtDecode(token); // Decode token to get user ID
       const userId = decodedToken.sub; // Ensure the token includes the `sub` field (or adjust according to your token structure)

       await axios.delete(`http://localhost:3001/users/${userId}`, {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       });

       setModalMessage("Account deleted successfully.");
       localStorage.removeItem("token");
       window.location.href = "/";
     } catch (error) {
       console.error(error);
       setModalMessage("Failed to delete account.");
     } finally {
       setShowModal(true);
     }
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
                name="newPassword"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full"
                autoComplete="new-password" // Prevent browser autofill
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
                className="p-2 border border-gray-300 rounded w-full"
                autoComplete="new-password" // Prevent browser autofill
              />
              <button
                type="button"
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
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

          <div className="flex justify-center mt-4">
            <button
              onClick={handleDeleteAccount}
              className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-shadow duration-300 shadow-md"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-1/2 transition-all ease-in-out duration-300 z-50">
            <p className="text-gray-800 text-lg font-medium">{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-yellow-600"
            >
              Close
            </button>
          </div>
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={() => setShowModal(false)}
          ></div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AccountSettings;

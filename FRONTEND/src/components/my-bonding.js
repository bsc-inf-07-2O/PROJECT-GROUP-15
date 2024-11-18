import React, { useEffect, useState } from 'react';
import Navbar from './NavBar';
import Footer from './footer';
import axios from 'axios';
import Modal from 'react-modal';
import { jwtDecode } from 'jwt-decode';

const MyBonding = () => {
  const [bonding, setBonding] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Extract user information from the token
  useEffect(() => {
    const fetchUserFromToken = () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token); // Decoding JWT token
        return { FirstName: decodedToken.FirstName, SurName: decodedToken.SurName, userId: decodedToken.sub,  };
      }
      return null;
    };

    const user = fetchUserFromToken();
    
    if (user) {
      const fetchBondingDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/bonding/user/${user.userId}`); 
          setBonding(response.data);
        } catch (error) {
          console.error('Failed to fetch bonding details', error);
        }
      };
      fetchBondingDetails();
    }
  }, []);

  if (!bonding) {
    return <div className="text-center mt-10">No bonding found for this user.</div>;
  }

  // Handlers to open and close modals
  const openViewModal = () => setViewModalOpen(true);
  const closeViewModal = () => setViewModalOpen(false);

  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">My Bonding</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">{bonding.FirstName} {bonding.SurName}</h2>
          <p className="mb-2">Date of Birth: {new Date(bonding.DateOfBirth).toLocaleDateString()}</p>
          <p className="mb-2">Sex: {bonding.Sex}</p>
          <p className="mb-2">Phone Number: {bonding.PhoneNumber}</p>
          <p className="mb-2">Home Village: {bonding.HomeVillage}</p>
          <p className="mb-2">National ID Number: {bonding.nationalId}</p>

          <div className="flex mt-4 space-x-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={openViewModal}
            >
              View Details
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={openEditModal}
            >
              Edit Bonding
            </button>
          </div>
        </div>

        {/* View Details Modal */}
        <Modal
          isOpen={viewModalOpen}
          onRequestClose={closeViewModal}
          contentLabel="View Bonding Details"
          className="modal"
        >
          <h2 className="text-2xl mb-4">Bonding Details</h2>
          <p>Full Name: {bonding.FirstName} {bonding.SurName}</p>
          <p>Date of Birth: {new Date(bonding.DateOfBirth).toLocaleDateString()}</p>
          {/* Add more details as necessary */}
          <button onClick={closeViewModal} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
        </Modal>

        {/* Edit Form Modal */}
        <Modal
          isOpen={editModalOpen}
          onRequestClose={closeEditModal}
          contentLabel="Edit Bonding Form"
          className="modal"
        >
          <h2 className="text-2xl mb-4">Edit Bonding Details</h2>
          <form>
            <label>First Name:</label>
            <input
              type="text"
              value={bonding.FirstName}
              onChange={(e) => setBonding({ ...bonding, FirstName: e.target.value })}
              className="border p-2 rounded mb-4 w-full"
            />
            {/* Add more form fields as necessary */}
            <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
          </form>
          <button onClick={closeEditModal} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
        </Modal>
      </div>

      <Footer />
    </div>
  );
};

export default MyBonding;

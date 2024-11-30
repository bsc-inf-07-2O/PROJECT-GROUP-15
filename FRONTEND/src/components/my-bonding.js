import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Navbar from "./NavBar";
import Footer from "./footer";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const MyBonding = () => {
  const [bonding, setBonding] = useState(null);
  const [university, setUniversity] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [stage, setStage] = useState(1);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);

  const handleFileUpload = (event, fieldName) => {
    const file = event.target.files[0];
    setBonding({ ...bonding, [fieldName]: file });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser({
          firstName: decodedToken.FirstName,
          surName: decodedToken.SurName,
        });
        setUserId(decodedToken.sub);
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, []);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      zIndex: 1000,
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      zIndex: 1000,
    },
  };

  useEffect(() => {
    if (userId) {
      fetchBondingDetails();
    }
  }, [userId]);

  const fetchBondingDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/bonding/user/${userId}`
      );
      const bondingData = response.data.length ? response.data[0] : null;
      setBonding(bondingData);
      setUniversity(bondingData?.university || {});
    } catch (error) {
      console.error("Error fetching bonding details:", error);
    }
  };

  const openViewModal = () => setViewModalOpen(true);
  const closeViewModal = () => setViewModalOpen(false);
  const openEditModal = () => {
    setStage(1);
    setEditModalOpen(true);
  };
  const closeEditModal = () => setEditModalOpen(false);
  const openConfirmationModal = () => setConfirmationModalOpen(true);
  const closeConfirmationModal = () => setConfirmationModalOpen(false);
  const nextStage = () => setStage((prev) => Math.min(prev + 1, 6));
  const prevStage = () => setStage((prev) => Math.max(prev - 1, 1));

  const saveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("nationalId", bonding.nationalId);
      formData.append("studentId", bonding.studentId);
      if (bonding.nationalIdFile)
        formData.append("nationalIdFile", bonding.nationalIdFile);
      if (bonding.studentIdFile)
        formData.append("studentIdFile", bonding.studentIdFile);

      await axios.put(`http://localhost:3001/bonding/${bonding.id}`, bonding);
      fetchBondingDetails();
      closeEditModal();
      openConfirmationModal();
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">My Bonding</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">
            Bonding Information For
          </h2>
          <span className="mb-2">
            {user?.firstName} {user?.surName}
          </span>
          {bonding ? (
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
          ) : (
            <p className="text-red-500 mt-4">You haven't bonded yet.</p>
          )}
        </div>

        <Modal
          isOpen={viewModalOpen}
          onRequestClose={closeViewModal}
          contentLabel="View Bonding Details"
          style={customStyles}
        >
          <h2 className="text-2xl mb-4">Bonding Details</h2>
          {bonding ? (
            <>
              <span>
                Full Name: {bonding.firstName} {bonding.surName}
              </span>
              <p>Date of Birth: {bonding.dateOfBirth}</p>
              <p>Sex: {bonding.sex}</p>
              <p>Home Village: {bonding.homeVillage}</p>
              <p>TA: {bonding.TA}</p>
              <p>Phone Number: {bonding.phoneNumber}</p>
              <p>Guardian Full Name: {bonding.guardianFullName}</p>
              <p>Guardian Phone Number: {bonding.guardianPhoneNumber}</p>
              <p>Guardian Postal Address: {bonding?.guardianPostalAddress}</p>
              <p>
                Guardian Physical Address: {bonding?.guardianPhysicalAddress}
              </p>
              <p>Guardian Home Village: {bonding?.guardianHomeVillage}</p>
              <p>Guardian District: {bonding?.guardianDistrict}</p>
              <p>Guardian Occupation: {bonding?.guardianOccupation}</p>
              <p>Bank Name: {bonding.bankName}</p>
              <p>Branch: {bonding?.branch}</p>
              <p>Account Name: {bonding?.accountName}</p>
              <p>Account Number: {bonding.accountNumber}</p>
              <p>Student Id: {bonding?.studentId}</p>
              <p>National Id: {bonding?.nationalId}</p>
              <p>Tuition Amount: {bonding?.tuitionAmount}</p>
              <p>Upkeep Amount: {bonding?.upkeepAmount}</p>
              <p>University Name: {university?.University}</p>
              <p>Program Of Study: {university?.ProgramOfStudy}</p>
              <p>Email: {university?.email}</p>
              <p>Year Of Study: {university?.YearOfStudy}</p>
              <p>Student Registration Number: {university?.RegNo}</p>
            </>
          ) : (
            <p>No bonding details available.</p>
          )}
          <button
            onClick={closeViewModal}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </Modal>

        <Modal
          isOpen={editModalOpen}
          onRequestClose={closeEditModal}
          contentLabel="Edit Bonding Form"
          style={customStyles}
        >
          <h2 className="text-2xl mb-4">Edit Bonding Details</h2>
          <div className="border-2 border-indigo-600 rounded-lg p-4">
            <h3 className="text-xl mb-2">
              {stage === 1
                ? "Stage 1: Personal Details"
                : stage === 2
                ? "STAGE 2: UNIVERSITY DETAILS"
                : stage === 3
                ? "STAGE 3: PARENTS/GUARDIAN DETAILS"
                : stage === 4
                ? "STAGE 4: BANK DETAILS"
                : stage === 5
                ? "STAGE 5: DOCUMENTATION"
                : "STAGE 6: LOAN AMOUNT DETAILS"}
            </h3>
            {stage === 1 && bonding && (
              <div>
                <label>First Name:</label>
                <input
                  type="text"
                  value={bonding.firstName}
                  onChange={(e) =>
                    setBonding({ ...bonding, firstName: e.target.value })
                  }
                  className="border p-2 rounded mb-4 w-full"
                />

                <label>Sur Name:</label>
                <input
                  type="text"
                  value={bonding.surName}
                  onChange={(e) =>
                    setBonding({ ...bonding, surName: e.target.value })
                  }
                  className="border p-2 rounded mb-4 w-full"
                />
                <label>Date Of Birth:</label>
                <input
                  type="text"
                  value={bonding.dateOfBirth}
                  onChange={(e) =>
                    setBonding({ ...bonding, dateOfBirth: e.target.value })
                  }
                  className="border p-2 rounded mb-4 w-full"
                />

                <label>Sex:</label>
                <input
                  type="text"
                  value={bonding.sex}
                  onChange={(e) =>
                    setBonding({ ...bonding, sex: e.target.value })
                  }
                  className="border p-2 rounded mb-4 w-full"
                />

                <label>Home Village:</label>
                <input
                  type="text"
                  value={bonding.homeVillage}
                  onChange={(e) =>
                    setBonding({ ...bonding, homeVillage: e.target.value })
                  }
                  className="border p-2 rounded mb-4 w-full"
                />

                <label>TA:</label>
                <input
                  type="text"
                  value={bonding.TA}
                  onChange={(e) =>
                    setBonding({ ...bonding, TA: e.target.value })
                  }
                  className="border p-2 rounded mb-4 w-full"
                />

                <label>Phone Number:</label>
                <input
                  type="text"
                  value={bonding.phoneNumber}
                  onChange={(e) =>
                    setBonding({ ...bonding, phoneNumber: e.target.value })
                  }
                  className="border p-2 rounded mb-4 w-full"
                />
              </div>
            )}

            {stage === 2 && bonding && (
              <div>
                <label>University Name:</label>
                <input
                  type="text"
                  value={university.University}
                  onChange={(e) =>
                    setBonding({ ...bonding, University: e.target.value })
                  }
                  className="border p-2 rounded mb-4 w-full"
                />

                <label>Year Of Study:</label>
                <input
                  type="text"
                  value={university.YearOfStudy}
                  onChange={(e) =>
                    setBonding({ ...bonding, YearOfStudy: e.target.value })
                  }
                  className="border p-2 rounded mb-4 w-full"
                />
                <label>Program Of Study:</label>
                <input
                  type="text"
                  value={university.ProgramOfStudy}
                  onChange={(e) =>
                    setBonding({ ...bonding, ProgramOfStudy: e.target.value })
                  }
                  className="border p-2 rounded mb-4 w-full"
                />

                <label>Email:</label>
                <input
                  type="text"
                  value={university.email}
                  onChange={(e) =>
                    setBonding({ ...bonding, email: e.target.value })
                  }
                  className="border p-2 rounded mb-4 w-full"
                />

                <label>Student Registration Number:</label>
                <input
                  type="text"
                  value={university.RegNo}
                  onChange={(e) =>
                    setBonding({ ...bonding, RegNo: e.target.value })
                  }
                  className="border p-2 rounded mb-4 w-full"
                />
              </div>
            )}

            {stage === 3 && bonding && (
              <div>
                <label>Guardian Full Name:</label>
                <input
                  type="text"
                  value={bonding.guardianFullName}
                  onChange={(e) =>
                    setBonding({ ...bonding, guardianFullName: e.target.value })
                  }
                  className="border p-2 rounded mb-4 w-full"
                />

                <label>Guardian Phone Number:</label>
                <input
                  type="text"
                  value={bonding.guardianPhoneNumber}
                  onChange={(e) =>
                    setBonding({
                      ...bonding,
                      guardianPhoneNumber: e.target.value,
                    })
                  }
                  className="border p-2 rounded mb-4 w-full"
                />
                <label>Guardian Postal Address:</label>
                <input
                  type="text"
                  value={bonding.guardianPostalAddress}
                  onChange={(e) =>
                    setBonding({
                      ...bonding,
                      guardianPostalAddress: e.target.value,
                    })
                  }
                  className="border p-2 rounded mb-4 w-full"
                />

                <label>Guardian Physical Address:</label>
                <input
                  type="text"
                  value={bonding.guardianPhysicalAddress}
                  onChange={(e) =>
                    setBonding({
                      ...bonding,
                      guardianPhysicalAddress: e.target.value,
                    })
                  }
                  className="border p-2 rounded mb-4 w-full"
                />

                <label>guardian Home Village:</label>
                <input
                  type="text"
                  value={bonding.guardianHomeVillage}
                  onChange={(e) =>
                    setBonding({
                      ...bonding,
                      guardianHomeVillage: e.target.value,
                    })
                  }
                  className="border p-2 rounded mb-4 w-full"
                />

                <label>Guardian District :</label>
                <input
                  type="text"
                  value={bonding.guardianDistrict}
                  onChange={(e) =>
                    setBonding({ ...bonding, guardianDistrict: e.target.value })
                  }
                  className="border p-2 rounded mb-4 w-full"
                />

                <label>Guardian Occupation:</label>
                <input
                  type="text"
                  value={bonding.guardianOccupation}
                  onChange={(e) =>
                    setBonding({
                      ...bonding,
                      guardianOccupation: e.target.value,
                    })
                  }
                  className="border p-2 rounded mb-4 w-full"
                />
              </div>
            )}

            {stage === 4 && bonding && (
              <div>
                <label>Bank Name:</label>
                <input
                  type="text"
                  value={bonding.bankName}
                  onChange={(e) =>
                    setBonding({ ...bonding, bankName: e.target.value })
                  }
                  className="border p-2 rounded mb-4 w-full"
                />

                <label>Branch:</label>
                <input
                  type="text"
                  value={bonding.branch}
                  onChange={(e) =>
                    setBonding({ ...bonding, branch: e.target.value })
                  }
                  className="border p-2 rounded mb-4 w-full"
                />
                <label>Account Name:</label>
                <input
                  type="text"
                  value={bonding.accountName}
                  onChange={(e) =>
                    setBonding({ ...bonding, accountName: e.target.value })
                  }
                  className="border p-2 rounded mb-4 w-full"
                />

                <label>Account Number:</label>
                <input
                  type="text"
                  value={bonding.accountNumber}
                  onChange={(e) =>
                    setBonding({ ...bonding, accountNumber: e.target.value })
                  }
                  className="border p-2 rounded mb-4 w-full"
                />
              </div>
            )}

            {stage === 5 && bonding && (
              <div>
                <label>National Id:</label>
                <input
                  type="text"
                  value={bonding.nationalId}
                  onChange={(e) =>
                    setBonding({ ...bonding, nationalId: e.target.value })
                  }
                  className="border p-2 rounded mb-4 w-full"
                />

                <label>Student Id:</label>
                <input
                  type="text"
                  value={bonding.studentId}
                  onChange={(e) =>
                    setBonding({ ...bonding, studentId: e.target.value })
                  }
                  className="border p-2 rounded mb-4 w-full"
                />

                {/* File upload for National Id */}
                <label>Upload National Id Document:</label>
                <input
                  type="file"
                  onChange={(e) => handleFileUpload(e, "nationalIdFile")}
                  className="border p-2 rounded mb-4 w-full"
                />

                {/* File upload for Student Id */}
                <label>Upload Student Id Document:</label>
                <input
                  type="file"
                  onChange={(e) => handleFileUpload(e, "studentIdFile")}
                  className="border p-2 rounded mb-4 w-full"
                />
              </div>
            )}
            {stage === 6 && bonding && (
              <div>
                <label>Tuition Ammount:</label>
                <input
                  type="text"
                  value={bonding.tuitionAmount}
                  onChange={(e) =>
                    setBonding({ ...bonding, tuitionAmount: e.target.value })
                  }
                  className="border p-2 rounded mb-4 w-full"
                />

                <label>Upkeep Amount:</label>
                <input
                  type="text"
                  value={bonding.upkeepAmount}
                  onChange={(e) =>
                    setBonding({ ...bonding, upkeepAmount: e.target.value })
                  }
                  className="border p-2 rounded mb-4 w-full"
                />
              </div>
            )}

            <div className="flex justify-between mt-4">
              {stage > 1 && (
                <button
                  onClick={prevStage}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                >
                  Previous
                </button>
              )}
              {stage < 6 ? (
                <button
                  onClick={nextStage}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={saveChanges}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={confirmationModalOpen}
          onRequestClose={closeConfirmationModal}
          contentLabel="Confirmation"
          style={customStyles}
        >
          <h2 className="text-2xl mb-4">Success!</h2>
          <p>Your bonding form has been updated successfully.</p>
          <button
            onClick={closeConfirmationModal}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </Modal>
      </div>
      <Footer />
    </div>
  );
};

export default MyBonding;

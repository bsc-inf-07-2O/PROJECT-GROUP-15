import React, { useState, useEffect } from 'react';
import Navbar from './NavBar';
import Footer from './footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode
import 'react-datepicker/dist/react-datepicker.css';
//import Year from 'react-datepicker/dist/year';


const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const Bonding = () => {
  const handleCheckBondingStatus = () => {
    window.location.href = "/my-bonding"; // Adjust as needed
  };
  const [form, setForm] = useState({
    FirstName: '',
    SurName: '',
    DateOfBirth: null,
    Sex: '',
    PhoneNumber: '',
    HomeVillage: '',
    TA: '',
    NationalIdNo: '',
    District: '',
    email: '',
    PostalAddress: '',
    University: '',
    ProgramOfStudy: '',
    RegNo: '',
    YearOfStudy: '',
    GuardianFullName: '',
    GuardianPostalAddress: '',
    GuardianPhysicalAddress: '',
    GuardianHomeVillage: '',
    GuardianDistrict: '',
    GuardianOccupation: '',
    GuardianPhoneNumber: '',
    BankName: '',
    Branch: '',
    studentId: '',
    nationalId: '',
    AccountName: '',
    AccountNumber: '',
    UpkeepAmount: '',
    Tuition: '',
  });

  const [stage, setStage] = useState(1);
  const [isBonded, setIsBonded] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState({
    studentId: null,
    nationalId: null,
  });

  const [filePreviews, setFilePreviews] = useState({
    studentId: null,
    nationalId: null,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(null);
  const [University, setUniversity] = useState(null);
  const [RegNo, setRegNo] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false);
   
  const [messages, setMessages] = useState([]);

  
  
  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setEmail(decodedToken.email);
        setUserId(decodedToken.sub);
        setUniversity(decodedToken.University);
        setRegNo(decodedToken.RegNo);
       
      } catch (error) {
        console.error('Failed to decode token', error);
      }
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
        ...prev,
        [name]: name === 'GuardianPhoneNumber' || name === 'AccountNumber' || name === 'PhoneNumber'
            ? parseInt(value, 10) || ''
            : value,
    }));
};


  const handleDateChange = (date) => {
    setForm((prev) => ({
      ...prev,
      DateOfBirth: date,
    }));
  };

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    const validFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (file) {
      if (!validFileTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, [type]: 'Invalid file type. Please upload a JPEG, PNG, or PDF.' }));
        return;
      }
      if (file.size > maxSize) {
        setErrors((prev) => ({ ...prev, [type]: 'File size exceeds 5MB. Please upload a smaller file.' }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFiles((prev) => ({
          ...prev,
          [type]: file,
        }));
        setForm((prev) => ({
          ...prev,
          [type === 'studentId' ? 'studentIdImage' : 'nationalIdImage']: reader.result,
          [type]: file.name,
        }));
        setErrors((prev) => ({ ...prev, [type]: '' }));
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStage = () => {
    if (validateStage()) setStage(stage + 1);
  };

  const prevStage = () => {
    setStage(stage - 1);
  };

  const validateStage = () => {
    const stageErrors = {};
    const requiredFields = {
      1: ['FirstName', 'SurName', 'DateOfBirth', 'Sex', 'PhoneNumber', 'HomeVillage',  'TA', 'NationalIdNo', 'District',  'PostalAddress'],
      2: ['University', 'ProgramOfStudy', 'RegNo', 'email'],
      3: ['GuardianFullName', 'GuardianPostalAddress', 'GuardianPhysicalAddress', 'GuardianHomeVillage', 'GuardianDistrict', 'GuardianOccupation', 'GuardianPhoneNumber'],
      4: ['BankName', 'Branch', 'AccountName', 'AccountNumber'],
      5: ['studentId', 'nationalId'],
      6: ['Tuition']
    };
  
    if (requiredFields[stage]) {
      requiredFields[stage].forEach((field) => {
        if (field === 'Email' && !/\S+@\S+\.\S+/.test(form[field])) {
          stageErrors[field] = 'Email is required.';
        } else if (field === 'University Name' && !University) {
          stageErrors[field] = 'University is required.';
        } 
        else if (field === 'Student Registration Number' && !RegNo) {
          stageErrors[field] = 'Registration number is required.';
      }
        else if (!form[field]) {
          stageErrors[field] = `${field.replace(/([A-Z])/g, ' $1').trim()} is required.`;
        } else {
          if (field === 'PhoneNumber' && isNaN(form[field])) {
            stageErrors[field] = 'Phone number must be integer.';
          }
          if (field === 'DateOfBirth' && !(form[field] instanceof Date)) {
            stageErrors[field] = 'Date of Birth must be a valid date.';
          }
          if (field === 'Sex' && !['Male', 'Female'].includes(form[field])) {
            stageErrors[field] = 'Sex must be either Male or Female.';
          }
        }
      });
    }

    setErrors(stageErrors);
    return Object.keys(stageErrors).length === 0;
  };

  const handleFinish = async () => {
    if (!validateStage()) return;
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      
      if (selectedFiles.studentId) {
        formData.append('uploadedDocumentStudentId', selectedFiles.studentId);
      }
      if (selectedFiles.nationalId) {
        formData.append('uploadedDocumentNationalId', selectedFiles.nationalId);
      }

      
      
      // Get the token and decode it to extract user ID
      const token = localStorage.getItem('token');
      const decodedToken = token ? jwtDecode(token) : null;
      const userId = decodedToken ? decodedToken.sub : null; // Adjust this based on how your token is structured


      if (email) formData.append('Email', email);
      if (University) formData.append('University Name', University);
      if (RegNo) formData.append('Student Registration Number', RegNo);


      
      // Append user ID to form data
      if (userId) {
        formData.append('userId', userId);
      }

      const response = await axios.post(`http://localhost:3001/bonding/register/user/${userId}`, {   
        FirstName: form.FirstName,
        SurName: form.SurName,
        DateOfBirth: form.DateOfBirth,
        Sex: form.Sex,
        PhoneNumber: form.PhoneNumber,
        HomeVillage: form.HomeVillage,
        NationalIdNo: form.NationalIdNo,
        District: form.District,
        email: form.email,
        PostalAddress: form.PostalAddress,
        University: form.University,
        ProgramOfStudy: form.ProgramOfStudy,
        RegNo: form.RegNo,
        YearOfStudy: form.YearOfStudy,
        TA: form.TA,
        GuardianFullName: form.GuardianFullName,
        GuardianPostalAddress: form.GuardianPostalAddress,
        GuardianPhysicalAddress: form.GuardianPhysicalAddress,
        GuardianHomeVillage: form.GuardianHomeVillage,
        GuardianDistrict: form.GuardianDistrict,
        GuardianOccupation: form.GuardianOccupation,
        GuardianPhoneNumber: form.GuardianPhoneNumber,
        BankName: form.BankName,
        Branch: form.Branch,
        AccountName: form.AccountName,
        AccountNumber: form.AccountNumber,
        studentId: form.studentId,
        nationalId: form.nationalId ,
        UpkeepAmount: form.UpkeepAmount,
        Tuition: form.Tuition,
      });
      
    if (response.data.message === 'User has already completed bonding.') {
      setModalMessage('You have already completed the bonding process.');
      setIsBonded(true);
      setMessages((prev) => [
        { title: "Bonding Status", content: "You have already completed the bonding process.", time: new Date().toLocaleTimeString() },
        ...prev,
      ]);
    } else {
      setModalMessage('Bonding is successful!');
      setIsBonded(true);
      setMessages((prev) => [
        { title: "Bonding Status", content: "Bonding is successful!", time: new Date().toLocaleTimeString() },
        ...prev,
      ]);
    }
    setIsError(false);
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    setModalMessage('Failed to bond: ' + errorMessage);
    setIsError(true);
    setMessages((prev) => [
      { title: "Bonding Error", content: `Failed to bond: ${errorMessage}`, time: new Date().toLocaleTimeString() },
      ...prev,
    ]);
  } finally {
    setIsLoading(false);
    setShowModal(true);
  }
};
  return (
    <div>
      <Navbar />
      
      <div className="min-h-screen relative flex flex-col items-center bg-white p-6">
      <div
          className="absolute inset-0 bg-cover bg-center opacity-15 z-0"
          style={{
            backgroundImage: `url('/images/logo.png')`, // Replace with your image path
          }}
        />

        {!isBonded ? (
          <div className="relative w-full max-w-4xl z-10">
            <div className="flex justify-between mb-6">
              <h1 className="text-2xl font-bold">
                {stage === 1
                  ? 'STAGE 1: PERSONAL DETAILS'
                  : stage === 2
                  ? 'STAGE 2: UNIVERSITY DETAILS'
                  : stage === 3
                  ? 'STAGE 3: PARENTS/GUARDIAN DETAILS'
                  : stage === 4
                  ? 'STAGE 4: BANK DETAILS'
                  : stage === 5
                  ? 'STAGE 5: DOCUMENTATION'
                  : 'STAGE 6: LOAN AMOUNT DETAILS'}
              </h1>
            </div>
            <div className="border-2 border-indigo-600 rounded-lg p-6">
              {stage === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['FirstName', 'SurName', 'PhoneNumber', 'HomeVillage', 'TA', 'NationalIdNo', 'District',  'PostalAddress'].map((field, index) => (
                    <div key={index}>
                      <label className="block font-semibold mb-2">{field.replace(/([A-Z])/g, ' $1').trim()}:</label>
                      <input
                        
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        className="border border-indigo-500 p-2 rounded-md w-full"
                        required
                      />
                      {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
                    </div>
                  ))}
                  <div>
                    <label className="block font-semibold mb-2">Date Of Birth:</label>
                    <DatePicker
                      selected={form.DateOfBirth}
                      onChange={handleDateChange}
                      dateFormat="yyyy/MM/dd"
                      placeholderText="yyyy/MM/dd"
                      className="border border-indigo-500 p-2 rounded-md w-full"
                      required
                    />
                    {errors.DateOfBirth && <p className="text-red-500 text-sm">{errors.DateOfBirth}</p>}
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">Sex:</label>
                    <select name="Sex" value={form.Sex} onChange={handleChange} className="border border-indigo-500 p-2 rounded-md w-full">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                         required
                    </select>
                    
                    {errors.Sex && <p className="text-red-500 text-sm">{errors.Sex}</p>}
                  </div>
                </div>
              )}

              {stage === 2 && (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[ 'ProgramOfStudy'].map((field, index) => (
            <div key={index}>
                <label className="block font-semibold mb-2">{field.replace(/([A-Z])/g, ' $1').trim()}:</label>
                <input
                    type="text"
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    className="border border-indigo-500 p-2 rounded-md w-full"
                
                    required
                />
            </div>
        ))}
        <div>
            <label className="block font-semibold mb-2">University Name</label>
            <input
                type="text"
                name="University"
                value={form.University}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-indigo-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
            />
            {errors.University && <p className="text-red-500 text-sm">{errors.University}</p>}
        </div>

        <div>
            <label className="block font-semibold mb-2">Student Registration Number</label>
            <input
                type="text"
                name="RegNo"
                value={form.RegNo}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-indigo-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            
                required
            />
            {errors.RegNo && <p className="text-red-500 text-sm">{errors.RegNo}</p>}
        </div>
        
        <div>
            <label className="block font-semibold mb-2">Year Of Study:</label>
            <select name="YearOfStudy" value={form.YearOfStudy} onChange={handleChange} className="border border-indigo-500 p-2 rounded-md w-full">
                <option value="">Select Year Of Study</option>
                <option value="first year">1</option>
                <option value="second year">2</option>
                <option value="third year">3</option>
                <option value="fourth year">4</option>
                <option value="fifth year">5</option>
            </select>
        </div>

        <div>
            <label className="block font-semibold mb-2">Email</label>
            <input
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-indigo-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            
                required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
    </div>
)}



              {stage === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['GuardianFullName', 'GuardianPostalAddress', 'GuardianPhysicalAddress', 'GuardianHomeVillage', 'GuardianDistrict', 'GuardianOccupation', 'GuardianPhoneNumber'].map((field, index) => (
                    <div key={index}>
                      <label className="block font-semibold mb-2">{field.replace(/([A-Z])/g, ' $1').trim()}:</label>
                      <input
                        type="text"
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        className="border border-indigo-500 p-2 rounded-md w-full"
                      
                        required
                      />
                    </div>
                  ))}
                </div>
              )}
              
              {stage === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['BankName', 'Branch', 'AccountName', 'AccountNumber'].map((field, index) => (
                    <div key={index}>
                      <label className="block font-semibold mb-2">{field.replace(/([A-Z])/g, ' $1').trim()}:</label>
                      <input
                        type="text"
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        className="border border-indigo-500 p-2 rounded-md w-full"
                      
                        required
                      />
                      {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
                    </div>
                  ))}
                </div>
              )}
              {stage === 5 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-2">Upload Student ID:</label>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,application/pdf"
                      onChange={(event) => handleFileChange(event, 'studentId')}
                      className="border border-indigo-500 p-2 rounded-md w-full"
                    />
                    {errors.studentId && <p className="text-red-500 text-sm">{errors.studentId}</p>}
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">Upload National ID:</label>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,application/pdf"
                      onChange={(event) => handleFileChange(event, 'nationalId')}
                      className="border border-indigo-500 p-2 rounded-md w-full"
                    />
                    {errors.nationalId && <p className="text-red-500 text-sm">{errors.nationalId}</p>}
                  </div>
                </div>
              )}
              {stage === 6 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Tuition', 'UpkeepAmount'].map((field, index) => (
                    <div key={index}>
                      <label className="block font-semibold mb-2">{field.replace(/([A-Z])/g, ' $1').trim()}:</label>
                      <select
                      
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        className="border border-indigo-500 p-2 rounded-md w-full"
                      >
                        <option value="">Select Amount MWK</option>
                        {field === 'Tuition' && <option value=" 650000"> MK 650 000.00</option>}
                        {field === 'UpkeepAmount' && <option value=" 580000"> MK 580 000.00</option>}
                      </select>
                      {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-between mt-6">
                {stage > 1 && (
                  <button onClick={prevStage} className="bg-gray-500 text-white py-2 px-4 rounded">
                    Previous
                  </button>
                )}
                {stage < 6 ? (
                  <button onClick={nextStage} className="bg-blue-500 text-white py-2 px-4 rounded">
                    Next
                  </button>
                ) : (
                  <button onClick={handleFinish} className="bg-yellow-600 text-white px-4 py-2 rounded-md" disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Finish'}
                  </button>
                )}
              </div>
            </div>
          </div>
          
        ) : (
  <div className="text-center mt-10">
  {modalMessage === "You have already completed the bonding process." ? (
      <>
        <h2 className="text-3xl font-bold text-red-500">Oops! You Have Already Bonded</h2>
        <p className="mt-4">
          It seems like you have already completed the bonding process. If you would like to review your bonding status, click the button below.
        </p>
        <button
          onClick={handleCheckBondingStatus}
          className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-yellow-600 transition mt-6 z-50"
        >
          Check Bonding Status
        </button>
      </>
      
    ) : (
      <>
        <h2 className="text-3xl font-bold text-green-500">Bonding Completed Successfully!</h2>
        <img src="/images/yeye.jpeg" alt="Success" className="mx-auto mt-6 w-64 h-64" />
        <p className="mt-4">
          Thank you for completing the bonding process. You can now log out or proceed with other tasks.
        </p>
        <button
          onClick={handleLogout}
          className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-yellow-600 transition mt-6 z-50"
        >
          Logout
        </button>
      </>
    )}
  </div>
)}

        {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-1/3 transition-all ease-in-out duration-300 z-50">
            <h3
              className={`text-lg font-semibold mb-4 ${
                isError ? 'text-red-500' : 'text-green-500'
              }`}
            >
              {isError ? 'Error' : 'Success'}
            </h3>
            <p className="mb-4">{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
              aria-label="Close modal"
            >
              Close
            </button>
          </div>
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={() => setShowModal(false)}
            aria-hidden="true"
          ></div>
        </div>
      )}  
      </div>

      <Footer />
    </div>
  );
};

export default Bonding;

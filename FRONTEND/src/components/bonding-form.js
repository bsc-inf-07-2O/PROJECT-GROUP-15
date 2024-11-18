import React, { useState } from 'react';
import Navbar from './NavBar';
import Footer from './footer';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode
import 'react-datepicker/dist/react-datepicker.css';

const Bonding = () => {
  const [form, setForm] = useState({
    FirstName: '',
    SurName: '',
    DateOfBirth: null,
    Sex: '',
    PhoneNumber: '',
    HomeVillage: '',
    TA: '',
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

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'PhoneNumber' ? (value === '' ? '' : Number(value)) : value,
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
      1: ['FirstName', 'SurName', 'DateOfBirth', 'Sex', 'PhoneNumber', 'HomeVillage',  'TA'],
      2: ['GuardianFullName', 'GuardianPostalAddress', 'GuardianPhysicalAddress', 'GuardianHomeVillage', 'GuardianDistrict', 'GuardianOccupation', 'GuardianPhoneNumber'],
      3: ['BankName', 'Branch', 'AccountName', 'AccountNumber'],
      4: ['studentId', 'nationalId'],
      5: ['Tuition'],
    };

    if (requiredFields[stage]) {
      requiredFields[stage].forEach((field) => {
        if (!form[field]) {
          stageErrors[field] = `${field.replace(/([A-Z])/g, ' $1').trim()} is required.`;
        } else {
          // Additional type validations
          if (field === 'PhoneNumber' && isNaN(form[field])) {
            stageErrors[field] = 'Phone number must be numeric.';
          }
          if (field === 'DateOfBirth' && !(form[field] instanceof Date) && isNaN(new Date(form[field]).getTime())) {
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

      // Append user ID to form data
      if (userId) {
        formData.append('userId', userId);
      }

      const response = await axios.post('http://localhost:3001/bonding/register', {   
        FirstName: form.FirstName,
        SurName: form.SurName,
        DateOfBirth: form.DateOfBirth,
        Sex: form.Sex,
        PhoneNumber: form.PhoneNumber,
        HomeVillage: form.HomeVillage,
        
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
      alert('Bonding is successful!');
      setIsBonded(true);
    } catch (error) {
      console.error('Error when bonding', error);
      alert('Failed to bond: ' + error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center bg-white p-6">
        {!isBonded ? (
          <div className="w-full max-w-4xl">
            <div className="flex justify-between mb-6">
              <h1 className="text-2xl font-bold">
                {stage === 1
                  ? 'STAGE 1: PERSONAL DETAILS'
                  : stage === 2
                  ? 'STAGE 2: PARENTS/GUARDIAN DETAILS'
                  : stage === 3
                  ? 'STAGE 3: BANK DETAILS'
                  : stage === 4
                  ? 'STAGE 4: DOCUMENTATION'
                  : 'STAGE 5: LOAN AMOUNT DETAILS'}
              </h1>
            </div>
            <div className="border-2 border-yellow-600 rounded-lg p-6">
              {stage === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['FirstName', 'SurName', 'PhoneNumber', 'HomeVillage', 'Sex', 'TA'].map((field, index) => (
                    <div key={index}>
                      <label className="block font-semibold mb-2">{field.replace(/([A-Z])/g, ' $1').trim()}:</label>
                      <input
                        type={field === 'PhoneNumber' ? 'number' : 'text'}
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        className="border border-yellow-500 p-2 rounded-md w-full"
                      />
                      {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
                    </div>
                  ))}
                  <div>
                    <label className="block font-semibold mb-2">Date Of Birth:</label>
                    <DatePicker
                      selected={form.DateOfBirth}
                      onChange={handleDateChange}
                      dateFormat="yyyy-MM-dd"
                      className="border border-yellow-500 p-2 rounded-md w-full"
                    />
                    {errors.DateOfBirth && <p className="text-red-500 text-sm">{errors.DateOfBirth}</p>}
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">Sex:</label>
                    <select name="Sex" value={form.Sex} onChange={handleChange} className="border border-yellow-500 p-2 rounded-md w-full">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    {errors.Sex && <p className="text-red-500 text-sm">{errors.Sex}</p>}
                  </div>
                </div>
              )}
              {stage === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['GuardianFullName', 'GuardianPostalAddress', 'GuardianPhysicalAddress', 'GuardianHomeVillage', 'GuardianDistrict', 'GuardianOccupation', 'GuardianPhoneNumber'].map((field, index) => (
                    <div key={index}>
                      <label className="block font-semibold mb-2">{field.replace(/([A-Z])/g, ' $1').trim()}:</label>
                      <input
                        type="text"
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        className="border border-yellow-500 p-2 rounded-md w-full"
                      />
                    </div>
                  ))}
                </div>
              )}
              
              {stage === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['BankName', 'Branch', 'AccountName', 'AccountNumber'].map((field, index) => (
                    <div key={index}>
                      <label className="block font-semibold mb-2">{field.replace(/([A-Z])/g, ' $1').trim()}:</label>
                      <input
                        type="text"
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        className="border border-yellow-500 p-2 rounded-md w-full"
                      />
                      {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
                    </div>
                  ))}
                </div>
              )}
              {stage === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-2">Upload Student ID:</label>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,application/pdf"
                      onChange={(event) => handleFileChange(event, 'studentId')}
                      className="border border-yellow-500 p-2 rounded-md w-full"
                    />
                    {errors.studentId && <p className="text-red-500 text-sm">{errors.studentId}</p>}
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">Upload National ID:</label>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,application/pdf"
                      onChange={(event) => handleFileChange(event, 'nationalId')}
                      className="border border-yellow-500 p-2 rounded-md w-full"
                    />
                    {errors.nationalId && <p className="text-red-500 text-sm">{errors.nationalId}</p>}
                  </div>
                </div>
              )}
              {stage === 5 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Tuition', 'UpkeepAmount'].map((field, index) => (
                    <div key={index}>
                      <label className="block font-semibold mb-2">{field.replace(/([A-Z])/g, ' $1').trim()}:</label>
                      <select
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        className="border border-yellow-500 p-2 rounded-md w-full"
                      >
                        <option value="">Select Amount MWK</option>
                        {field === 'Tuition' && <option value="MWK 650,000"> 650000</option>}
                        {field === 'UpkeepAmount' && <option value="MWK 580,000"> 580000</option>}
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
                {stage < 5 ? (
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
            <h2 className="text-3xl font-bold text-green-500">Bonding Completed Successfully!</h2>
            <img src="/images/yeye.jpeg" alt="Success" className="mx-auto mt-6 w-64 h-64" />
            <p className="mt-4">
              Thank you for completing the bonding process. You can now log out or proceed with other tasks.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Bonding;

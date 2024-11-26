import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    FirstName: '',
    SurName: '',
    RegNo: '',
    email: '',
    password: '',
    confirmPassword: '',
    University: '',
    termsAgreed: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message

    if (form.password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setErrorMessage("Passwords don't match.");
      return;
    }
    if (!form.termsAgreed) {
      setErrorMessage('Please agree to the terms and conditions.');
      return;
    }

    setLoading(true); // Set loading state
    try {
      await axios.post(`http://localhost:3001/users/register`, form);
      setShowSuccessModal(true); // Open modal on success
    } catch (error) {
      console.error('Error creating account', error);
      setErrorMessage('Failed to create account: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="rounded-lg shadow-lg flex flex-col w-11/12 md:w-3/4 lg:w-2/3 p-8">
        <div className="flex justify-center mb-4">
          <img src="/images/logo.png" alt="Platform Logo" className="h-24" />
        </div>

        <h2 className="text-center text-xl font-semibold">WELCOME TO ONLINE BONDING</h2>
        <h3 className="text-center text-lg my-2">CREATE AN ACCOUNT</h3>
        <p className="text-center mb-4">
          Create your account or <Link to="/" className="text-blue-700 hover:text-yellow-400">Login</Link>
        </p>

        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="FirstName"
              placeholder="First name"
              value={form.FirstName}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="SurName"
              placeholder="Surname"
              value={form.SurName}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="RegNo"
              placeholder="Reg No"
              value={form.RegNo}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 relative">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                required
                className="p-2 border border-gray-300 rounded w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-600"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="p-2 border border-gray-300 rounded w-full"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-600"
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <select
              name="University"
              value={form.University}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select University</option>
              <option value="University Of Malawi">University Of Malawi</option>
              <option value="Malawi University Of Applied Science">Malawi University Of Applied Science</option>
              <option value="Malawi University Of Science And Technology">Malawi University Of Science And Technology</option>
              <option value="Kamuzu University Of Health Science">Kamuzu University Of Health Science</option>
              <option value="Mzuzu University Of Education">Mzuzu University Of Education</option>
              <option value="LUANAR">LUANAR</option>
            </select>
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="termsAgreed"
              checked={form.termsAgreed}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="termsAgreed" className="text-sm">
              I agree to the terms and conditions set by HESLGB
            </label>
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded transition duration-200 ${loading ? 'bg-gray-400' : 'bg-yellow-600 hover:bg-yellow-600'}`}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {showSuccessModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-1/2 transition-all ease-in-out duration-300 z-50">
              <h3 className="text-lg font-semibold mb-4">Account Created Successfully!</h3>
              <p className="mb-4">Your account has been created. You can now log in.</p>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate('/');
                }}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
              >
                Go to Login
              </button>
            </div>
            <div
              className="fixed inset-0 bg-black opacity-50 z-40"
              onClick={() => setShowSuccessModal(false)}
              aria-hidden="true"
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;

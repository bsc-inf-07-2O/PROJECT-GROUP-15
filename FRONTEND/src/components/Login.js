import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [loginDetails, setLoginDetails] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const handleLogin = async () => {
    if (!loginDetails.email || !loginDetails.password) {
      setMessage('Please enter both email and password');
      return;
    }
    if (loginDetails.password.length < 8) {
      setMessage('Password is too short. Please enter at least 8 characters.');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3001/auth/login', {
        email: loginDetails.email,
        password: loginDetails.password,
      });
      if (response.data) {
        localStorage.setItem('token', response.data.accessToken); // Store the token
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Save user info to localStorage
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed', error);
      setMessage(
        error.response && error.response.status === 401
          ? 'Invalid email or password'
          : 'Login failed, please try again later'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-400 p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <img className="mx-auto h-16 w-auto" src="/images/logo.png" alt="Board Logo" />
          <h1 className="text-center text-2xl font-extrabold">WELCOME TO ONLINE BONDING</h1>
          <h2 className="mt-6 text-center text-xl font-semibold text-gray-900">
            Login below or <Link to="/auth-check" className="text-blue-300 hover:text-yellow-400">SignUp</Link>
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm">
            <div className="mb-4">
              <input
                type="email"
                name="email"
                
                placeholder="Email"
                value={loginDetails.email}
                onChange={handleLoginInputChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={loginDetails.password}
                onChange={handleLoginInputChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grey-500 ${
                loading ? 'opacity-50' : ''
              }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          <div>
            <Link to="/password/reset" className="text-black flex justify-center item-center hover:text-yellow-400">
              Lost your password?
            </Link>
          </div>
        </form>
        {message && <p className="mt-2 text-center text-sm text-red-600">{message}</p>}
        <div className="text-center mt-4">
          <p className="text-sm">
            © 2024 Higher Education Students' Grants & Loans Board
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

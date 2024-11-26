import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './Authentication';

const LoginForm = () => {
  const { login } = useAuth();
  const [loginDetails, setLoginDetails] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
    setMessage(''); // Clear error message on input
  };

  const validatePassword = (password) => password.length >= 8;

  const handleLogin = async () => {
    const { email, password } = loginDetails;

    if (!email || !password) {
      setMessage('Please enter both email and password');
      return;
    }
    if (!validatePassword(password)) {
      setMessage('Password is too short. Please enter at least 8 characters.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3001/auth/login', { email, password });
      if (response.data) {
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        login();
        navigate('/dashboard');
      }
    } catch (error) {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6">
        <div className="flex flex-col items-center">
          <img className="h-20 mb-4" src="/images/logo.png" alt="Board Logo" />
          <h1 className="text-center text-2xl font-bold text-gray-900">
            Welcome to online bonding platform
          </h1>
          <p className="text-center text-gray-500 mt-2">
            Login below or{' '}
            <Link to="/auth-check" className="text-blue-600 hover:underline">
              create new account
            </Link>
          </p>
        </div>
        <form className="space-y-4">
          <div className="rounded-md shadow-sm">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginDetails.email}
                onChange={handleLoginInputChange}
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <br />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={loginDetails.password}
                onChange={handleLoginInputChange}
                className={`appearance-none rounded-b-md relative block w-full px-3 py-2 border ${
                  validatePassword(loginDetails.password)
                    ? 'border-gray-300'
                    : 'border-red-500'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          {loginDetails.password && !validatePassword(loginDetails.password) && (
            <p className="text-sm text-red-600">
              Password must be at least 8 characters long.
            </p>
          )}
          <div>
            <button
              type="button"
              onClick={handleLogin}
              disabled={loading || !loginDetails.email || !validatePassword(loginDetails.password)}
              className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          <div className="text-center">
            <Link to="/password/reset" className="text-gray-500 hover:text-yellow-600">
              Forgot password?
            </Link>
          </div>
        </form>
        {message && <p className="mt-2 text-center text-sm text-red-600">{message}</p>}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            © 2024 Higher Education Students' Grants & Loans Board
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

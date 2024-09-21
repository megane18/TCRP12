import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const userId = data.id;
        setSuccessMessage(`Sign-up successful! Your ID is: ${userId}`);
        navigate(`/login?id=${userId}`);
      } else {
        setErrorMessage(data.message || 'Sign-up failed.');
      }
    } catch (error) {
      setErrorMessage('An error occurred during sign-up.');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-4 pt-32">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center text-black">Sign up</h1>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="flex text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-200 text-black"
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="flex text-sm font-medium text-black mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-black placeholder-gray-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-200"
              style={{
                fontFamily: 'Verdana, sans-serif',
                WebkitTextSecurity: 'disc',
                MozTextSecurity: 'disc',
                textSecurity: 'disc',
              }}
              required
            />
          </div>

          <div className="text-sm">
            <a href="#" className="text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div>

            <div className="text-sm">
                <Link to="/Login" className="text-blue-600 hover:underline">
                  have a login?
                </Link>
              </div>


          

          <div className="flex items-start">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 mr-2"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              By clicking on this box and signing up, you agree to our <a href='#'>Terms and Conditions and Privacy Policy</a>
            </label>
          </div>

          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;

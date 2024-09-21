import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'; // For handling URL parameters

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [searchParams] = useSearchParams(); // For getting ID from URL
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user ID from URL if present
    const idFromUrl = searchParams.get('id');
    if (idFromUrl) {
      setUserId(idFromUrl);
    }

    // Option: Retrieve userId from localStorage if you stored it there
    // const storedUserId = localStorage.getItem('userId');
    // if (storedUserId) setUserId(storedUserId);
  }, [searchParams]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send GET request with the user ID to log in
      const response = await fetch(`http://localhost:8000/users/${userId}`);

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(`Welcome, ${data.firstName || 'User'}! You have logged in successfully.`);

        // Navigate to dashboard or home
        navigate('/dashboard');
      } else {
        setErrorMessage('Login failed. Please check your ID or sign up.');
      }
    } catch (error) {
      setErrorMessage('An error occurred during login.');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-4 pt-32">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center text-black">Log in</h1>

        <form className="space-y-6" onSubmit={handleLogin}>
          {/* If user ID is prefilled, show it here */}
          <div>
            <label htmlFor="userId" className="flex text-sm font-medium text-gray-700 mb-1">User ID</label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-200 text-black"
              required
            />
          </div>

          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

import React from 'react';
// import { Eye } from 'lucide-react';

const SignUpForm = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-4 pt-32">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center text-black">Sign up</h1>
        
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="flex text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-200 text-black"
            />
          </div>
          
          <div className="relative">
            <label htmlFor="password" className="flex text-sm font-medium text-black mb-1">
              Password
            </label>
            <input
                type="password"
                placeholder=""
                className="w-full px-3 py-2 text-black placeholder-gray-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-200"
                style={{
                  fontFamily: 'Verdana, sans-serif',
                  WebkitTextSecurity: 'disc',
                  MozTextSecurity: 'disc',
                  textSecurity: 'disc',
                }}
              />
            {/* <Eye className="absolute right-3 top-8 text-gray-400" size={20} /> */}
          </div>
          
          <div className="text-sm">
            <a href="#" className="text-blue-600 hover:underline">
              Forgot Password?
            </a>
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
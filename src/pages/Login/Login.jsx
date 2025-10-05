import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const [loginType, setLoginType] = useState('');
  const navigate = useNavigate();

  const handleLogin = (type) => {
    setLoginType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setLoginType('');
  };

  return (
    <div className=" bg-gray-50">

      {/* Main Content */}
      <div className="flex min-h-[90vh]">
        {/* Left Section - For Companies */}
        <div className="w-1/2 bg-white flex items-center justify-center px-8">
          <div className="max-w-sm text-center">
            <div className="mb-6">
              <span className="bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-medium">
                Hospitals
              </span>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-6">For Doctors</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Thousands of hospitals and clinics rely on our platform 
              to manage appointments, patients, and healthcare services efficiently.
            </p>
            
            <a
              href={`http://localhost:8000/admin/login`}
              className="bg-black text-white px-8 py-3 rounded font-medium hover:bg-gray-800 mb-6 w-32 inline-block text-center"
            >
              Login
            </a>
            
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <a href="http://localhost:8000/admin/register" className="text-green-600 hover:text-green-700">Sign Up</a>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-gray-200"></div>

        {/* Right Section - For Developers */}
        <div className="w-1/2 bg-gray-50 flex items-center justify-center px-8">
          <div className="max-w-sm text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">For Patients</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Join over 26 million Patients, Booked Appointmets
              best certified doctors prescriptions ..
            </p>
            
            <button 
              onClick={() => handleLogin('developer')}
              className="bg-white text-gray-900 border border-gray-300 px-8 py-3 rounded font-medium hover:bg-gray-50 mb-6 w-32"
            >
              Login
            </button>
            
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <a href="#" className="text-green-600 hover:text-green-700">Sign up.</a>
            </p>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {loginType === 'company' ? 'Company Login' : 'Developer Login'}
              </h3>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  placeholder="Enter your password"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="mr-2"
                    id="remember"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
                </div>
                <a href="#" className="text-sm text-green-600 hover:text-green-700">Forgot password?</a>
              </div>
              
              <button
                onClick={closeModal}
                className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 font-medium"
              >
                Sign In
              </button>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                  {loginType === 'company' ? 'Contact sales' : 'Sign up'}
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
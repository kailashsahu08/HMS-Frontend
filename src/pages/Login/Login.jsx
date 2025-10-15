import React, { useState } from 'react';
import PatientLoginModal from '../../Components/auth/PatientLoginModal';

const Login = () => {
  const [showPatientModal, setShowPatientModal] = useState(false);

  const handleLogin = () => {
    setShowPatientModal(true);
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

      {showPatientModal && <PatientLoginModal onClose={() => setShowPatientModal(false)} />}
    </div>
  );
};

export default Login;
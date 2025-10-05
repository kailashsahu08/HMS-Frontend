import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const DoctorDetail = ({ doctor, isLoaded }) => {
  const getDefaultImage = (gender) => {
    return gender === "male"
      ? "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face"
      : "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face";
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
        <div className="relative">
          <img
            src={doctor.profile_picture || getDefaultImage(doctor.gender)}
            alt={doctor.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
          {doctor.is_verified && (
            <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dr. {doctor.first_name} {doctor.last_name}
          </h1>
          <p className="text-xl text-indigo-600 font-semibold mb-3">
            {doctor.specialization}
          </p>
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start mb-4">
            {doctor.is_available && (
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-700 border border-green-300">
                ✅ Available
              </span>
            )}
            {doctor.is_verified && (
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-100 text-blue-700 border border-blue-300">
                ✓ Verified
              </span>
            )}
            <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold border border-purple-300">
              {new Date().getFullYear() - doctor.experience_years}+ Years Experience
            </span>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <p><span className="font-semibold">📍</span> {doctor.address}, {doctor.city}</p>
            <p><span className="font-semibold">📞</span> {doctor.phone}</p>
            <p><span className="font-semibold">📧</span> {doctor.email}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500">
          <p className="text-2xl font-bold text-gray-900">1,250+</p>
          <p className="text-sm text-gray-600">Patients Treated</p>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500">
          <p className="text-2xl font-bold text-gray-900">4.9</p>
          <p className="text-sm text-gray-600">Rating</p>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-500">
          <p className="text-2xl font-bold text-gray-900">30 min</p>
          <p className="text-sm text-gray-600">Avg. Consultation</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">About Doctor</h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          {doctor.bio || `Dr. ${doctor.first_name} ${doctor.last_name} is an experienced ${doctor.specialization} with over ${new Date().getFullYear() - doctor.experience_years} years of practice. Known for providing comprehensive care and building strong patient relationships.`}
        </p>
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-orange-200">
          <p className="text-3xl font-bold text-orange-700 mb-1">₹{parseFloat(doctor.consultation_fee).toFixed(0)}</p>
          <p className="text-sm text-orange-600 font-semibold">Consultation Fee</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Weekly Availability</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {doctor?.availability_schedule?.map((schedule, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border ${schedule.isAvailable ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-800">{schedule.day_name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${schedule.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {schedule.isAvailable ? "Available" : "Not Available"}
                </span>
              </div>
              {schedule.isAvailable && schedule.time_intervals.map((interval, i) => (
                <div key={i} className="text-xs text-gray-600 mt-1">
                  {interval.start_time.slice(0, 5)} - {interval.end_time.slice(0, 5)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Location</h3>
        <div className="rounded-xl overflow-hidden border border-gray-200 shadow-lg h-64">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={{ lat: parseFloat(doctor.latitude) || 28.6139, lng: parseFloat(doctor.longitude) || 77.209 }}
              zoom={14}
            >
              <Marker position={{ lat: parseFloat(doctor.latitude) || 28.6139, lng: parseFloat(doctor.longitude) || 77.209 }} />
            </GoogleMap>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 bg-gray-100">
              <div className="text-center">
                <div className="animate-pulse mb-2">🗺️</div>
                <p>Loading Map...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;

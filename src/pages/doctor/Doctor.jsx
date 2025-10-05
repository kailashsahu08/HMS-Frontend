import React, { useEffect, useState } from "react";

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
    fetch(`${baseUrl}/api/doctors`)
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data?.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading doctors...</p>
      </div>
    );
  }
  return (
    <div className="bg-gradient-to-br from-slate-50 via-green-50 to-slate-100 min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Meet Our{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Expert Doctors
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              World-class healthcare professionals commmx-auto committed to providing exceptional medical care with
              compassion and expertise.
            </p>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="doctor-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="glass-card relative rounded-2xl p-6 sm:p-10 transition-all duration-500 group bg-white shadow-md mb-4 my-7"
              >
                {/* Status */}
                <div className="absolute top-4 right-4 z-10">
                  {doctor.is_verified ? (
                    <div className="status-online w-3 h-3 rounded-full border-2 border-white shadow-lg"></div>
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-gray-400 border-2 border-white"></div>
                  )}
                </div>
                <div class="relative flex flex-col items-center mb-6">
                  <div class="relative w-full flex justify-center">
                    <div class="absolute top-[-30px] left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-full p-0.5  shadow-lg">
                      <img
                        src={
                          doctor.profile_picture
                            ? `${doctor.profile_picture}`
                            : doctor.gender === "male"
                            ? "https://img.freepik.com/free-photo/hospital-healthcare-workers-covid-19-treatment-concept-young-doctor-scrubs-making-daily-errands-clinic-listening-patient-symptoms-look-camera-professional-physician-curing-diseases_1258-57233.jpg"
                            : "https://img.freepik.com/free-photo/healthcare-workers-preventing-virus-quarantine-campaign-concept-cheerful-friendly-asian-female-physician-doctor-with-clipboard-daily-checkup-standing-white-background_1258-107867.jpg"
                        }
                        alt={doctor.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      {doctor.is_verified ? (
                        <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1.5 border-2 border-white shadow-lg">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 
                          01-1.414 0l-4-4a1 1 0 011.414-1.414L8 
                          12.586l7.293-7.293a1 1 0 
                          011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <h3 className="mt-16 text-xl sm:text-2xl font-bold text-gray-900 text-center">
                    Dr. {doctor.first_name} {doctor.last_name}
                  </h3>
                  <div className="specialty-badge px-4 py-2 rounded-full mt-2 bg-green-100">
                    <p className="text-sm font-medium text-green-700">
                      {doctor.specialization || "No specialization"}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
                  <div className="metric-card p-3 rounded-lg bg-gray-50 border-l-4 border-green-500">
                    <div className="text-2xl font-bold text-gray-900">
                      {doctor.experience_years || 0}
                    </div>
                    <div className="text-xs text-gray-600 font-medium">
                      Years Exp.
                    </div>
                  </div>
                  <div className="metric-card p-3 rounded-lg bg-gray-50 border-l-4 border-green-500">
                    <div className="text-2xl font-bold text-green-600">
                      ${doctor.consultation_fee || 0}
                    </div>
                    <div className="text-xs text-gray-600 font-medium">
                      Consultation
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-3 mb-6 relative z-10">
                  <p className="text-sm text-gray-600">
                    📧 {doctor.email || "Not Available"}
                  </p>
                  <p className="text-sm text-gray-600">
                    📞 {doctor.phone || "Not Found"}
                  </p>
                  <p className="text-sm text-gray-600">
                    ⏰{" "}
                    {doctor.availability_start_time &&
                    doctor.availability_end_time
                      ? `${doctor.availability_start_time} - ${doctor.availability_end_time}`
                      : "Not Available"}
                  </p>
                  <p className="text-sm text-gray-600">
                    📍{" "}
                    {doctor.city || doctor.state
                      ? `${doctor.city || ""}${
                          doctor.city && doctor.state ? ", " : ""
                        }${doctor.state || ""}`
                      : "Location not available"}
                  </p>
                </div>

                {/* Action */}
                <div className="relative">
                  <a
                    href={`/doctors/${doctor.id}/appointments`}
                    className="btn-primary w-full py-3 px-6 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 
                        1v1H4a2 2 0 00-2 
                        2v10a2 2 0 002 
                        2h12a2 2 0 
                        002-2V6a2 2 0 
                        00-2-2h-1V3a1 1 0 
                        10-2 0v1H7V3a1 1 0 
                        00-1-1zm0 5a1 1 0 
                        000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>View Appointments</span>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <h3 className="text-2xl font-bold text-gray-700 mb-4">
                No Doctors Available
              </h3>
              <p className="text-gray-500 text-center max-w-md">
                We're currently updating our medical staff directory. Please
                check back soon or contact our administration.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctor;

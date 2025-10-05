import React, { useState } from "react";

const About = () => {
  // Example emergency number toggle (just to show JS functionality)
  const [emergencyNumber] = useState("(555) 123-4567");

  return (
    <div className="antialiased bg-gray-50">
      {/* Hero Section */}
      <div className="relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt="Modern Hospital Building"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-800/75"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block xl:inline">About Our</span>{" "}
              <span className="block text-green-300 xl:inline">Hospital</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-200 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Providing Excellence in Healthcare Since 1990
            </p>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                <i className="fas fa-phone-alt mr-2"></i>
                Emergency: {emergencyNumber}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mission Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Our Mission
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Committed to excellence in healthcare delivery
              </p>
            </div>
            <p className="text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
              We are committed to providing exceptional healthcare services with
              compassion and innovation. Our mission is to improve the health
              and well-being of our community through accessible, high-quality
              medical care and cutting-edge technology.
            </p>
          </div>

          {/* Values Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Our Core Values
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              The principles that guide our healthcare delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="text-green-600 text-4xl mb-4">
                <i className="fas fa-heart"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Compassion
              </h3>
              <p className="text-gray-600">
                We treat every patient with empathy and understanding, ensuring
                their comfort and well-being. Our healthcare professionals are
                dedicated to providing personalized care with a human touch.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="text-green-600 text-4xl mb-4">
                <i className="fas fa-star"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Excellence
              </h3>
              <p className="text-gray-600">
                We maintain the highest standards of medical care and
                professional service. Our commitment to excellence drives us to
                continuously improve and innovate.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="text-green-600 text-4xl mb-4">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Community
              </h3>
              <p className="text-gray-600">
                We actively engage with and support our local community's health
                needs. Our hospital serves as a healthcare hub for the entire
                community.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Our Leadership Team
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Meet the experts leading our healthcare institution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="w-32 h-32 mx-auto rounded-full bg-gray-200 mb-4 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                  alt="Dr. Sarah Johnson"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Dr. Sarah Johnson
              </h3>
              <p className="text-green-600 font-medium">Chief Medical Officer</p>
              <p className="mt-2 text-gray-600">
                20+ years of experience in healthcare management
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="w-32 h-32 mx-auto rounded-full bg-gray-200 mb-4 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                  alt="Dr. Michael Chen"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Dr. Michael Chen
              </h3>
              <p className="text-green-600 font-medium">Head of Surgery</p>
              <p className="mt-2 text-gray-600">
                Specialized in advanced surgical procedures
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="w-32 h-32 mx-auto rounded-full bg-gray-200 mb-4 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                  alt="Dr. Emily Rodriguez"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Dr. Emily Rodriguez
              </h3>
              <p className="text-green-600 font-medium">
                Director of Patient Care
              </p>
              <p className="mt-2 text-gray-600">
                Expert in patient care and healthcare quality
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

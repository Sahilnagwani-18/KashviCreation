import React from "react";
import { FaPhone, FaGlobe, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center p-6">
      {/* Main Container */}
      <div className="bg-white rounded-lg shadow-2xl transform transition-all duration-500 hover:rotate-3 hover:scale-105 w-full max-w-4xl p-8">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center text-purple-900 mb-8">
          Contact Us
        </h1>

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Phone */}
          <div className="flex items-center space-x-4 p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-300">
            <div className="p-4 bg-purple-500 text-white rounded-full">
              <FaPhone className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-purple-900">Phone</h2>
              <p className="text-gray-600">+123-456-7890</p>
            </div>
          </div>

          {/* Website */}
          <div className="flex items-center space-x-4 p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-300">
            <div className="p-4 bg-purple-500 text-white rounded-full">
              <FaGlobe className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-purple-900">Website</h2>
              <p className="text-gray-600">www.reallygreatsite.com</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-4 p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-300">
            <div className="p-4 bg-purple-500 text-white rounded-full">
              <FaEnvelope className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-purple-900">Email</h2>
              <p className="text-gray-600">hello@reallygreatsite.com</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center space-x-4 p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-300">
            <div className="p-4 bg-purple-500 text-white rounded-full">
              <FaMapMarkerAlt className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-purple-900">Address</h2>
              <p className="text-gray-600">123 Anywhere St., Any City, ST 12345</p>
            </div>
          </div>
        </div>

        {/* 3D Rotating Circle */}
        <div className="mt-8 flex justify-center">
          <div className="w-24 h-24 bg-purple-500 rounded-full transform rotate-45 hover:rotate-0 transition-transform duration-500"></div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
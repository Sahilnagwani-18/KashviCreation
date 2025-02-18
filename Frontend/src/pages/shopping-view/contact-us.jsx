import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/solid";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/contact-message", formData);
      if (response.data.success) {
        setSuccessMessage("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Clear form
      } else {
        setErrorMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#F5F3FF] min-h-screen p-8">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-[#4A154B] mb-4">Contact Us</h1>
        <p className="text-xl text-[#6D4A72]">
          Have questions or need assistance? We're here to help!
        </p>
      </motion.header>

      {/* Contact Content */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-[#4A154B] mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#6D4A72]">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-[#6D4A72] rounded-lg focus:ring-[#4A154B] focus:border-[#4A154B]"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#6D4A72]">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-[#6D4A72] rounded-lg focus:ring-[#4A154B] focus:border-[#4A154B]"
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#6D4A72]">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-[#6D4A72] rounded-lg focus:ring-[#4A154B] focus:border-[#4A154B]"
                placeholder="Your message..."
                required
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-[#6D4A72] text-white rounded-lg hover:bg-[#4A154B] transition-colors"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </div>
            {successMessage && (
              <p className="text-green-500 text-center">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}
          </form>
        </motion.div>

        {/* Contact Information and Map */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#4A154B] mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <EnvelopeIcon className="w-6 h-6 text-[#6D4A72]" />
                <div>
                  <p className="text-lg font-semibold text-[#4A154B]">Email</p>
                  <p className="text-[#6D4A72]">support@kashvicreation.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <PhoneIcon className="w-6 h-6 text-[#6D4A72]" />
                <div>
                  <p className="text-lg font-semibold text-[#4A154B]">Phone</p>
                  <p className="text-[#6D4A72]">+91 12345 67890</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPinIcon className="w-6 h-6 text-[#6D4A72]" />
                <div>
                  <p className="text-lg font-semibold text-[#4A154B]">Address</p>
                  <p className="text-[#6D4A72]">123 Kashvi Lane, Creative City, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <iframe
              title="Store Location"
              width="100%"
              height="300"
              style={{ border: "0" }}
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.123456789012!2d72.8311!3d21.1702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDEwJzEyLjgiTiA3MsKwNDknNTIuMCJF!5e0!3m2!1sen!2sin!4v1632912345678"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;
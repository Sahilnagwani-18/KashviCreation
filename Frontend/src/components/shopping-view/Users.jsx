import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Counter = ({ end, duration, startCounting }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return; // Start counting only when visible
    let start = 0;
    const stepTime = (duration * 1000) / end;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [startCounting, end, duration]);

  return <span>{count}</span>;
};

const FramerMotion = () => {
  const [startCounting, setStartCounting] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 m-auto">
      {/* Stats Section */}
      <motion.div
        className="flex flex-wrap gap-4 md:gap-8 justify-center"
        whileInView={() => setStartCounting(true)} // Start counting when visible
        viewport={{ once: true }} // Ensures animation plays only once
      >
        {/* Clients */}
        <motion.div
          className="pt-6 md:pt-10 h-32 md:h-40 w-40 md:w-50 bg-white border-amber-200 border-4 rounded-3xl shadow-xl text-2xl md:text-4xl font-bold text-amber-600"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Counter end={650} duration={4} startCounting={startCounting} />+ <br /> Customer
        </motion.div>

        {/* Years */}
        <motion.div
          className="pt-6 md:pt-10 h-32 md:h-40 w-32 md:w-40 bg-white border-amber-200 border-4 rounded-3xl shadow-xl text-2xl md:text-4xl font-bold text-amber-600"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Counter end={12} duration={4} startCounting={startCounting} />+ <br /> Years
        </motion.div>

        {/* Events */}
        <motion.div
          className="pt-6 md:pt-10 h-32 md:h-40 w-32 md:w-40 bg-white border-amber-200 border-4 rounded-3xl shadow-xl text-2xl md:text-4xl font-bold text-amber-600"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Counter end={1000} duration={1} startCounting={startCounting} />+ <br /> Orders
        </motion.div>
      </motion.div>

      {/* Alternating Sections */}
      <div className="w-full mt-10 md:mt-20 space-y-10 md:space-y-20 max-w-6xl">
        {/* Section 1: Up */}
        <motion.section
          className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 p-6 md:p-8 bg-white rounded-3xl shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="w-full md:w-1/2 text-left">
            <h2 className="text-2xl md:text-4xl font-bold text-amber-600 mb-4">
              What is Kashvi Creation?
            </h2>
            <p className="text-gray-700 text-base md:text-lg">
              Kashvi Creation is a premier event management company dedicated to
              creating unforgettable experiences. With a passion for creativity
              and attention to detail, we specialize in weddings, corporate
              events, and private celebrations.
            </p>
            <button className="mt-4 md:mt-6 px-4 md:px-6 py-2 md:py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition">
              Learn More
            </button>
          </div>
          <div className="w-full md:w-1/2 h-48 md:h-64 overflow-hidden rounded-2xl shadow-md mt-6 md:mt-0">
            <img
              src="/images/image2.jpg"
              alt="Kashvi Creation"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.section>

        {/* Section 2: Down */}
        <motion.section
          className="flex flex-col md:flex-row-reverse items-center justify-between gap-6 md:gap-8 p-6 md:p-8 bg-white rounded-3xl shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="w-full md:w-1/2 text-left">
            <h2 className="text-2xl md:text-4xl font-bold text-amber-600 mb-4">
              Why Choose Kashvi Creation?
            </h2>
            <p className="text-gray-700 text-base md:text-lg">
              We bring your vision to life with our expertise, creativity, and
              dedication. From concept to execution, we ensure every detail is
              perfect, making your event truly special.
            </p>
            <button className="mt-4 md:mt-6 px-4 md:px-6 py-2 md:py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition">
              Our Services
            </button>
          </div>
          <div className="w-full md:w-1/2 h-48 md:h-64 overflow-hidden rounded-2xl shadow-md mt-6 md:mt-0">
            <img
              src="/images/image1.jpg"
              alt="Why Choose Us"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.section>

        {/* Section 3: Up */}
        <motion.section
          className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 p-6 md:p-8 bg-white rounded-3xl shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="w-full md:w-1/2 text-left">
            <h2 className="text-2xl md:text-4xl font-bold text-amber-600 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 text-base md:text-lg">
              At Kashvi Creation, our mission is to deliver exceptional event
              experiences that exceed expectations. We strive to create moments
              that are cherished forever.
            </p>
            <button className="mt-4 md:mt-6 px-4 md:px-6 py-2 md:py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition">
              Contact Us
            </button>
          </div>
          <div className="w-full md:w-1/2 h-48 md:h-64 overflow-hidden rounded-2xl shadow-md mt-6 md:mt-0">
            <img
              src="/images/image4.jpg"
              alt="Our Mission"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default FramerMotion;
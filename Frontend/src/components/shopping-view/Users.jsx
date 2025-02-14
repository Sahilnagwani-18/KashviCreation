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
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-[#FFF5ED]">
      {/* Stats Section */}
      <motion.div
        className="flex flex-wrap gap-8"
        whileInView={() => setStartCounting(true)} // Start counting when visible
        viewport={{ once: true }} // Ensures animation plays only once
      >
        {/* Clients */}
        <motion.div
          className="pt-10 h-40 w-40 bg-white border-amber-200 border-4 rounded-3xl shadow-xl text-4xl font-bold text-amber-600"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Counter end={650} duration={4} startCounting={startCounting} />+ <br /> Clients
        </motion.div>

        {/* Years */}
        <motion.div
          className="pt-10 h-40 w-40 bg-white border-amber-200 border-4 rounded-3xl shadow-xl text-4xl font-bold text-amber-600"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Counter end={12} duration={4} startCounting={startCounting} />+ <br /> Years
        </motion.div>

        {/* Events */}
        <motion.div
          className="pt-10 h-40 w-40 bg-white border-amber-200 border-4 rounded-3xl shadow-xl text-4xl font-bold text-amber-600"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Counter end={1000} duration={1} startCounting={startCounting} />+ <br /> Events
        </motion.div>
      </motion.div>

      {/* Alternating Sections */}
      <div className="w-full mt-20 space-y-20">
        {/* Section 1: Up */}
        <motion.section
          className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 bg-white rounded-3xl shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex-1 text-left">
            <h2 className="text-4xl font-bold text-amber-600 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-gray-700">
              We have over 650+ satisfied clients, 12+ years of experience, and
              have successfully managed 1000+ events. Our dedication to quality
              and customer satisfaction sets us apart.
            </p>
          </div>
          <div className="flex-1">
            <img
              src="https://via.placeholder.com/400x300"
              alt="Why Choose Us"
              className="rounded-2xl shadow-md"
            />
          </div>
        </motion.section>

        {/* Section 2: Down */}
        <motion.section
          className="flex flex-col md:flex-row-reverse items-center justify-between gap-8 p-8 bg-white rounded-3xl shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex-1 text-left">
            <h2 className="text-4xl font-bold text-amber-600 mb-4">
              Our Expertise
            </h2>
            <p className="text-gray-700">
              With a team of seasoned professionals, we bring unparalleled
              expertise to every project. From small gatherings to large-scale
              events, we handle it all with precision and care.
            </p>
          </div>
          <div className="flex-1">
            <img
              src="https://via.placeholder.com/400x300"
              alt="Our Expertise"
              className="rounded-2xl shadow-md"
            />
          </div>
        </motion.section>

        {/* Section 3: Up */}
        <motion.section
          className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 bg-white rounded-3xl shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex-1 text-left">
            <h2 className="text-4xl font-bold text-amber-600 mb-4">
              Client Testimonials
            </h2>
            <p className="text-gray-700">
              Don't just take our word for it. Hear from our clients who have
              experienced our exceptional service and attention to detail.
            </p>
          </div>
          <div className="flex-1">
            <img
              src="https://via.placeholder.com/400x300"
              alt="Client Testimonials"
              className="rounded-2xl shadow-md"
            />
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default FramerMotion;
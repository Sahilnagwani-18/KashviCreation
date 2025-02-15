import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Counter = ({ end, duration, startCounting }) => {
  const [count, setCount] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    if (!startCounting) return; // Start counting only when visible

    let start = 0;
    const increment = end / (duration * 60); // How much to increment per frame, assuming ~60 FPS
    const totalDuration = duration * 1000; // Convert duration to ms

    const startTime = performance.now();
    
    // This function will be called recursively to animate the count
    const animate = (timestamp) => {
      const elapsed = timestamp - startTime;
      if (elapsed < totalDuration) {
        // Keep updating the counter during the animation
        const newCount = Math.min(end, start + (elapsed / totalDuration) * end);
        setCount(Math.floor(newCount)); // Update count (floor to avoid decimal values)
        requestAnimationFrame(animate); // Continue animating
      } else {
        setCount(end); // Ensure it reaches the exact end value
      }
    };

    requestAnimationFrame(animate); // Start animation

    return () => {}; // Cleanup if needed
  }, [startCounting, end, duration]);

  return <span>{count}</span>;
};


const FramerMotion = () => {
  const [startCounting, setStartCounting] = useState(false);
  const counterData = [
    { end: 3000, label: "Customer", delay: 0.2 },
    { end: 10, label: "Years", delay: 0.4 },
    { end: 10000, label: "Orders", delay: 0.6 },
  ];

  const navigate = useNavigate();
  const handleClick = (url) => {
    navigate(url);
  };

  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 mt-10 mb-10">
      {/* Stats Section */}
      <motion.div
        className="flex flex-wrap gap-4 md:gap-8 justify-center"
        whileInView={() => setStartCounting(true)}
        viewport={{ once: true }}
      >
        {counterData.map((data, index) => (
          <motion.div
          key={index}
          className="pt-6 md:pt-8 h-40 md:h-48 w-40 md:w-56 bg-white border-amber-200 border-4 rounded-3xl shadow-xl text-2xl md:text-4xl font-bold text-amber-600 flex items-center justify-center flex-col"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: data.delay }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <Counter end={data.end} duration={3} startCounting={startCounting} /> +
          </div>
          <div className="text-center text-2xl ">{data.label}</div>
        </motion.div>
        ))}        
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
            Kashvi Collection: Timeless Elegance
            </h2>
            <p className="text-gray-700 text-base md:text-lg">
              Welcome to Kashvi Collection, Surat’s finest saree boutique. Our exclusive range of
              handpicked sarees combines tradition with contemporary elegance, ensuring every woman
              feels graceful and confident.
            </p>
            <button 
              onClick={() => handleClick("/shop/about-us")}
              className="mt-4 md:mt-6 px-4 md:px-6 py-2 md:py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
            >
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
              Every saree tells a story, and we bring you the finest craftsmanship from across India.
              Whether you're looking for bridal elegance, festive charm, or everyday grace, we have
              something special for you. Our sarees are a celebration of tradition and modernity. 
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
              Our Promise
            </h2>
            <p className="text-gray-700 text-base md:text-lg">
              At Kashvi Collection, we promise quality, authenticity, and a seamless shopping
              experience. Our sarees are curated to reflect the richness of Indian heritage while
              embracing modern trends. We are committed to providing you with the best.
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
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Img from "../../assets/authImg.jpg";

function AuthLayout() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white">
      {/* Desktop/Laptop Left Branding Image */}
      <div className="hidden lg:block relative w-1/2">
        <img
          src={Img}
          alt="Fashion Showcase"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-6 py-8"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow-lg tracking-wide mb-2">
            KASHVI CREATION
          </h1>
          <p className="text-base sm:text-lg font-medium text-gray-200">
            "प्रेम और विश्वास का अनोखा संगम"
          </p>
        </motion.div>
      </div>

      {/* Right Section (Form) */}
      <div className="relative flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-12 bg-white lg:bg-white overflow-hidden">
        {/* Background image for mobile */}
        <div className="absolute inset-0 lg:hidden z-0">
          <img
            src={Img}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute top-10 w-full text-center text-white z-10"
          >
            <h1 className="text-3xl font-bold">KASHVI CREATION</h1>
            <p className="text-sm">"प्रेम और विश्वास का अनोखा संगम"</p>
          </motion.div>
        </div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md p-8 sm:p-10 rounded-xl shadow-lg border
                     border-gray-200 bg-white lg:bg-white
                     bg-opacity-30 backdrop-blur-md
                     lg:backdrop-blur-0 lg:bg-opacity-100"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
}

export default AuthLayout;

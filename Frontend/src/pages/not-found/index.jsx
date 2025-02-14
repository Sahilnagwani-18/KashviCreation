import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Img from "@/assets/NotFound.jpg";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
     
      <div className="absolute inset-0 -z-10">
        <img
          src={Img} 
          alt="Not Found Background"
          className="w-full h-full object-cover opacity-100"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center p-8 bg-white shadow-xl rounded-lg max-w-lg"
      >
        <h1 className="text-6xl font-extrabold text-primary">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Oops! Page Not Found
        </h2>
        <p className="mt-2 text-gray-600">
          Looks like the page you are looking for doesn’t exist.
        </p>

        {/* Back to Home Button */}
        <Link
          to="/"
          className="mt-6 inline-block bg-primary text-white px-6 py-3 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFound;

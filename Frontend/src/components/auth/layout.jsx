import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Img from "../../assets/authImg.jpg";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div
        className="hidden lg:flex items-center justify-center  w-1/2 px-12 relative overflow-hidden"
      >
        <img
          src={Img}
          alt="Fashion Showcase"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md space-y-6 text-center text-primary-foreground relative z-10"
        >
          <h1 className="text-4xl font-extrabold tracking-tight mt-80 text-white drop-shadow-lg">
            KASHVI CREATION
          </h1>
          <p className="text-lg text-gray-200">"प्रेम और विश्वास का अनोखा संगम"</p>
        </motion.div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 rounded-xl shadow-lg border"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
}

export default AuthLayout;

import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/verify-otp", { state: { email: formData.email } });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-md space-y-6 sm:space-y-8
                 bg-white/10 backdrop-blur-md
                 border border-white/20 shadow-2xl
                 rounded-2xl px-6 py-8 sm:p-10
                 transition-all duration-300"
    >
      {/* Title Section */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#4B2A3A]">
          Create New Account
        </h1>
        <p className="text-sm sm:text-base text-gray-100">
          Already have an account?
          <Link
            className="font-semibold ml-2 text-[#F1D7F5] hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>

      {/* Form Section */}
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        className="space-y-4"
        inputClassName="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4B2A3A] bg-white/70"
        buttonClassName="w-full bg-[#F1D7F5] text-[#4B2A3A] font-semibold py-2 rounded-md hover:bg-[#eecdf4] transition-all"
      />
    </motion.div>
  );
}

export default AuthRegister;

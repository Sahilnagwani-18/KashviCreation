import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div
      className="mx-auto w-full max-w-md space-y-6 sm:space-y-8
                 bg-white/10 backdrop-blur-md
                 border border-white/20 shadow-2xl
                 rounded-2xl px-6 py-8 sm:p-10
                 transition-all duration-300"
    >
      {/* Title Section */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#4B2A3A]">
          Sign in to your account
        </h1>
        <p className="text-sm sm:text-base text-gray-100">
          Don&apos;t have an account?
          <Link
            className="font-semibold ml-2 text-[#F1D7F5] hover:underline"
            to="/auth/register"
          >
            Register here!
          </Link>
        </p>
      </div>

      {/* Form Section */}
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        className="space-y-4"
        inputClassName="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4B2A3A] bg-white/70"
        buttonClassName="w-full bg-[#F1D7F5] text-[#4B2A3A] font-semibold py-2 rounded-md hover:bg-[#eecdf4] transition-all"
      />
    </div>
  );
}

export default AuthLogin;

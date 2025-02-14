// import CommonForm from "@/components/common/form";
// import { useToast } from "@/components/ui/use-toast";
// import { registerFormControls } from "@/config";
// import { registerUser } from "@/store/auth-slice";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";

// const initialState = {
//   userName: "",
//   email: "",
//   password: "",
// };

// function AuthRegister() {
//   const [formData, setFormData] = useState(initialState);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   function onSubmit(event) {
//     event.preventDefault();
//     dispatch(registerUser(formData)).then((data) => {
//       if (data?.payload?.success) {
//         toast({
//           title: data?.payload?.message,
//         });
//         navigate("/auth/login");
//       } else {
//         toast({
//           title: data?.payload?.message,
//           variant: "destructive",
//         });
//       }
//     });
//   }

//   console.log(formData);

//   return (
//     <div className="mx-auto w-full max-w-md space-y-6">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold tracking-tight text-foreground">
//           Create new account
//         </h1>
//         <p className="mt-2">
//           Already have an account
//           <Link
//             className="font-medium ml-2 text-primary hover:underline"
//             to="/auth/login"
//           >
//             Login
//           </Link>
//         </p>
//       </div>
//       <CommonForm
//         formControls={registerFormControls}
//         buttonText={"Sign Up"}
//         formData={formData}
//         setFormData={setFormData}
//         onSubmit={onSubmit}
//       />
//     </div>
//   );
// }

// export default AuthRegister;

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
        navigate("/auth/login");
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
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.5 }}
      className=" w-full max-w-md space-y-6 p-8 bg-white "
    >
      <div className="text-center w-full">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Create New Account</h1>
        <p className="mt-2 text-gray-600">
          Already have an account?
          <Link className="font-medium ml-2 text-primary hover:underline  text-orange-400  hover:text-orange-600" to="/auth/login">
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        
      />
    </motion.div>
  );
}

export default AuthRegister;


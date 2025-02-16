import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast"; // Adjust the import based on your project structure
import { useDispatch } from "react-redux";
import { verifyOTP } from "@/store/auth-slice"; // Adjust the import based on your project structure

function AuthVerifyOTP() {
  const [otp, setOtp] = useState("");
  const { state } = useLocation();
  const email = state?.email; // Get email from navigation state
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch();

  console.log("Email received in AuthVerifyOTP:", email); // Debugging

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp || !email) {
      toast({
        title: "Please enter the OTP and ensure email is provided.",
        variant: "destructive",
      });
      return;
    }

    try {
      const resultAction = await dispatch(verifyOTP({ email, otp }));
      if (verifyOTP.fulfilled.match(resultAction)) {
        toast({
          title: resultAction.payload.message,
        });
        navigate("/auth/login"); // Redirect to login after successful verification
      } else if (verifyOTP.rejected.match(resultAction)) {
        toast({
          title: resultAction.payload?.message || "OTP verification failed.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 p-8 bg-white">
      <div className="text-center w-full">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Verify OTP</h1>
        <p className="mt-2 text-gray-600">
          Enter the OTP sent to your email: <strong>{email}</strong>
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
}

export default AuthVerifyOTP; // Export as default
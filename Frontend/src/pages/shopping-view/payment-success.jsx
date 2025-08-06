import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function OrderSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF5FB] to-[#F9E4F2] p-6">
      <Card className="w-full max-w-md bg-white border border-[#EAD0F2] rounded-xl shadow-xl">
        <CardHeader className="bg-[#6A1B6A] rounded-t-xl p-6">
          <div className="flex flex-col items-center justify-center">
            <CheckCircle className="h-12 w-12 text-[#FFE97F]" />
            <CardTitle className="text-2xl sm:text-3xl font-extrabold text-white text-center mt-2">
              Order Placed Successfully!
            </CardTitle>
          </div>
        </CardHeader>
        <div className="p-6">
          <p className="text-base sm:text-lg text-center text-gray-700 mb-6">
            Thank you for choosing <span className="font-semibold text-[#6A1B6A]">Kashvi Creation</span>. Your order has been placed and will be delivered soon. A confirmation has been sent to your email.
          </p>
          <div className="flex justify-center">
            <Button
              onClick={() => navigate("/shop/listing")}
              className="bg-[#C2185B] hover:bg-[#AD1457] text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default OrderSuccessPage;

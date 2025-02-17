import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react"; // Import an icon for visual feedback

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-6">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
        <CardHeader className="bg-green-500 p-6">
          <div className="flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-white text-center mt-4">
            Order Placed Successfully!
          </CardTitle>
        </CardHeader>
        <div className="p-6">
          <p className="text-lg text-gray-700 text-center mb-6">
            Your order has been placed. An invoice has been sent to your email.
          </p>
          <div className="flex justify-center">
            <Button
              onClick={() => navigate("/shop/listing")}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default PaymentSuccessPage;
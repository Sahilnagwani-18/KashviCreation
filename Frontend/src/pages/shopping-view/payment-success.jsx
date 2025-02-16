import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function PaymentSuccessPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Order Placed Successfully</h1>
      <p className="text-lg">
        Your order has been placed. An invoice has been sent to your email.
      </p>
    </div>
  );
}

export default PaymentSuccessPage;

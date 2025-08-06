import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

function ShoppingCheckout() {
  const { cartItems = [], cartId } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const totalCartAmount = cartItems.reduce(
    (sum, item) =>
      sum + (item.salePrice > 0 ? item.salePrice : item.price) * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!cartItems.length)
      return toast({
        title: "Your cart is empty.",
        variant: "destructive",
      });

    if (!currentSelectedAddress)
      return toast({
        title: "Please select an address.",
        variant: "destructive",
      });

    if (!cartId)
      return toast({
        title: "Cart ID missing. Please refresh and try again.",
        variant: "destructive",
      });

    setIsProcessing(true);

    try {
      const orderData = {
        userId: user.id,
        cartId,
        cartItems: cartItems.map((ci) => ({
          productId: ci.productId,
          title: ci.title,
          image: ci.image,
          price: ci.salePrice > 0 ? ci.salePrice : ci.price,
          quantity: ci.quantity,
        })),
        addressInfo: {
          addressId: currentSelectedAddress._id,
          address: currentSelectedAddress.address,
          city: currentSelectedAddress.city,
          pincode: currentSelectedAddress.pincode,
          phone: currentSelectedAddress.phone,
          notes: currentSelectedAddress.notes,
        },
        totalAmount: totalCartAmount,
        userEmail: user.email,
      };

      const result = await dispatch(createNewOrder(orderData));

      if (result.payload?.success) {
        toast({ title: "Order placed successfully!" });
        navigate("/shop/payment-success");
      } else {
        const msg = result.payload?.message || "Failed to place order.";
        toast({ title: msg, variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Something went wrong.", variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Banner */}
      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={img}
          className="h-full w-full object-cover object-center"
          alt="Checkout Banner"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6 lg:p-10">
        {/* Address */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-xl font-bold text-[#4B2A3A] mb-4">
            Choose Delivery Address
          </h2>
          <Address
            selectedId={currentSelectedAddress}
            setCurrentSelectedAddress={setCurrentSelectedAddress}
          />
        </div>

        {/* Cart Summary */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-xl font-bold text-[#4B2A3A] mb-4">Order Summary</h2>
          <div className="flex flex-col gap-3">
            {cartItems.map((item) => (
              <UserCartItemsContent key={item.productId} cartItem={item} />
            ))}
          </div>

          {/* Total Price */}
          <div className="border-t mt-6 pt-4 flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span className="text-[#C2185B]">₹{totalCartAmount.toFixed(2)}</span>
          </div>

          {/* Place Order Button */}
          <Button
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            className="w-full mt-6 bg-[#C2185B] hover:bg-[#AD1457] text-white text-base font-semibold py-3 rounded-md transition-all duration-300"
          >
            {isProcessing ? "Placing Order..." : "Place Order"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;

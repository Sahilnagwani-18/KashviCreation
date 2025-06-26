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
  // Pull both cartItems array and cartId from the slice
  const { cartItems = [], cartId } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Calculate the total
  const totalCartAmount = cartItems.reduce(
    (sum, item) =>
      sum + (item.salePrice > 0 ? item.salePrice : item.price) * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      return toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
    }
    if (!currentSelectedAddress) {
      return toast({
        title: "Please select an address to proceed.",
        variant: "destructive",
      });
    }
    if (!cartId) {
      return toast({
        title: "Cart ID missing – please refresh and try again.",
        variant: "destructive",
      });
    }

    setIsProcessing(true);
    try {
      const orderData = {
        userId:      user.id,
        cartId,               // <-- now included
        cartItems: cartItems.map((ci) => ({
          productId: ci.productId,
          title:     ci.title,
          image:     ci.image,
          price:     ci.salePrice > 0 ? ci.salePrice : ci.price,
          quantity:  ci.quantity,
        })),
        addressInfo: {
          addressId: currentSelectedAddress._id,
          address:   currentSelectedAddress.address,
          city:      currentSelectedAddress.city,
          pincode:   currentSelectedAddress.pincode,
          phone:     currentSelectedAddress.phone,
          notes:     currentSelectedAddress.notes,
        },
        totalAmount: totalCartAmount,
        userEmail:   user.email,
      };

      const result = await dispatch(createNewOrder(orderData));

      if (result.payload?.success) {
        toast({ title: "Order placed successfully! Invoice sent to your email." });
        navigate("/shop/payment-success");
      } else {
        // Show server‐side validation message
        const msg = result.payload?.message || "Failed to place order.";
        toast({ title: msg, variant: "destructive" });
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast({ title: "An error occurred. Please try again.", variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        {/* Address list */}
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />

        {/* Cart summary & Place Order */}
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <UserCartItemsContent key={item.productId} cartItem={item} />
          ))}

          <div className="mt-8 flex justify-between font-bold">
            <span>Total</span>
            <span>${totalCartAmount.toFixed(2)}</span>
          </div>

          <Button
            onClick={handlePlaceOrder}
            className="w-full mt-4"
            disabled={isProcessing}
          >
            {isProcessing ? "Placing Order..." : "Place Order"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;

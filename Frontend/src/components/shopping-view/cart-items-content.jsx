import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    const getCartItems = Array.isArray(cartItems) ? cartItems : cartItems?.items || [];

    if (typeOfAction === "plus" && getCartItems.length) {
      const indexOfCurrentCartItem = getCartItems.findIndex(
        (item) => item.productId === getCartItem?.productId
      );

      const getCurrentProductIndex = productList.findIndex(
        (product) => product._id === getCartItem?.productId
      );
      const getTotalStock = productList[getCurrentProductIndex]?.totalStock || 0;

      if (indexOfCurrentCartItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({ title: "Cart item updated successfully" });
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({ title: "Item removed from cart" });
      }
    });
  }

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 border rounded-lg shadow-sm bg-white">
      {/* Product Image */}
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-24 h-24 rounded-lg object-cover border"
      />

      {/* Title & Quantity */}
      <div className="flex-1 w-full sm:w-auto">
        <h3 className="text-lg font-bold text-[#4B2A3A]">{cartItem?.title}</h3>

        <div className="mt-2 flex items-center gap-2">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full border border-[#4B2A3A]"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4 text-[#4B2A3A]" />
          </Button>

          <span className="text-md font-semibold text-[#4B2A3A]">
            {cartItem?.quantity}
          </span>

          <Button
            variant="outline"
            className="h-8 w-8 rounded-full border border-[#4B2A3A]"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4 text-[#4B2A3A]" />
          </Button>
        </div>
      </div>

      {/* Price & Delete */}
      <div className="flex flex-col items-center sm:items-end justify-between h-full">
        <p className="text-base font-bold text-[#4B2A3A]">
          ₹
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="text-red-500 hover:text-red-700 cursor-pointer mt-2"
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;

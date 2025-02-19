
import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const [magnifierVisible, setMagnifierVisible] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  const { toast } = useToast();

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
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
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  function handleMagnifierOpen() {
    setMagnifierVisible(true);
  }

  function handleMagnifierClose() {
    setMagnifierVisible(false);
  }

  function handleMagnifierMove(event) {
    const { left, top, width, height } = event.target.getBoundingClientRect();
    const x = ((event.clientX - left) / width) * 100;
    const y = ((event.clientY - top) / height) * 100;
    setMagnifierPosition({ x, y });
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:p-12 max-w-[95vw] lg:max-w-[90vw] xl:max-w-[85vw] 2xl:max-w-[85vw] transform transition-all duration-300 ease-in-out bg-white dark:bg-gray-900 rounded-lg shadow-2xl">
        {/* Product Image Section */}
        <div className="relative overflow-hidden rounded-lg group">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover cursor-pointer transition-transform duration-300 ease-in-out group-hover:scale-105"
            onDoubleClick={handleMagnifierOpen}
            onMouseMove={magnifierVisible ? handleMagnifierMove : null}
            onMouseLeave={handleMagnifierClose}
          />
          {magnifierVisible && (
            <div
              className="absolute top-0 left-0 w-full h-full pointer-events-none bg-no-repeat border-2 border-orange-300 rounded-lg shadow-lg"
              style={{
                backgroundImage: `url(${productDetails?.image})`,
                backgroundSize: "200%",
                backgroundPosition: `${magnifierPosition.x}% ${magnifierPosition.y}%`,
              }}
            ></div>
          )}
        </div>

        {/* Product Details Section */}
        <div className="space-y-6 p-4 lg:p-0">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white transition-colors duration-300">
              {productDetails?.title}
            </h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4 transition-colors duration-300">
              {productDetails?.description}
            </p>
          </div>

          {/* Price Section */}
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-[#4A154B] ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              } transition-colors duration-300`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-green-500 transition-colors duration-300">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>

          {/* Rating Section */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarRatingComponent rating={averageReview} />
            </div>
            <span className="text-muted-foreground transition-colors duration-300">
              ({averageReview.toFixed(2)})
            </span>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed transition-opacity duration-300 bg-gray-400 text-white">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full bg-[#4A154B] hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
              >
                Add to Cart
              </Button>
            )}
          </div>

          <Separator className="my-6 bg-orange-200 dark:bg-orange-800" />

          {/* Reviews Section */}
          <div className="max-h-[300px] overflow-y-scroll custom-scrollbar">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
              Reviews
            </h2>
            <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div className="flex gap-4 transition-all duration-300 ease-in-out hover:bg-orange-50 dark:hover:bg-orange-900 p-4 rounded-lg">
                    <Avatar className="w-10 h-10 border transition-all duration-300 ease-in-out hover:shadow-lg">
                      <AvatarFallback>
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900 dark:text-white transition-colors duration-300">
                          {reviewItem?.userName}
                        </h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-muted-foreground transition-colors duration-300">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="text-gray-900 dark:text-white transition-colors duration-300">
                  No Reviews
                </h1>
              )}
            </div>

            {/* Write a Review Section */}
            <div className="mt-10 flex-col flex gap-2">
              <Label className="text-gray-900 dark:text-white transition-colors duration-300">
                Write a review
              </Label>
              <div className="flex gap-1">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Write a review..."
                className="transition-all duration-300 ease-in-out focus:ring-2 focus:ring-[#4A154B] focus:border-[#4A154B]"
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""}
                className="bg-[#4A154B] hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
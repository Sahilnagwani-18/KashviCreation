import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { FaHeart, FaStar } from "react-icons/fa";
import { brandOptionsMap, categoryOptionsMap } from "@/config";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  const rating = product?.rating || 4.2;
  const reviews = product?.reviewCount || 128;

  return (
    <Card className="group flex flex-col w-full max-w-xs mx-auto bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-transform transform hover:scale-105 h-[400px]">
      {/* Image + Wishlist + Badge */}
      <div
        className="relative cursor-pointer h-48 bg-gray-100 flex items-center justify-center"
        onClick={() => handleGetProductDetails(product?._id)}
      >
        <img
          src={product?.image}
          alt={product?.title}
          className="max-h-full object-contain"
        />

        {/* Wishlist */}
        <button className="absolute top-2 right-2 z-10 text-gray-400 hover:text-red-500 transition">
          <FaHeart size={20} />
        </button>

        {/* Stock / Sale Badge */}
        {product?.totalStock === 0 ? (
          <Badge className="absolute top-2 left-2 bg-red-600 text-white">
            Out of Stock
          </Badge>
        ) : product?.totalStock < 10 ? (
          <Badge className="absolute top-2 left-2 bg-yellow-500 text-gray-800">
            Only {product?.totalStock} left
          </Badge>
        ) : product?.salePrice > 0 ? (
          <Badge className="absolute top-2 left-2 bg-green-600 text-white">
            Sale
          </Badge>
        ) : null}
      </div>

      {/* Content */}
      <CardContent className="flex-1 p-1 space-y-1">
        <h2
          className="text-md font-semibold text-gray-800 line-clamp-2 cursor-pointer"
          onClick={() => handleGetProductDetails(product?._id)}
        >
          {product?.title}
        </h2>

        <div className="flex items-center text-sm text-yellow-500">
          <FaStar className="mr-1" />
          <span>{rating.toFixed(1)}</span>
          <span className="text-gray-500 ml-1">({reviews})</span>
        </div>

        <div className="flex text-xs text-gray-500 space-x-1">
          <span>{categoryOptionsMap[product?.category]}</span>
          <span>•</span>
          <span>{brandOptionsMap[product?.brand]}</span>
        </div>

        <div className="flex items-center space-x-1">
          <span
            className={`${
              product?.salePrice > 0 ? "line-through text-gray-400" : "text-gray-800"
            } font-medium`}
          >
            ₹{product?.price}
          </span>
          {product?.salePrice > 0 && (
            <span className="text-lg font-semibold text-red-600">
              ₹{product?.salePrice}
            </span>
          )}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-4">
        <Button
          onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
          className="w-full bg-[#e267f5] hover:bg-[#9a38a9] text-white"
          disabled={product?.totalStock === 0}
        >
          {product?.totalStock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;

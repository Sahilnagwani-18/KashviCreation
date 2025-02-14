// import { Card, CardContent, CardFooter } from "../ui/card";
// import { Button } from "../ui/button";
// import { brandOptionsMap, categoryOptionsMap } from "@/config";
// import { Badge } from "../ui/badge";

// function ShoppingProductTile({
//   product,
//   handleGetProductDetails,
//   handleAddtoCart,
// }) {
//   return (
//     <Card className="w-full max-w-sm mx-auto">
//       <div onClick={() => handleGetProductDetails(product?._id)}>
//         <div className="relative">
//           <img
//             src={product?.image}
//             alt={product?.title}
//             className="w-full h-[300px] object-cover rounded-t-lg"
//           />
//           {product?.totalStock === 0 ? (
//             <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
//               Out Of Stock
//             </Badge>
//           ) : product?.totalStock < 10 ? (
//             <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
//               {`Only ${product?.totalStock} items left`}
//             </Badge>
//           ) : product?.salePrice > 0 ? (
//             <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
//               Sale
//             </Badge>
//           ) : null}
//         </div>
//         <CardContent className="p-4">
//           <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-[16px] text-muted-foreground">
//               {categoryOptionsMap[product?.category]}
//             </span>
//             <span className="text-[16px] text-muted-foreground">
//               {brandOptionsMap[product?.brand]}
//             </span>
//           </div>
//           <div className="flex justify-between items-center mb-2">
//             <span
//               className={`${
//                 product?.salePrice > 0 ? "line-through" : ""
//               } text-lg font-semibold text-primary`}
//             >
//               ${product?.price}
//             </span>
//             {product?.salePrice > 0 ? (
//               <span className="text-lg font-semibold text-primary">
//                 ${product?.salePrice}
//               </span>
//             ) : null}
//           </div>
//         </CardContent>
//       </div>
//       <CardFooter>
//         {product?.totalStock === 0 ? (
//           <Button className="w-full opacity-60 cursor-not-allowed">
//             Out Of Stock
//           </Button>
//         ) : (
//           <Button
//             onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
//             className="w-full"
//           >
//             Add to cart
//           </Button>
//         )}
//       </CardFooter>
//     </Card>
//   );
// }

// export default ShoppingProductTile;



import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { useState } from "react";

function ShoppingProductTile({ product, handleGetProductDetails, handleAddtoCart }) {
  const [isHovered, setIsHovered] = useState(false);
  const [magnifier, setMagnifier] = useState({ x: 0, y: 0, show: false });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative w-full max-w-sm mx-auto transform overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-all duration-300"
    >
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMagnifier({ ...magnifier, show: false });
        }}
        onClick={() => handleGetProductDetails(product?._id)}
      >
        <div className="relative overflow-hidden">
          {/* Product Image */}
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
            onMouseMove={(e) => {
              const { left, top, width, height } = e.target.getBoundingClientRect();
              const x = ((e.clientX - left) / width) * 100;
              const y = ((e.clientY - top) / height) * 100;
              setMagnifier({ x, y, show: true });
            }}
          />
          {/* Image Magnifier Effect */}
          {magnifier.show && (
            <div
              className="absolute inset-0 bg-cover bg-no-repeat border-2 border-gray-300 rounded-lg"
              style={{
                backgroundImage: `url(${product?.image})`,
                backgroundPosition: `${magnifier.x}% ${magnifier.y}%`,
                transform: "scale(1.6)",
                transition: "opacity 0.2s ease-in-out",
                opacity: isHovered ? 1 : 0,
              }}
            />
          )}

          {/* Badges */}
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">Out Of Stock</Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-orange-500 text-white">
              Only {product?.totalStock} left!
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-green-500 text-white">Sale</Badge>
          ) : null}
        </div>
      </div>

      {/* Product Details */}
      <CardContent className="p-4 text-center">
        <h2 className="text-xl font-bold text-gray-800">{product?.title}</h2>
        <div className="flex justify-between items-center text-gray-600 text-sm mt-2">
          <span>{categoryOptionsMap[product?.category]}</span>
          <span>{brandOptionsMap[product?.brand]}</span>
        </div>
        <div className="flex justify-center items-center gap-3 mt-2">
          {product?.salePrice > 0 && (
            <span className="text-lg font-semibold text-red-500 line-through">${product?.price}</span>
          )}
          <span className="text-lg font-bold text-gray-900">${product?.salePrice || product?.price}</span>
        </div>
      </CardContent>

      {/* Add to Cart Button */}
      <CardFooter>
        {product?.totalStock === 0 ? (
          <Button disabled className="w-full bg-gray-400 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-500 hover:to-pink-500 transition-all duration-300"
          >
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </motion.div>
  );
}

export default ShoppingProductTile;


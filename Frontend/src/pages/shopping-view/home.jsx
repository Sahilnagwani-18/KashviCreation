import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { getFeatureImages } from "@/store/common-slice";
import { useToast } from "@/components/ui/use-toast";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import BottomSection from "@/components/shopping-view/bottom-home-section";
import Gallery from "@/components/shopping-view/Gallery";
import VideoCarousel from "@/components/shopping-view/VideoGallery";

const categories = [
  {
    id: "silk",
    label: "Silk Sarees",
    description: "Luxurious silk sarees for royal occasions",
    bgColor: "from-purple-500 to-pink-500",
  },
  {
    id: "wool",
    label: "Woolen Sarees",
    description: "Warm and elegant woolen sarees",
    bgColor: "from-blue-500 to-indigo-500",
  },
  {
    id: "cotton",
    label: "Cotton Sarees",
    description: "Comfortable cotton sarees for daily wear",
    bgColor: "from-green-500 to-emerald-500",
  },
  {
    id: "polyester",
    label: "Polyester Sarees",
    description: "Durable and easy-care polyester sarees",
    bgColor: "from-[#4A154B] to-amber-500",
  },
  {
    id: "nylon",
    label: "Nylon Sarees",
    description: "Lightweight and quick-drying nylon sarees",
    bgColor: "from-red-500 to-rose-500",
  },
  {
    id: "chiffon",
    label: "Chiffon Sarees",
    description: "Light and elegant chiffon sarees",
    bgColor: "from-yellow-400 to-yellow-600",
  },
  {
    id: "georgette",
    label: "Georgette Sarees",
    description: "Stylish and comfortable georgette sarees",
    bgColor: "from-teal-400 to-teal-700",
  },
  {
    id: "all",
    label: "All Products",
    description: "Browse all our sarees",
    bgColor: "from-gray-400 to-gray-600",
  },
];

const ShoppingHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { productList, productDetails } = useSelector(
    (s) => s.shopProducts,
    shallowEqual
  );
  const { featureImageList } = useSelector(
    (s) => s.commonFeature,
    shallowEqual
  );
  const { user } = useSelector((s) => s.auth);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
    dispatch(getFeatureImages());
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentSlide((i) => (i + 1) % featureImageList.length),
      5000
    );
    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    if (productDetails) setOpenDetailsDialog(true);
  }, [productDetails]);

  const handleGetProductDetails = useCallback(
    (id) => dispatch(fetchProductDetails(id)),
    [dispatch]
  );

  const handleAddToCart = useCallback(
    (productId) => {
      dispatch(addToCart({ userId: user?.id, productId, quantity: 1 })).then(
        ({ payload }) => {
          if (payload?.success) {
            dispatch(fetchCartItems(user.id));
            toast({
              title: "Added to cart",
              description: "Item added successfully",
            });
          }
        }
      );
    },
    [dispatch, user, toast]
  );

  const categoryImageMap = useMemo(() => {
    const fallbackImages = productList.filter((p) => p.image);
    const map = {};

    categories.forEach((cat) => {
      const categoryMatch =
        featureImageList.find((f) => f.category === cat.id)?.image ||
        productList.find((p) => p.category === cat.id)?.image;
      const fallback =
        fallbackImages[Math.floor(Math.random() * fallbackImages.length)]
          ?.image;
      map[cat.id] = categoryMatch || fallback || "";
    });

    return map;
  }, [productList, featureImageList]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#F8F0F5] to-[#FDF6F9] text-[#4A2C2A] bg-[#F1D7F5]">
      {/* Hero Banner */}
      <section className="relative h-[50vh] md:h-[90vh] overflow-hidden">
        {featureImageList.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              loading="lazy"
              alt={slide.alt || `slide-${i}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-3xl md:text-6xl font-bold mb-4">
                  Elegant Saree Collection
                </h1>
                <p className="text-lg md:text-xl mb-8">
                  Discover timeless beauty in every drape
                </p>
                <Button
                  onClick={() => navigate("/shop/listing")}
                  className="bg-white text-black px-6 py-3 rounded-full"
                >
                  Explore Collection
                </Button>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={() =>
            setCurrentSlide(
              (i) => (i - 1 + featureImageList.length) % featureImageList.length
            )
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
        >
          <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
        </button>
        <button
          onClick={() =>
            setCurrentSlide((i) => (i + 1) % featureImageList.length)
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
        >
          <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
        </button>
      </section>

      {/* Category Section */}
      <section className="py-10 md:py-20 bg-[#F1D7F5]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">
            Explore Our Saree Collections
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Find the perfect saree for every occasion
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((cat) => {
              const dynamicImage = categoryImageMap[cat.id];
              const matchedProduct = productList.find(
                (p) => p.category === cat.id
              );
              const id = matchedProduct?._id;

              return (
                <div
                  key={cat.id}
                  onClick={() =>
                    id ? handleGetProductDetails(id) : navigate("/shop/listing")
                  }
                  className="group relative overflow-hidden rounded-2xl shadow-lg transform-gpu transition-transform hover:scale-105 h-64 md:h-96 cursor-pointer"
                >
                  {dynamicImage && (
                    <img
                      src={dynamicImage}
                      loading="lazy"
                      alt={cat.label}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out will-change-transform group-hover:scale-110"
                    />
                  )}
                  <div
                    className={`absolute inset-0 bg-gradient-to-b ${cat.bgColor} opacity-60`}
                  />
                  <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2">
                        {cat.label}
                      </h3>
                      <p className="text-sm opacity-90">{cat.description}</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button className="bg-white text-black hover:bg-gray-200">
                        Explore Collection
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Gallery />

      <VideoCarousel />

      <section className="py-10 md:py-20 bg-[#F1D7F5] text-[#6A1B4C] rounded-xl shadow-md">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">
            Featured Sarees
          </h2>
          <hr className="my-4 border-[#6A1B4C]" />
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {productList.length ? (
              productList
                .slice(0, 6)
                .map((product) => (
                  <ShoppingProductTile
                    key={product._id}
                    product={product}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddtoCart={handleAddToCart}
                  />
                ))
            ) : (
              <p className="text-center col-span-full">No products found.</p>
            )}
          </div>
        </div>
        <div className="flex justify-center my-8">
        <Button
          onClick={() => navigate("/shop/listing")}
          className="bg-[#4A154B] text-white px-6 py-3 rounded-full hover:bg-[#6A1B4C] transition"
        >
          Explore More Sarees
        </Button>
      </div>
      </section>

      

      <BottomSection />

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default ShoppingHome;

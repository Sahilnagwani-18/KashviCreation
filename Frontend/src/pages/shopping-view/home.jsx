import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
import VideoCarousel from '@/components/shopping-view/VideoGallery';
import silkSaree from "../../assets/exploreSarees/silk-saree.jpg";
import woolSaree from "../../assets/exploreSarees/wool-saree.jpg";
import cottonSaree from "../../assets/exploreSarees/cotton-saree.jpg";
import allSaree from "../../assets/Shop.png";
import nylonSaree from "../../assets/exploreSarees/nylon-saree.jpg";
import polyesterSaree from "../../assets/exploreSarees/all-saree.jpg";

const categories = [
  { 
    id: "silk", 
    label: "Silk Sarees", 
    description: "Luxurious silk sarees for royal occasions",
    image: silkSaree,
    bgColor: "from-purple-500 to-pink-500"
  },
  { 
    id: "wool", 
    label: "Woolen Sarees", 
    description: "Warm and elegant woolen sarees",
    image: woolSaree,
    bgColor: "from-blue-500 to-indigo-500"
  },
  { 
    id: "cotton", 
    label: "Cotton Sarees", 
    description: "Comfortable cotton sarees for daily wear",
    image: cottonSaree,
    bgColor: "from-green-500 to-emerald-500"
  },
  { 
    id: "polyester", 
    label: "Polyester Sarees", 
    description: "Durable and easy-care polyester sarees",
    image: polyesterSaree,
    bgColor: "from-[#4A154B] to-amber-500"
  },
  { 
    id: "nylon", 
    label: "Nylon Sarees", 
    description: "Lightweight and quick-drying nylon sarees",
    image: nylonSaree,
    bgColor: "from-red-500 to-rose-500"
  },
  {
    id: "all", 
    label: "All Products", 
    description: "Browse all our sarees",
    image: allSaree,
    bgColor: "from-gray-400 to-gray-600"
  },
];

const colors = [
  { id: "pink", label: "Pink", hex: "#ff69b4" },
  { id: "green", label: "Green", hex: "#4caf50" },
  { id: "red", label: "Red", hex: "#f44336" },
  { id: "yellow", label: "Yellow", hex: "#ffeb3b" },
  { id: "white", label: "White", hex: "#ffffff" },
  { id: "blue", label: "Blue", hex: "#2196f3" },
];

const ShoppingHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { user } = useSelector((state) => state.auth);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featureImageList.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featureImageList.length) % featureImageList.length);
  };

  const handleNavigateToListingPage = (item, section) => {
    sessionStorage.removeItem("filters");
    const currentFilter = { [section]: [item.id] };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  };

  const handleGetProductDetails = (productId) => {
    dispatch(fetchProductDetails(productId));
  };

  const handleAddtoCart = (productId) => {
    dispatch(addToCart({
      userId: user?.id,
      productId: productId,
      quantity: 1,
    })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Added to cart successfully",
          description: "Your item has been added to the cart",
        });
      }
    });
  };

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({
      filterParams: {},
      sortParams: "price-lowtohigh",
    }));
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#F8F0F5] to-[#FDF6F9] text-[#4A2C2A]">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[90vh] overflow-hidden ">
        {featureImageList.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-3xl md:text-6xl font-bold mb-4">Elegant Saree Collection</h1>
                <p className="text-lg md:text-xl mb-8">Discover timeless beauty in every drape</p>
                <Button 
                  className="bg-white text-black hover:bg-gray-200 px-6 py-4 md:px-8 md:py-6 text-lg rounded-full"
                  onClick={() => navigate('/shop/listing')}
                >
                  Explore Collection
                </Button>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
        >
          <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
        >
          <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
        </button>
      </section>

      {/* Categories Section */}
      <section className="py-10 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">Explore Our Saree Collections</h2>
          <p className="text-gray-600 text-center mb-8 md:mb-12">Find the perfect saree for every occasion</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleNavigateToListingPage(category, category.id === 'all' ? '' : 'category')}
                className="group cursor-pointer relative overflow-hidden rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 h-64 md:h-96"
              >
                <img
                  src={category.image || "/images/default-saree.jpg"} // Default image if no category image
                  alt={category.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

                <div className={`absolute inset-0 bg-gradient-to-b ${category.bgColor} opacity-60 transition-opacity duration-300 group-hover:opacity-75`} />

                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between text-white">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{category.label}</h3>
                    <p className="text-sm opacity-90">{category.description}</p>
                  </div>

                  <div className="transform translate-y-8 transition-transform duration-300 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                    <Button className="bg-white text-black hover:bg-gray-200">
                      Explore Collection
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <Gallery/>

      {/* Video Gallery */}
      <VideoCarousel />

      {/* Featured Products */}
      <section className="py-10 md:py-20 bg-[#F1D7F5] text-[#6A1B4C] shadow-md rounded-xl">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 text-[#6A1B4C]">
            Featured Sarees
          </h2>
          <hr className="my-4 border-[#6A1B4C] border-t-2" /> {/* Horizontal line to separate */}
          <p className="text-[#6A1B4C] text-center mb-8 md:mb-12">
            Curated collection of our finest pieces
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {productList && productList.length > 0
              ? productList.slice(0, 8).map((product) => (
                  <ShoppingProductTile
                    key={product._id}
                    product={product}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : <p className="text-center text-[#6A1B4C]">No products found.</p>}
          </div>
        </div>
      </section>

      {/* Users Section */}
      <BottomSection className="py-10 md:py-20" />

      {/* Product Details Dialog */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default ShoppingHome;
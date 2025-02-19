import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import FramerMotion from "@/components/shopping-view/Users";
import Gallery from "@/components/shopping-view/Gallery";
import VideoCarousel from '@/components/shopping-view/VideoGallery';
import shopimage from "@/assets/Shop.png";
import Accordion from '@/components/shopping-view/faq';

// Random hero images from Google
const heroImages = [
  "https://images.pexels.com/photos/102129/pexels-photo-102129.jpeg",
  "https://images.pexels.com/photos/3731256/pexels-photo-3731256.jpeg",
  "https://images.pexels.com/photos/3731257/pexels-photo-3731257.jpeg",
  "https://images.pexels.com/photos/3731258/pexels-photo-3731258.jpeg",
  "https://images.pexels.com/photos/3731259/pexels-photo-3731259.jpeg",
];

const categories = [
  { 
    id: "silk", 
    label: "Silk Sarees", 
    description: "Luxurious silk sarees for royal occasions",
    image: shopimage,
    bgColor: "from-purple-500 to-pink-500"
  },
  { 
    id: "wool", 
    label: "Woolen Sarees", 
    description: "Warm and elegant woolen sarees",
    image: "/images/wool-saree.jpg",
    bgColor: "from-blue-500 to-indigo-500"
  },
  { 
    id: "cotton", 
    label: "Cotton Sarees", 
    description: "Comfortable cotton sarees for daily wear",
    image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
    bgColor: "from-green-500 to-emerald-500"
  },
  { 
    id: "polyester", 
    label: "Polyester Sarees", 
    description: "Durable and easy-care polyester sarees",
    image: "/images/polyester-saree.jpg",
    bgColor: "from-orange-500 to-amber-500"
  },
  { 
    id: "nylon", 
    label: "Nylon Sarees", 
    description: "Lightweight and quick-drying nylon sarees",
    image: "",
    bgColor: "from-red-500 to-rose-500"
  },
];

const ShoppingHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
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
  }, [heroImages]);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({
      filterParams: {},
      sortParams: "price-lowtohigh",
    }));
  }, [dispatch]);

  return (
    <Accordion/>
  );
};

export default ShoppingHome;
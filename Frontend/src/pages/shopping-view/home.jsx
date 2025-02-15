import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
import FramerMotion from "@/components/shopping-view/Users";
import styled from "styled-components";
import VideoCarousel from "@/components/shopping-view/VideoGallery";
import Gallery from "@/components/shopping-view/Gallery";

const categories = [
  { id: "silk", label: "Silk" },
  { id: "wool", label: "Wool" },
  { id: "cotton", label: "Cotton" },
  { id: "polyester", label: "Polyester" },
  { id: "nylon", label: "Nylon" },
];

const colors = [
  { id: "pink", label: "Pink" },
  { id: "green", label: "Green" },
  { id: "red", label: "Red" },
  { id: "yellow", label: "Yellow" },
  { id: "white", label: "White" },
  { id: "blue", label: "Blue" },
];

const Styles = styled.div`
  @property --k {
    syntax: '<number>';
    initial-value: -1;
    inherits: true;
  }

  @property --ang {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }

  * {
    margin: 0;
  }

  html {
    scrollbar-width: none;
    height: calc(var(--n) * 100%);
  }

  body, header, main, section, article, figure {
    display: grid;
  }

  body {
    --dir: 0;
    grid-template-rows: max-content 1fr max-content;
    position: fixed;
    width: 100%;
    height: 100vh;
    height: 100dvh;
    color: #dedede;
    font: clamp(0.625em, 3vmin, 1.5em) / 1.25 saira, sans-serif;
    animation: k 1s linear;
    animation-timeline: scroll();

    &::before {
      position: absolute;
      inset: 0;
      z-index: -1;
      background: #000;
      filter: url(#grain);
      content: '';
    }

    @media (max-aspect-ratio: 2/3) {
      --dir: 1;
    }
  }

  @keyframes k {
    to {
      --k: 1;
    }
  }

  svg[height='0'][aria-hidden='true'] {
    position: fixed;
  }

  header {
    place-content: center;
    place-items: center;
    padding: 0.5em;
    text-align: center;
    text-wrap: balance;
  }

  em {
    max-width: 32em;
  }

  main {
    overflow: hidden;
    perspective: 50em;
  }

  section, article {
    transform-style: preserve-3d;
  }

  section {
    --r: calc(2 + var(--dir)) / 3;
    --w: clamp(4em, min(50vh, 25vw), 18em);
    --z: calc(var(--f, 1.25) * -0.5 * var(--w) / tan(0.5turn / var(--n));
    place-self: center;
    translate: 0 0 var(--z);
    rotate: var(--dir) calc(1 - var(--dir)) 0 calc((var(--k) + 0.5) * -1turn);
  }

  article, header, figure, img, figcaption {
    grid-area: 1 / 1;
  }

  article {
    --j: var(--i) / var(--n);
    --dif-lin: calc(var(--j) - mod(var(--k) + 1, 1));
    --abs-lin: abs(var(--dif-lin));
    --dif-mid: calc(0.5 - var(--abs-lin));
    --abs-mid: abs(var(--dif-mid));
    --dif-arc: calc(2 * (0.5 - var(--abs-mid)));
    --lim: 0.35;
    --sel: max(0, calc((var(--lim) - var(--dif-arc)) / var(--lim)));
    --out: calc(1 - var(--sel));
    --hov: 0;
    width: var(--w);
    aspect-ratio: var(--r);
    transform: rotate3d(var(--dir), calc(1 - var(--dir)), 0, calc(var(--j) * 1turn))
      translatez(var(--z)) rotate(calc(var(--dir) * 0.5turn));

    header {
      rotate: y calc(var(--hov) * 0.5turn);
    }

    &:hover, &:focus-within {
      --hov: round(var(--sel));
    }

    @supports not (scale: abs(-1)) {
      --abs-lin: max(var(--dif-lin), -1 * var(--dif-lin));
      --abs-mid: max(var(--dif-mid), -1 * var(--dif-mid));
    }
  }

  article header, figure {
    --ang: calc(-45deg + var(--hov) * 180deg);
    overflow: hidden;
    position: relative;
    border: solid 4px #0000;
    border-radius: 0.5em;
    backface-visibility: hidden;
    box-shadow: 5px 5px 13px #000;
    background: var(--url) 50% / cover padding-box,
      linear-gradient(#333 0 0) padding-box,
      repeating-conic-gradient(
          from var(--ang),
          #0000 0% 15%,
          color-mix(in srgb, #f48c06 calc(var(--sel) * 100%), #333) 20% 30%,
          #0000 35% 50%
        )
        border-box #121212;
    background-blend-mode: multiply, normal, normal;
    isolation: isolate;
    pointer-events: none;
    transition: 0.35s ease-out;
    transition-property: rotate, --ang;

    &::after {
      position: absolute;
      inset: 0;
      opacity: var(--out);
      background: #03071e;
      mix-blend-mode: color;
      pointer-events: none;
      content: '';
    }
  }

  h2, em, img, a {
    pointer-events: auto;
  }

  h2, em {
    opacity: round(up, var(--sel));
  }

  h2 {
    font-size: 1.125em;
  }

  figure {
    rotate: y calc((1 + var(--hov)) * 0.5turn);
  }

  img {
    width: 100%;
    height: 100%;
    aspect-ratio: var(--r);
    object-fit: cover;
    object-position: var(--pos);
  }

  figcaption {
    align-self: end;
    padding: 0.5em;
    background: #fff3;
    color: #040404;
    font: max(0.75rem, 0.75em) caveat, cursive;
    text-align: right;
    text-shadow: 1px 1px 1px #0006;
    backdrop-filter: blur(5px) brightness(1.5);

    a {
      color: #370617;
    }
  }

  aside {
    position: fixed;
    bottom: 0;
    padding: 0.5em;
  }

  .box-info-scrollani {
    margin: 0.5em;
    border-left: solid 5px #dc3055;
    padding: 0.75em;
    box-shadow: 2px 2px 5px hsla(0, 0%, 0%, 0.35);
    background: #851d40;
    color: #fff;
    font: 1em / 1.25 ubuntu, trebuchet ms, arial, sans-serif;

    @supports (animation-timeline: scroll()) {
      display: none;
    }
  }

  kbd {
    padding: 2px;
    background: hsla(0, 0%, 0%, 0.35);
    font: 1.1em / 1.2 ubuntu mono, consolas, monaco, monospace;
  }
`;

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
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

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Styles>
        <div className="relative w-full h-[800px] overflow-hidden bg-contain">
          {featureImageList.map((slide, index) => (
            <img
              src={slide.image}
              key={index}
              alt={slide.alt}
              className={`${
                index === currentSlide ? "opacity-100" : "opacity-0"
              } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
            />
          ))}
          <button
            onClick={() =>
              setCurrentSlide(
                (prevSlide) =>
                  (prevSlide - 1 + featureImageList.length) %
                  featureImageList.length
              )
            }
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg"
          >
            &lt;
          </button>
          <button
            onClick={() =>
              setCurrentSlide(
                (prevSlide) => (prevSlide + 1) % featureImageList.length
              )
            }
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg"
          >
            &gt;
          </button>
        </div>
      </Styles>

      <section className="py-12 bg-white">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-12">
      Shop by Category
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.map((categoryItem, index) => (
        <div
          key={categoryItem.id}
          onClick={() => handleNavigateToListingPage(categoryItem, "category")}
          className={`cursor-pointer bg-orange-50 p-8 rounded-3xl text-center hover:bg-orange-100 transition-all duration-300 hover:scale-105 shadow-xl flex flex-col items-center justify-center ${
            index % 2 === 0 ? "mt-8" : "mb-8"
          }`}
        >
          <div className="text-5xl font-extrabold text-orange-500 mb-4">
            {categoryItem.label[0]}
          </div>
          <span className="font-semibold text-gray-900 text-xl">
            {categoryItem.label}
          </span>
        </div>
      ))}
    </div>
  </div>
</section>



      <section className="py-16 bg-gray-50"> 
  <div className="container mx-auto px-6">
    <h2 className="text-4xl font-bold text-center mb-12">
      Colors Available
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {colors.map((colorItem, index) => (
        <div
          key={colorItem.id}
          onClick={() => handleNavigateToListingPage(colorItem, "brand")}
          className={`cursor-pointer w-full h-[400px] p-6 rounded-3xl shadow-xl text-center transition-transform transform hover:scale-105 flex flex-col justify-between ${
            index % 2 === 0 ? "mt-10" : "mt-0"
          }`}
          style={{ backgroundColor: colorItem.id }}
        >
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-white mix-blend-difference">
              {colorItem.label}
            </h2>
            <p className="mt-1 font-bold">Stylish {colorItem.label} Sarees</p>
          </div>

          <div className="flex justify-center mt-1">
            <img
              src={`/images/image${colorItem.id}.jpg`}
              className="rounded-lg w-48 h-28 object-cover shadow-md max-w-full"
              alt={colorItem.label}
            />
          </div>

          <button className="mt-auto px-5 py-3 border border-black rounded-full text-black text-lg font-medium hover:bg-black hover:text-white transition w-full">
            Explore More
          </button>
        </div>
      ))}
    </div>
  </div>
</section>




      <VideoCarousel />

      {/* Featured Products Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    key={productItem.id}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <h1 className="text-4xl font-bold text-center mb-8">Gallery</h1>
      <Gallery/>

      {/* Product Details Dialog */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
      <FramerMotion className="mt-5" />
    </div>
  );
}

export default ShoppingHome;

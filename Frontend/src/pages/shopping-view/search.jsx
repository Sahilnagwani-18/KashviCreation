import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";

function SearchProducts() {
  const [keyword, setKeyword] = useState(""); // Controlled input
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const toast = useToast(); // Ensure toast is a callable

  // 🔍 Sync URL param with input
  useEffect(() => {
    const paramKeyword = searchParams.get("keyword") || "";
    setKeyword(paramKeyword);

    if (paramKeyword.length >= 3) {
      dispatch(getSearchResults(paramKeyword));
    } else {
      dispatch(resetSearchResults());
    }
  }, [searchParams, dispatch]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setKeyword(value);

    // debounce-like immediate update
    if (value.trim().length >= 3) {
      setSearchParams({ keyword: value });
    } else {
      setSearchParams({});
    }
  };

  const handleAddtoCart = (productId, totalStock) => {
    const getCartItems = cartItems.items || [];
    const index = getCartItems.findIndex((item) => item.productId === productId);

    if (index > -1 && getCartItems[index].quantity + 1 > totalStock) {
      toast({
        title: `Only ${getCartItems[index].quantity} quantity can be added.`,
        variant: "destructive",
      });
      return;
    }

    dispatch(addToCart({ userId: user?.id, productId, quantity: 1 })).then((res) => {
      if (res?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: "Added to cart ✅" });
      }
    });
  };

  const handleGetProductDetails = (productId) => {
    dispatch(fetchProductDetails(productId));
  };

  useEffect(() => {
    if (productDetails) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <Input
          value={keyword}
          onChange={handleSearchChange}
          className="py-6"
          placeholder="Search Products..."
        />
      </div>

      {!searchResults.length ? (
        <h1 className="text-3xl font-bold text-center">No results found for "{keyword}"</h1>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {searchResults.map((item) => (
            <ShoppingProductTile
              key={item._id}
              product={item}
              handleAddtoCart={handleAddtoCart}
              handleGetProductDetails={handleGetProductDetails}
            />
          ))}
        </div>
      )}

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default SearchProducts;

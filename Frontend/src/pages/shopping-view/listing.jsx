import ProductFilter from "@/components/shopping-view/filter";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { sortOptions } from "@/config";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams) {
  return Object.entries(filterParams)
    .filter(([, v]) => Array.isArray(v) && v.length)
    .map(([k, v]) => `${k}=${encodeURIComponent(v.join(","))}`)
    .join("&");
}

export default function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector((s) => s.shopProducts);
  const { cartItems } = useSelector((s) => s.shopCart);
  const { user } = useSelector((s) => s.auth);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("price-lowtohigh");
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    const q = createSearchParamsHelper(filters);
    setSearchParams(new URLSearchParams(q));
    dispatch(fetchAllFilteredProducts({ filterParams: filters, sortParams: sort }));
  }, [filters, sort, dispatch, setSearchParams]);

  useEffect(() => {
    if (productDetails) setOpenDetailsDialog(true);
  }, [productDetails]);

  function handleFilter(section, option) {
    setFilters((prev) => {
      const arr = prev[section] || [];
      const has = arr.includes(option);
      const next = has ? arr.filter((o) => o !== option) : [...arr, option];
      sessionStorage.setItem("filters", JSON.stringify({ ...prev, [section]: next }));
      return { ...prev, [section]: next };
    });
  }

  function handleSort(value) {
    setSort(value);
  }

  function handleAddtoCart(id, stock) {
    const inCart = cartItems.items?.find((i) => i.productId === id);
    if (inCart && inCart.quantity + 1 > stock) {
      return toast({ title: `Only ${inCart.quantity} left`, variant: "destructive" });
    }
    dispatch(addToCart({ userId: user?.id, productId: id, quantity: 1 })).then((res) => {
      if (res.payload?.success) {
        dispatch(fetchCartItems(user.id));
        toast({ title: "Added to cart" });
      }
    });
  }

  function handleGetProductDetails(id) {
    dispatch(fetchProductDetails(id));
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8">
      {/* Sidebar */}
      <div className="hidden md:block w-full md:w-1/4">
        <ProductFilter filters={filters} handleFilter={handleFilter} />
      </div>

      {/* Main Listing */}
      <div className="flex-1">
        <div className="bg-white rounded-lg shadow p-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <h2 className="text-2xl font-extrabold text-[#4B2A3A]">All Products</h2>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <span className="text-gray-600">{productList.length} Products</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <ArrowUpDownIcon className="h-4 w-4" /> Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                    {sortOptions.map((opt) => (
                      <DropdownMenuRadioItem key={opt.id} value={opt.id}>
                        {opt.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Responsive Grid: 3 cols mobile, 4 on sm, 5 on md, 6 on lg */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-3">
            {productList.map((p) => (
              <ShoppingProductTile
                key={p._id}
                product={p}
                handleGetProductDetails={handleGetProductDetails}
                handleAddtoCart={handleAddtoCart}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Details Dialog */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

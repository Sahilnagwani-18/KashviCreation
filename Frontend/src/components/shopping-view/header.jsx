import { HousePlug, LogOut, Menu, ShoppingCart, UserCog, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";
import KashviImage from "@/assets/Kashvi.jpg";

function MenuItems() {
  const navigate = useNavigate();
  function handleNavigate(item) {
    sessionStorage.removeItem("filters");
    navigate(item.path);
  }
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((mi) => (
        <Label
          key={mi.id}
          onClick={() => handleNavigate(mi)}
          className={`text-lg font-bold cursor-pointer hover:text-[#D4AF37] transition-colors duration-300 
            ${mi.id === "search" ? "text-[#D4AF37]" : "text-[#FAF3E0]"}`}
        >
          {mi.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  // ← read the array directly, defaulting to []
  const cartItems = useSelector((state) => state.shopCart.cartItems) || [];
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user?.id]);

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Button
        onClick={() => navigate("/shop/store")}
        className="bg-[#D4AF37] hover:bg-[#B88A44] text-[#4A154B] font-bold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-[#D4AF37]/50"
      >
        <MapPin className="mr-2 h-5 w-5" />
        Find Store
      </Button>

      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative border-[#D4AF37] hover:bg-[#B88A44] transition-colors duration-300"
        >
          <ShoppingCart className="w-6 h-6 text-[#D4AF37]" />
          <span className="absolute -top-1 -right-2 font-bold text-sm text-[#D4AF37]">
            {cartItems.length}
          </span>
          <span className="sr-only">User cart</span>
        </Button>

        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={cartItems}
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black hover:shadow-lg transition-shadow duration-300">
            <AvatarFallback className="bg-black text-[#FAF3E0] font-extrabold">
              {user?.userName?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56 bg-[#FAF3E0] text-[#4A154B]">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigate("/shop/account")}
            className="hover:bg-[#D4AF37] hover:text-[#4A154B] transition-colors duration-300"
          >
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="hover:bg-[#D4AF37] hover:text-[#4A154B] transition-colors duration-300"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default function ShoppingHeader() {
  return (
    <header className="sticky top-0 z-40 h-20 w-full border-b bg-[#4A154B] text-[#FAF3E0] shadow-lg">
      <div className="flex h-20 items-center justify-between px-4 md:px-6">
        <Link
          to="/shop/home"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-300"
        >
          <img src={KashviImage} alt="Logo" className="h-10 w-15 rounded-full object-cover" />
          <span className="font-bold text-xl text-[#D4AF37]">KASHVI CREATION</span>
        </Link>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden border-[#D4AF37] hover:bg-[#B88A44]">
              <Menu className="h-6 w-6 text-[#D4AF37]" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs bg-[#FAF3E0] text-[#4A154B]">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        {/* Desktop Right Content */}
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

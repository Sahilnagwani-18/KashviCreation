import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaInstagram, 
  FaFacebook, 
  FaWhatsapp, 
  FaMapMarkerAlt, 
  FaEnvelope,
  FaSearch,
  FaShoppingBag,
  FaUser
} from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const Footer = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop/search?keyword=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Handle category or material search
  const handleCategorySearch = (category) => {
    navigate(`/shop/search?category=${encodeURIComponent(category)}`);
  };

  const handleMaterialSearch = (material) => {
    navigate(`/shop/search?keyword=${encodeURIComponent(material)}`);
  };

  return (
    <footer className="bg-[#F5E6E8] text-[#5A4A4F] pt-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-8">
          
          {/* Product Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleCategorySearch("sarees")}
                  className="hover:text-[#A37B73] transition"
                >
                  Sarees
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategorySearch("lehengas")}
                  className="hover:text-[#A37B73] transition"
                >
                  Lehengas
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategorySearch("indo-western")}
                  className="hover:text-[#A37B73] transition"
                >
                  Indo-Western
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategorySearch("accessories")}
                  className="hover:text-[#A37B73] transition"
                >
                  Accessories
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategorySearch("wedding dresses")}
                  className="hover:text-[#A37B73] transition"
                >
                  Wedding Dresses
                </button>
              </li>
            </ul>
          </div>

          {/* Materials & Styles */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Materials & Styles</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleMaterialSearch("wool")}
                  className="hover:text-[#A37B73] transition"
                >
                  Wool
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleMaterialSearch("nylon")}
                  className="hover:text-[#A37B73] transition"
                >
                  Nylon
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleMaterialSearch("silk")}
                  className="hover:text-[#A37B73] transition"
                >
                  Silk
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleMaterialSearch("polyester")}
                  className="hover:text-[#A37B73] transition"
                >
                  Polyester
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleMaterialSearch("color palette")}
                  className="hover:text-[#A37B73] transition"
                >
                  Color Palette
                </button>
              </li>
            </ul>
          </div>

          {/* Company Info */}
          <div>
          <Link to="/shop/company" className="hover:text-[#A37B73] transition"><h4 className="text-lg font-semibold mb-4">Company</h4></Link>
            <ul className="space-y-2">
              
              <li><Link to="/shop/blog" className="hover:text-[#A37B73] transition">Blog</Link></li>
              <li><Link to="/shop/influencers" className="hover:text-[#A37B73] transition">Kashvi Influencers</Link></li>
              <li><Link to="/shop/store" className="hover:text-[#A37B73] transition">Find a Store</Link></li>
              <li><Link to="/shop/bulk-orders" className="hover:text-[#A37B73] transition">Buy in Bulk</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/faq" className="hover:text-[#A37B73] transition">FAQ</Link></li>
              <li><Link to="/shop/contact-us" className="hover:text-[#A37B73] transition">Contact Us</Link></li>
              <li><Link to="/shop/about-us" className="hover:text-[#A37B73] transition">About-Us</Link></li>
              <li><Link to="/shop/account" className="hover:text-[#A37B73] transition">Orders</Link></li>
              
            </ul>
          </div>

          {/* Legal & Account */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal & Account</h4>
            <ul className="space-y-2">
              <li><Link to="/shop/terms-condition" className="hover:text-[#A37B73] transition">Terms & Conditions</Link></li>
              <li><Link to="/shop/privacy-policy" className="hover:text-[#A37B73] transition">Privacy Policy</Link></li>
              <li><Link to="/shop/checkout" className="hover:text-[#A37B73] transition">Shopping Bag</Link></li>
              <li><Link to="/shop/account" className="hover:text-[#A37B73] transition">My Account</Link></li>
            </ul>
          </div>

          {/* Social & Search */}
          <div className="space-y-6">
            {/* Search Bar */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Search Products</h4>
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search sarees, lehengas..."
                  className="w-full p-2 pr-10 rounded border focus:outline-[#A37B73]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute right-2 top-3 text-[#A37B73]">
                  <FaSearch />
                </button>
              </form>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="https://instagram.com/kashvicreation" target="_blank" rel="noopener noreferrer" className="hover:text-[#A37B73] transition">
                  <FaInstagram size={24} />
                </a>
                <a href="https://facebook.com/kashvicreation" className="hover:text-[#A37B73] transition">
                  <FaFacebook size={24} />
                </a>
                <a href="https://wa.me/+916375280726" className="hover:text-[#A37B73] transition">
                  <FaWhatsapp size={24} />
                </a>
                <a href="mailto:contact@kashvicreation.com" className="hover:text-[#A37B73] transition">
                  <SiGmail size={24} />
                </a>
              </div>
            </div>

            {/* Store Info */}
            <div className="pt-4">
              <div className="flex items-center gap-2 mb-2">
              <a href="/shop/store" className="hover:text-[#A37B73] transition">
              <FaMapMarkerAlt />Find Store
              </a>
                
                
              </div>
              <p className="text-sm">Visit our flagship store in Surat</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#E0C8C1] py-6 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Kashvi Creation. Handcrafted with ❤️ in India
          </p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link to="/careers" className="text-sm hover:text-[#A37B73]">Careers</Link>
            <Link to="/press" className="text-sm hover:text-[#A37B73]">Press</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaSearch,
} from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

const Footer = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop/search?keyword=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleCategorySearch = (category) => {
    navigate(`/shop/search?category=${encodeURIComponent(category)}`);
  };

  const handleMaterialSearch = (material) => {
    navigate(`/shop/search?keyword=${encodeURIComponent(material)}`);
  };

  return (
    <footer className="bg-[#4A154B] text-[#fbf8f9] pt-12 mt-auto text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-y-10 sm:justify-between">

          {/* Section Template */}
          {[
            {
              title: 'Products',
              items: ['sarees', 'lehengas', 'indo-western', 'accessories', 'wedding dresses'],
              onClick: handleCategorySearch,
            },
            {
              title: 'Materials',
              items: ['wool', 'nylon', 'silk', 'polyester', 'color palette'],
              onClick: handleMaterialSearch,
            },
          ].map((section) => (
            <div key={section.title} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 px-2 text-center sm:text-left">
              <h4 className="text-lg font-bold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => section.onClick(item)}
                      className="hover:text-[#7A2E54] transition duration-300"
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Company */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 px-2 text-center sm:text-left">
            <h4 className="text-lg font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/shop/company" className="hover:text-[#7A2E54] transition">About Us</Link></li>
              <li><Link to="/shop/blog" className="hover:text-[#7A2E54] transition">Blog</Link></li>
              <li><Link to="/shop/influencers" className="hover:text-[#7A2E54] transition">Influencers</Link></li>
              <li><Link to="/shop/store" className="hover:text-[#7A2E54] transition">Find Store</Link></li>
              <li><Link to="/shop/bulk-orders" className="hover:text-[#7A2E54] transition">Bulk Orders</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 px-2 text-center sm:text-left">
            <h4 className="text-lg font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/faq" className="hover:text-[#7A2E54] transition">FAQ</Link></li>
              <li><Link to="/shop/contact-us" className="hover:text-[#7A2E54] transition">Contact</Link></li>
              <li><Link to="/shop/account" className="hover:text-[#7A2E54] transition">My Orders</Link></li>
              <li><Link to="/shop/checkout" className="hover:text-[#7A2E54] transition">Shopping Bag</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 px-2 text-center sm:text-left">
            <h4 className="text-lg font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/shop/terms-condition" className="hover:text-[#7A2E54] transition">Terms</Link></li>
              <li><Link to="/shop/privacy-policy" className="hover:text-[#7A2E54] transition">Privacy</Link></li>
              <li><Link to="/shop/account" className="hover:text-[#7A2E54] transition">My Account</Link></li>
            </ul>
          </div>

          {/* Search + Social */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 px-2 text-center sm:text-left space-y-6">
            <div>
              <h4 className="text-lg font-bold mb-4">Search</h4>
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search sarees..."
                  className="w-full px-3 py-2 pr-10 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7A2E54]"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A2E54]">
                  <FaSearch />
                </button>
              </form>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Connect</h4>
              <div className="flex justify-center sm:justify-start space-x-4">
                <a href="https://instagram.com/kashvicreation" target="_blank" rel="noopener noreferrer" className="hover:text-[#7A2E54] transition"><FaInstagram size={20} /></a>
                <a href="https://facebook.com/kashvicreation" target="_blank" className="hover:text-[#7A2E54] transition"><FaFacebook size={20} /></a>
                <a href="https://wa.me/+916375280726" target="_blank" className="hover:text-[#7A2E54] transition"><FaWhatsapp size={20} /></a>
                <a href="mailto:contact@kashvicreation.com" className="hover:text-[#7A2E54] transition"><SiGmail size={20} /></a>
              </div>
            </div>
            <div className="pt-3">
              <Link to="/shop/store" className="flex justify-center sm:justify-start items-center gap-2 hover:text-[#7A2E54] transition">
                <FaMapMarkerAlt /> Find Store
              </Link>
              <p className="text-xs mt-1">Flagship store in Surat</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#d6b7cc] py-6 text-center">
          <p className="text-xs">© {new Date().getFullYear()} Kashvi Creation. Handcrafted with ❤️ in India</p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link to="/careers" className="hover:text-[#7A2E54] text-xs">Careers</Link>
            <Link to="/press" className="hover:text-[#7A2E54] text-xs">Press</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

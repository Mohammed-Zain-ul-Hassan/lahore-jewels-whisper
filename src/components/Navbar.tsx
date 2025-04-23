
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, User, Search } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gold/30 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl md:text-3xl font-playfair font-bold gold-text">
              Lahori Jewellers
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="font-medium hover:text-gold transition-colors">Home</Link>
            <Link to="/collections" className="font-medium hover:text-gold transition-colors">Collections</Link>
            <Link to="/pages/about-us" className="font-medium hover:text-gold transition-colors">About Us</Link>
            <Link to="/pages/stores" className="font-medium hover:text-gold transition-colors">Stores</Link>
            <Link to="/pages/contact-us" className="font-medium hover:text-gold transition-colors">Contact</Link>
          </div>

          {/* Search and Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button aria-label="Search">
              <Search className="w-5 h-5 text-gray-600 hover:text-gold transition-colors" />
            </button>
            <button aria-label="User account">
              <User className="w-5 h-5 text-gray-600 hover:text-gold transition-colors" />
            </button>
            <button aria-label="Cart">
              <ShoppingCart className="w-5 h-5 text-gray-600 hover:text-gold transition-colors" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gold transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <Link 
              to="/" 
              className="block py-2 hover:text-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/collections" 
              className="block py-2 hover:text-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Collections
            </Link>
            <Link 
              to="/pages/about-us" 
              className="block py-2 hover:text-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/pages/stores" 
              className="block py-2 hover:text-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Stores
            </Link>
            <Link 
              to="/pages/contact-us" 
              className="block py-2 hover:text-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex space-x-4 pt-2">
              <button aria-label="Search">
                <Search className="w-5 h-5 text-gray-600 hover:text-gold transition-colors" />
              </button>
              <button aria-label="User account">
                <User className="w-5 h-5 text-gray-600 hover:text-gold transition-colors" />
              </button>
              <button aria-label="Cart">
                <ShoppingCart className="w-5 h-5 text-gray-600 hover:text-gold transition-colors" />
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

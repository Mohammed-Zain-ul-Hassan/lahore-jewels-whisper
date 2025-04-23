
import { Link } from "react-router-dom";
import { Mail, Phone, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gold/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <h2 className="text-xl font-playfair font-bold gold-text">
                Lahori Jewellers
              </h2>
            </Link>
            <p className="text-gray-600 mb-4">
              Exquisite jewelry crafted with the finest materials, offering timeless elegance and exceptional quality.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-playfair font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-gold transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/collections" className="text-gray-600 hover:text-gold transition-colors">Collections</Link>
              </li>
              <li>
                <Link to="/pages/about-us" className="text-gray-600 hover:text-gold transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/pages/stores" className="text-gray-600 hover:text-gold transition-colors">Stores</Link>
              </li>
              <li>
                <Link to="/pages/contact-us" className="text-gray-600 hover:text-gold transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Collections */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-playfair font-semibold mb-4">Collections</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/collections/all-products" className="text-gray-600 hover:text-gold transition-colors">All Products</Link>
              </li>
              <li>
                <Link to="/collections/ladies-collection" className="text-gray-600 hover:text-gold transition-colors">Ladies Collection</Link>
              </li>
              <li>
                <Link to="/collections" className="text-gray-600 hover:text-gold transition-colors">Rings</Link>
              </li>
              <li>
                <Link to="/collections" className="text-gray-600 hover:text-gold transition-colors">Earrings</Link>
              </li>
              <li>
                <Link to="/collections" className="text-gray-600 hover:text-gold transition-colors">Bangles</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-playfair font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <p className="flex items-center text-gray-600">
                <Mail className="w-5 h-5 mr-2 text-gold" />
                <a href="mailto:info@lahorijewellers.com" className="hover:text-gold transition-colors">info@lahorijewellers.com</a>
              </p>
              <p className="flex items-center text-gray-600">
                <Phone className="w-5 h-5 mr-2 text-gold" />
                <a href="tel:+923001234567" className="hover:text-gold transition-colors">+92 300 123 4567</a>
              </p>
              <div className="flex space-x-3 mt-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center hover:bg-gold/20 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 text-gold" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center hover:bg-gold/20 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-gold" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gold/20 mt-10 pt-6 flex flex-col md:flex-row justify-between">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Lahori Jewellers. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/" className="text-sm text-gray-500 hover:text-gold transition-colors">Privacy Policy</Link>
            <Link to="/" className="text-sm text-gray-500 hover:text-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

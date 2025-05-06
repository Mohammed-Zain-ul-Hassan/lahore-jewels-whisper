import { useState } from "react";
import { Link } from "react-router-dom";

import productsData from '../data/products.json';

// Filter products for Bangles Collection
const banglesProducts = productsData.products.filter(product => product.category === 'Bangles' || product.category === 'Bracelets');

const BanglesCollection = () => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-playfair font-bold mb-4">Bangles & Bracelets Collection</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Adorn your wrists with our exquisite collection of bangles and bracelets, each piece a testament to timeless elegance.
        </p>
      </div>

      {/* Feature Banner */}
      <div className="relative w-full h-64 md:h-96 mb-12 rounded-lg overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
          alt="Bangles Collection" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-4">
              Grace in Every Detail
            </h2>
            <p className="text-white md:text-lg max-w-lg mx-auto">
              From delicate chains to statement pieces, find the perfect accent for any occasion.
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {banglesProducts.map((product) => (
          <Link 
            to={`/products/${product.id}`} 
            key={product.id}
            className="product-card group"
          >
            <div className="aspect-square overflow-hidden rounded-t-md">
              <img 
                src={product.image}
                alt={product.name}
                className="product-image"
              />
            </div>
            <div className="p-4">
              <h3 className="font-playfair font-semibold text-lg mb-1 group-hover:text-gold transition-colors">
                {product.name}
              </h3>
              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-600 text-sm">{product.karat} • {product.gemstone}</p>
                <p className="font-medium">{formatPrice(product.price)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 bg-gold/10 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-playfair font-bold mb-4">Looking for Something Special?</h3>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          If you can't find exactly what you're looking for, we offer custom design services to create your perfect piece.
        </p>
        <Link
          to="/pages/contact-us"
          className="btn-secondary inline-block"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default BanglesCollection;

import { useState } from "react";
import { Link } from "react-router-dom";

// Mock products for Ladies Collection
const ladiesProducts = [
  {
    id: "pearl-drop-earrings",
    name: "Pearl Drop Earrings",
    description: "Elegant pearl drop earrings with gold detailing",
    price: 1299,
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Earrings",
    karat: "18K",
    gemstone: "Pearl"
  },
  {
    id: "sapphire-earrings",
    name: "Sapphire Stud Earrings",
    description: "Beautiful sapphire studs set in gold",
    price: 1499,
    image: "https://images.unsplash.com/photo-1630019828251-9d97952f6b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Earrings",
    karat: "18K",
    gemstone: "Sapphire"
  },
  {
    id: "gold-bangle-classic",
    name: "Classic Gold Bangle",
    description: "Timeless classic gold bangle for daily wear",
    price: 1899,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Bangles",
    karat: "22K",
    gemstone: "None"
  },
  {
    id: "ruby-pendant-necklace",
    name: "Ruby Pendant Necklace",
    description: "Beautiful ruby pendant on a delicate gold chain",
    price: 2499,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Necklaces",
    karat: "18K",
    gemstone: "Ruby"
  },
  {
    id: "diamond-tennis-bracelet",
    name: "Diamond Tennis Bracelet",
    description: "Elegant tennis bracelet with brilliant diamonds",
    price: 4999,
    image: "https://images.unsplash.com/photo-1626784215021-2e914faeec2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Bracelets",
    karat: "18K",
    gemstone: "Diamond"
  },
  {
    id: "emerald-gold-necklace",
    name: "Emerald Gold Necklace",
    description: "Stunning gold necklace with emerald pendant",
    price: 3299,
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Necklaces",
    karat: "18K",
    gemstone: "Emerald"
  }
];

const LadiesCollection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Filter products by category if selected
  const filteredProducts = selectedCategory
    ? ladiesProducts.filter(product => product.category === selectedCategory)
    : ladiesProducts;

  // Get unique categories
  const categories = Array.from(new Set(ladiesProducts.map(product => product.category)));

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-playfair font-bold mb-4">Ladies Collection</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our exquisite collection of jewelry designed for the modern woman, combining timeless elegance with contemporary style.
        </p>
      </div>

      {/* Feature Banner */}
      <div className="relative w-full h-64 md:h-96 mb-12 rounded-lg overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1576723417715-6b777adf1d65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
          alt="Ladies Collection" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-4">
              Elegance in Every Piece
            </h2>
            <p className="text-white md:text-lg max-w-lg mx-auto">
              Crafted with precision and designed with passion for the modern woman.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex justify-center flex-wrap gap-3 mb-10">
        <button 
          className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
            selectedCategory === null
              ? "bg-gold text-white hover:bg-gold-dark"
              : "bg-white border border-gold text-gold hover:bg-gold/5"
          }`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {categories.map(category => (
          <button 
            key={category}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              selectedCategory === category
                ? "bg-gold text-white hover:bg-gold-dark"
                : "bg-white border border-gold text-gold hover:bg-gold/5"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
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
          If you can't find exactly what you're looking for, we offer custom jewelry design services to create your perfect piece.
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

export default LadiesCollection;

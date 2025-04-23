
import { useState } from "react";
import { Link } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Mock product data
const allProducts = [
  {
    id: "22k-gold-ruby-ring",
    name: "22K Gold Ring with Ruby",
    description: "Beautiful gold ring with a genuine ruby gemstone",
    price: 2499,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Rings",
    karat: "22K",
    gemstone: "Ruby",
    featured: true
  },
  {
    id: "diamond-engagement-ring",
    name: "Diamond Engagement Ring",
    description: "Stunning engagement ring with a brilliant-cut diamond",
    price: 3999,
    image: "https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Rings",
    karat: "18K",
    gemstone: "Diamond",
    featured: true
  },
  {
    id: "pearl-drop-earrings",
    name: "Pearl Drop Earrings",
    description: "Elegant pearl drop earrings with gold detailing",
    price: 1299,
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Earrings",
    karat: "18K",
    gemstone: "Pearl",
    featured: true
  },
  {
    id: "gold-stud-earrings",
    name: "Gold Stud Earrings",
    description: "Classic gold stud earrings for everyday wear",
    price: 899,
    image: "https://images.unsplash.com/photo-1676395173164-901bfd16c0b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Earrings",
    karat: "22K",
    gemstone: "None",
    featured: false
  },
  {
    id: "gold-bangle-classic",
    name: "Classic Gold Bangle",
    description: "Timeless classic gold bangle for daily wear",
    price: 1899,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Bangles",
    karat: "22K",
    gemstone: "None",
    featured: true
  },
  {
    id: "emerald-gold-necklace",
    name: "Emerald Gold Necklace",
    description: "Stunning gold necklace with emerald pendant",
    price: 3299,
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Necklaces",
    karat: "18K",
    gemstone: "Emerald",
    featured: true
  },
  {
    id: "sapphire-earrings",
    name: "Sapphire Stud Earrings",
    description: "Beautiful sapphire studs set in gold",
    price: 1499,
    image: "https://images.unsplash.com/photo-1630019828251-9d97952f6b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Earrings",
    karat: "18K",
    gemstone: "Sapphire",
    featured: false
  },
  {
    id: "diamond-tennis-bracelet",
    name: "Diamond Tennis Bracelet",
    description: "Elegant tennis bracelet with brilliant diamonds",
    price: 4999,
    image: "https://images.unsplash.com/photo-1626784215021-2e914faeec2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Bracelets",
    karat: "18K",
    gemstone: "Diamond",
    featured: true
  }
];

const AllProducts = () => {
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedKarats, setSelectedKarats] = useState<string[]>([]);
  const [selectedGemstones, setSelectedGemstones] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Filter products based on selected filters
  const filteredProducts = allProducts.filter((product) => {
    // Price range filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    // Karat filter
    if (selectedKarats.length > 0 && !selectedKarats.includes(product.karat)) {
      return false;
    }

    // Gemstone filter
    if (selectedGemstones.length > 0 && !selectedGemstones.includes(product.gemstone)) {
      return false;
    }

    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }

    return true;
  });

  // Sort products
  let sortedProducts = [...filteredProducts];
  if (sortBy === "price-low-high") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high-low") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "name-a-z") {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    // Default: featured
    sortedProducts.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1));
  }

  const toggleKarat = (karat: string) => {
    if (selectedKarats.includes(karat)) {
      setSelectedKarats(selectedKarats.filter((k) => k !== karat));
    } else {
      setSelectedKarats([...selectedKarats, karat]);
    }
  };

  const toggleGemstone = (gemstone: string) => {
    if (selectedGemstones.includes(gemstone)) {
      setSelectedGemstones(selectedGemstones.filter((g) => g !== gemstone));
    } else {
      setSelectedGemstones([...selectedGemstones, gemstone]);
    }
  };

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Get unique values for filters
  const karats = Array.from(new Set(allProducts.map((product) => product.karat)));
  const gemstones = Array.from(new Set(allProducts.map((product) => product.gemstone)));
  const categories = Array.from(new Set(allProducts.map((product) => product.category)));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-playfair font-bold mb-4">All Products</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our exquisite collection of fine jewelry, each piece crafted with precision and care.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden lg:block lg:w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="font-playfair text-xl font-semibold mb-4">Filters</h2>
            
            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="px-2">
                <Slider
                  defaultValue={[0, 5000]}
                  max={5000}
                  step={100}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="my-4"
                />
                <div className="flex justify-between text-sm">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>
            </div>
            
            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <Label 
                      htmlFor={`category-${category}`}
                      className="ml-2 text-sm cursor-pointer"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Karats */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Karat</h3>
              <div className="space-y-2">
                {karats.map((karat) => (
                  <div key={karat} className="flex items-center">
                    <Checkbox 
                      id={`karat-${karat}`}
                      checked={selectedKarats.includes(karat)}
                      onCheckedChange={() => toggleKarat(karat)}
                    />
                    <Label 
                      htmlFor={`karat-${karat}`}
                      className="ml-2 text-sm cursor-pointer"
                    >
                      {karat}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Gemstones */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Gemstones</h3>
              <div className="space-y-2">
                {gemstones.map((gemstone) => (
                  <div key={gemstone} className="flex items-center">
                    <Checkbox 
                      id={`gemstone-${gemstone}`}
                      checked={selectedGemstones.includes(gemstone)}
                      onCheckedChange={() => toggleGemstone(gemstone)}
                    />
                    <Label 
                      htmlFor={`gemstone-${gemstone}`}
                      className="ml-2 text-sm cursor-pointer"
                    >
                      {gemstone}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:w-3/4">
          {/* Sort and Results Count */}
          <div className="flex flex-col sm:flex-row justify-between mb-6">
            <p className="text-gray-600 mb-3 sm:mb-0">
              {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'} found
            </p>
            <div className="flex items-center">
              <label htmlFor="sort" className="text-sm text-gray-600 mr-2">Sort by:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-gold"
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name-a-z">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
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

          {/* Empty State */}
          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="font-playfair text-xl mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your filters to find what you're looking for.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;

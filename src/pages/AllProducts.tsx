import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import productsData from '../data/products.json';

const allProducts = productsData.products;

const AllProducts = () => {
  const { category } = useParams<{ category: string }>();
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedKarats, setSelectedKarats] = useState<string[]>([]);
  const [selectedGemstones, setSelectedGemstones] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    if (category && category !== 'all-products') {
      setSelectedCategories([category]);
    } else {
      setSelectedCategories([]);
    }
  }, [category]);

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
  const sortedProducts = [...filteredProducts];
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
        <h1 className="text-4xl font-playfair font-bold mb-4">
          {category === 'all-products' ? 'All Products' : category?.charAt(0).toUpperCase() + category?.slice(1)}
        </h1>
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
                  defaultValue={[0, 20000]}
                  max={20000}
                  step={500}
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

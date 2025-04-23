
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// Mock product database
const products = [
  {
    id: "22k-gold-ruby-ring",
    name: "22K Gold Ring with Ruby",
    description: "This exquisite 22K gold ring features a stunning ruby gemstone as its centerpiece. The vibrant red ruby is 0.75 carats, expertly cut to maximize its brilliance and color. The setting is crafted from solid 22K gold, giving it a rich, warm yellow tone that perfectly complements the ruby's deep red hue. The band features intricate hand-engraved detailing, showcasing the craftsmanship that goes into every piece.",
    price: 2499,
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    ],
    specifications: {
      metal: "22K Gold",
      weight: "6.5 grams",
      gemstone: "Ruby",
      carats: "0.75 carat",
      dimensions: "Band width: 2mm"
    },
    category: "Rings",
    relatedProducts: ["diamond-engagement-ring", "gold-stud-earrings", "emerald-gold-necklace"]
  },
  {
    id: "diamond-engagement-ring",
    name: "Diamond Engagement Ring",
    description: "A stunning engagement ring featuring a brilliant-cut diamond set in 18K white gold. The center diamond is 1 carat, certified VS clarity and F color, providing exceptional brilliance and fire. The elegant band is enhanced with channel-set smaller diamonds that add additional sparkle. This timeless design symbolizes eternal love and commitment.",
    price: 3999,
    images: [
      "https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    ],
    specifications: {
      metal: "18K White Gold",
      weight: "4.2 grams",
      gemstone: "Diamond",
      carats: "1 carat center, 0.25 carats accent",
      dimensions: "Band width: 1.8mm"
    },
    category: "Rings",
    relatedProducts: ["22k-gold-ruby-ring", "diamond-tennis-bracelet", "sapphire-earrings"]
  },
  {
    id: "pearl-drop-earrings",
    name: "Pearl Drop Earrings",
    description: "These elegant pearl drop earrings feature lustrous freshwater pearls suspended from 18K gold studs. The pearls are perfectly matched for size, shape, and luster, measuring approximately 8.5mm in diameter. The gold components are polished to a high shine, creating a beautiful contrast with the soft glow of the pearls. Secure butterfly backings provide comfort and security.",
    price: 1299,
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    ],
    specifications: {
      metal: "18K Gold",
      weight: "3.8 grams total",
      gemstone: "Freshwater Pearl",
      carats: "N/A",
      dimensions: "Pearl diameter: 8.5mm"
    },
    category: "Earrings",
    relatedProducts: ["gold-stud-earrings", "emerald-gold-necklace", "diamond-tennis-bracelet"]
  },
  {
    id: "gold-stud-earrings",
    name: "Gold Stud Earrings",
    description: "Classic gold stud earrings for everyday wear. These beautifully crafted 22K gold studs feature a polished finish and secure butterfly backings. Their simple yet elegant design makes them perfect for daily wear or for pairing with other jewelry for special occasions.",
    price: 899,
    images: [
      "https://images.unsplash.com/photo-1676395173164-901bfd16c0b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1676395173164-901bfd16c0b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1676395173164-901bfd16c0b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    ],
    specifications: {
      metal: "22K Gold",
      weight: "2.2 grams total",
      gemstone: "None",
      carats: "N/A",
      dimensions: "6mm diameter"
    },
    category: "Earrings",
    relatedProducts: ["pearl-drop-earrings", "22k-gold-ruby-ring", "gold-bangle-classic"]
  },
  {
    id: "gold-bangle-classic",
    name: "Classic Gold Bangle",
    description: "This timeless 22K gold bangle features a smooth, polished finish and secure hinged design. The substantial weight of the piece speaks to its quality and craftsmanship. The classic design ensures it will remain fashionable for years to come, making it both a beautiful accessory and a valuable investment.",
    price: 1899,
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    ],
    specifications: {
      metal: "22K Gold",
      weight: "15.2 grams",
      gemstone: "None",
      carats: "N/A",
      dimensions: "65mm inner diameter, 3mm width"
    },
    category: "Bangles",
    relatedProducts: ["diamond-tennis-bracelet", "gold-stud-earrings", "emerald-gold-necklace"]
  },
  {
    id: "emerald-gold-necklace",
    name: "Emerald Gold Necklace",
    description: "This exquisite necklace features a vibrant emerald pendant suspended from an 18K gold chain. The emerald is approximately 1.25 carats, displaying the rich green color and clarity for which these gemstones are prized. The pendant setting is crafted with intricate details that showcase the emerald beautifully, while the adjustable chain allows for versatile styling.",
    price: 3299,
    images: [
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    ],
    specifications: {
      metal: "18K Gold",
      weight: "7.5 grams total",
      gemstone: "Emerald",
      carats: "1.25 carats",
      dimensions: "Chain length: adjustable 16-18\""
    },
    category: "Necklaces",
    relatedProducts: ["22k-gold-ruby-ring", "pearl-drop-earrings", "diamond-tennis-bracelet"]
  },
  {
    id: "sapphire-earrings",
    name: "Sapphire Stud Earrings",
    description: "These beautiful stud earrings feature deep blue sapphires set in 18K gold. Each sapphire is approximately 0.5 carats, with excellent color saturation and clarity. The secure butterfly backings ensure comfortable all-day wear, while the classic design makes them suitable for both casual and formal occasions.",
    price: 1499,
    images: [
      "https://images.unsplash.com/photo-1630019828251-9d97952f6b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1630019828251-9d97952f6b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1630019828251-9d97952f6b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    ],
    specifications: {
      metal: "18K Gold",
      weight: "2.8 grams total",
      gemstone: "Sapphire",
      carats: "0.5 carats each",
      dimensions: "5mm diameter"
    },
    category: "Earrings",
    relatedProducts: ["pearl-drop-earrings", "22k-gold-ruby-ring", "emerald-gold-necklace"]
  },
  {
    id: "diamond-tennis-bracelet",
    name: "Diamond Tennis Bracelet",
    description: "This elegant tennis bracelet features 36 brilliant-cut diamonds totaling 3 carats, set in 18K white gold. Each diamond is carefully matched for color, clarity, and cut to ensure a consistent sparkle along the entire length of the bracelet. The secure clasp includes a safety catch for peace of mind, while the flexible design ensures comfortable wear.",
    price: 4999,
    images: [
      "https://images.unsplash.com/photo-1626784215021-2e914faeec2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1626784215021-2e914faeec2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1626784215021-2e914faeec2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    ],
    specifications: {
      metal: "18K White Gold",
      weight: "12.5 grams",
      gemstone: "Diamond",
      carats: "3 carats total",
      dimensions: "7\" length, 3.5mm width"
    },
    category: "Bracelets",
    relatedProducts: ["diamond-engagement-ring", "emerald-gold-necklace", "gold-bangle-classic"]
  }
];

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<any | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find product by ID
    const foundProduct = products.find(p => p.id === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
      setMainImage(foundProduct.images[0]);
      
      // Get related products
      const related = products.filter(p => 
        foundProduct.relatedProducts.includes(p.id)
      ).slice(0, 3);
      
      setRelatedProducts(related);
    }
    
    setLoading(false);
  }, [productId]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="h-6 w-1/3 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded"></div>
            <div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div className="h-12 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-playfair mb-4">Product Not Found</h1>
        <p className="mb-6">We couldn't find the product you're looking for.</p>
        <Link to="/collections/all-products" className="btn-primary">
          Browse All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-gold">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/collections" className="hover:text-gold">Collections</Link>
        <span className="mx-2">/</span>
        <Link to={`/collections/all-products`} className="hover:text-gold">{product.category}</Link>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="mb-4 aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img 
              src={mainImage} 
              alt={product.name} 
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {product.images.map((image: string, index: number) => (
              <button 
                key={index}
                className={`aspect-square overflow-hidden rounded-md ${
                  mainImage === image ? 'ring-2 ring-gold' : ''
                }`}
                onClick={() => setMainImage(image)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} view ${index + 1}`} 
                  className="w-full h-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-playfair font-bold mb-2">{product.name}</h1>
          <p className="text-2xl text-gold font-medium mb-6">{formatPrice(product.price)}</p>
          
          <div className="prose prose-sm max-w-none mb-8 text-gray-700">
            <p>{product.description}</p>
          </div>
          
          {/* Specifications */}
          <div className="mb-8">
            <h3 className="text-lg font-playfair font-semibold mb-3">Specifications</h3>
            <div className="bg-gray-50 rounded-md p-4">
              <ul className="space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <li key={key} className="flex">
                    <span className="font-medium w-24 text-gray-700 capitalize">{key}:</span>
                    <span className="text-gray-600">{value as string}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Contact Button */}
          <div className="mb-8">
            <Link to="/pages/contact-us" className="btn-primary block text-center sm:inline-block">
              Contact Us About This Item
            </Link>
          </div>
          
          {/* Store Info */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-playfair font-semibold mb-3">Visit Our Store</h3>
            <p className="text-gray-600 mb-4">
              This piece is available to view in-store. Visit us to see this beautiful item in person.
            </p>
            <Link to="/pages/stores" className="text-burgundy hover:text-burgundy-dark font-medium flex items-center transition-colors">
              Find Store Locations
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-20">
        <h2 className="text-2xl font-playfair font-bold mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((product) => (
            <Link 
              to={`/products/${product.id}`} 
              key={product.id}
              className="product-card group"
            >
              <div className="aspect-square overflow-hidden rounded-t-md">
                <img 
                  src={product.images[0]}
                  alt={product.name}
                  className="product-image"
                />
              </div>
              <div className="p-4">
                <h3 className="font-playfair font-semibold text-lg mb-1 group-hover:text-gold transition-colors">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-gray-600 text-sm">{product.specifications.metal}</p>
                  <p className="font-medium">{formatPrice(product.price)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

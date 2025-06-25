import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import productsData from '../data/products.json';

const products = productsData.products;

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
      setMainImage(foundProduct.image);
      
      // Get related products
      const related = products.filter(p => 
        foundProduct.relatedProducts && foundProduct.relatedProducts.includes(p.id)
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

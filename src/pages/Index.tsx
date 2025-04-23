
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Hero slider data
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      title: "Exquisite Jewelry Collection",
      subtitle: "Discover timeless elegance with our carefully crafted pieces",
      link: "/collections/all-products"
    },
    {
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      title: "Ladies Collection 2024",
      subtitle: "Elegance redefined with our latest designs",
      link: "/collections/ladies-collection"
    },
    {
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      title: "Fine Craftsmanship",
      subtitle: "Each piece tells a story of heritage and artistry",
      link: "/pages/about-us"
    }
  ];

  // Featured products data
  const featuredProducts = [
    {
      id: "diamond-engagement-ring",
      name: "Diamond Engagement Ring",
      price: 3999,
      image: "https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Rings"
    },
    {
      id: "pearl-drop-earrings",
      name: "Pearl Drop Earrings",
      price: 1299,
      image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Earrings"
    },
    {
      id: "gold-bangle-classic",
      name: "Classic Gold Bangle",
      price: 1899,
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Bangles"
    },
    {
      id: "emerald-gold-necklace",
      name: "Emerald Gold Necklace",
      price: 3299,
      image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Necklaces"
    }
  ];

  // Collection categories
  const collections = [
    {
      title: "Rings",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      link: "/collections/all-products"
    },
    {
      title: "Earrings",
      image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      link: "/collections/all-products"
    },
    {
      title: "Bangles",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      link: "/collections/all-products"
    },
    {
      title: "Necklaces",
      image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      link: "/collections/all-products"
    }
  ];

  // Auto slide for hero banner
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      {/* Hero Slider */}
      <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="absolute inset-0 bg-black/30"></div>
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white p-6 max-w-3xl animate-fade-in">
                <h1 className="text-3xl md:text-5xl font-playfair font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-8">{slide.subtitle}</p>
                <Link
                  to={slide.link}
                  className="btn-primary text-black"
                >
                  Explore Collection
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slider indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 rounded-full ${
                currentSlide === index ? "bg-gold" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* About Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-playfair font-bold mb-4">Lahori Jewellers</h2>
              <div className="w-20 h-1 bg-gold mb-6"></div>
              <p className="text-gray-700 mb-6">
                Founded in 1985, Lahori Jewellers has established itself as a premier destination 
                for exquisite jewelry. Our collection showcases the finest craftsmanship passed down 
                through generations, combining traditional techniques with contemporary designs.
              </p>
              <p className="text-gray-700 mb-8">
                Each piece in our collection is meticulously crafted using only the finest materials, 
                ensuring exceptional quality and timeless elegance.
              </p>
              <Link to="/pages/about-us" className="btn-outlined">
                Learn More About Us
              </Link>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Jewelry craftsmanship"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gold/10 rounded-lg -z-10"></div>
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-gold/10 rounded-lg -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-gold/5">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold mb-4">Featured Products</h2>
            <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Discover our most exquisite and popular jewelry pieces, each representing the finest craftsmanship and timeless elegance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
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
                  <p className="text-sm text-gold mb-1">{product.category}</p>
                  <h3 className="font-playfair font-semibold text-lg mb-1 group-hover:text-gold transition-colors">
                    {product.name}
                  </h3>
                  <p className="font-medium">{formatPrice(product.price)}</p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/collections/all-products" className="btn-primary inline-flex items-center">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Collection Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold mb-4">Explore Our Collections</h2>
            <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Browse through our diverse range of jewelry categories to find your perfect piece.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((collection, index) => (
              <Link
                key={index}
                to={collection.link}
                className="relative group overflow-hidden rounded-lg h-64"
              >
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl text-white font-playfair font-bold">{collection.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gold/5">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold mb-4">What Our Clients Say</h2>
            <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "I purchased an engagement ring from Lahori Jewellers and couldn't be happier with the craftsmanship. The attention to detail is exceptional, and the service was outstanding."
              </p>
              <p className="font-medium">- Sarah Ahmed</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "The custom necklace I ordered from Lahori Jewellers exceeded my expectations. The design process was collaborative, and the final piece was stunning."
              </p>
              <p className="font-medium">- Amir Khan</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "I've been a loyal customer of Lahori Jewellers for years. Their quality is unmatched, and the staff is always helpful and knowledgeable about their products."
              </p>
              <p className="font-medium">- Fatima Hassan</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl font-playfair font-bold mb-4">Visit Our Stores</h2>
            <p className="text-lg mb-8">
              Experience our jewelry in person at one of our store locations. Our expert staff will help you find the perfect piece.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/pages/stores" className="btn-primary text-black">
                Find Store Locations
              </Link>
              <Link to="/pages/contact-us" className="btn-outlined text-white border-white hover:bg-white/10">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;

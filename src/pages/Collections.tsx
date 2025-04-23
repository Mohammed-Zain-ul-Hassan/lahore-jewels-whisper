
import { Link } from "react-router-dom";

const Collections = () => {
  const collections = [
    {
      id: "all-products",
      title: "All Products",
      description: "Browse our complete collection of fine jewelry",
      image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      link: "/collections/all-products"
    },
    {
      id: "ladies-collection",
      title: "Ladies Collection",
      description: "Elegant jewelry designed for the modern woman",
      image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      link: "/collections/ladies-collection"
    },
    {
      id: "rings",
      title: "Rings",
      description: "Stunning rings for every occasion",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      link: "/collections/all-products"
    },
    {
      id: "earrings",
      title: "Earrings",
      description: "Beautiful earrings to complement your style",
      image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      link: "/collections/all-products"
    },
    {
      id: "bangles",
      title: "Bangles & Bracelets",
      description: "Elegant bangles and bracelets for your wrist",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      link: "/collections/all-products"
    },
    {
      id: "necklaces",
      title: "Necklaces",
      description: "Stunning necklaces for any occasion",
      image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      link: "/collections/all-products"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-playfair font-bold mb-4">Our Collections</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our exquisite jewelry collections, each piece meticulously crafted with the finest materials and attention to detail.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map((collection) => (
          <Link 
            key={collection.id}
            to={collection.link}
            className="group block overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src={collection.image} 
                alt={collection.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-playfair font-bold text-white mb-1">{collection.title}</h3>
                <p className="text-sm text-gray-200">{collection.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Collections;

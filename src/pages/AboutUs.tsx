
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-playfair font-bold mb-4">About Lahori Jewellers</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A legacy of craftsmanship, quality and trust since 1985.
        </p>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-2xl font-playfair font-bold mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4">
            Lahori Jewellers was founded in 1985 by the Malik family in the historic city of Lahore, Pakistan. What began as a small shop in the famous Anarkali Bazaar has grown into one of the region's most respected jewelry establishments.
          </p>
          <p className="text-gray-700 mb-4">
            For over three decades, our family has been dedicated to the art of jewelry making, combining traditional craftsmanship with contemporary design. Each piece tells a story of our heritage and commitment to excellence.
          </p>
          <p className="text-gray-700">
            Today, under the leadership of the second generation of the Malik family, Lahori Jewellers continues to offer exceptional pieces that celebrate life's most precious moments.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Jewelry workshop" 
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-cream py-16 px-8 rounded-lg mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-playfair font-bold mb-4">Our Values</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            At Lahori Jewellers, our values guide every decision we make and every piece we create.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-playfair font-semibold mb-2">Quality</h3>
            <p className="text-gray-600">
              We use only the finest materials and adhere to strict quality standards in every piece we create.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-playfair font-semibold mb-2">Craftsmanship</h3>
            <p className="text-gray-600">
              Our master artisans combine centuries-old techniques with modern innovation to create timeless pieces.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <h3 className="text-xl font-playfair font-semibold mb-2">Trust</h3>
            <p className="text-gray-600">
              We build lasting relationships with our clients based on honesty, transparency, and exceptional service.
            </p>
          </div>
        </div>
      </div>

      {/* Craftsmanship Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-playfair font-bold mb-4">Our Craftsmanship</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Every piece of jewelry we create is a testament to the skill and dedication of our artisans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-lg overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              alt="Jewelry craftsmanship" 
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-playfair font-semibold mb-2">Material Selection</h3>
              <p className="text-gray-600 text-sm">
                We source only the finest gold, gemstones, and diamonds for our pieces.
              </p>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              alt="Jewelry design" 
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-playfair font-semibold mb-2">Design Process</h3>
              <p className="text-gray-600 text-sm">
                Our designs blend traditional motifs with contemporary aesthetics.
              </p>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1630019852942-f89202989a59?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              alt="Finished jewelry" 
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-playfair font-semibold mb-2">Final Creation</h3>
              <p className="text-gray-600 text-sm">
                Each piece undergoes rigorous quality control before reaching our customers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-playfair font-bold mb-4">Meet Our Team</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            The passionate individuals behind Lahori Jewellers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="mb-4 rounded-full overflow-hidden w-48 h-48 mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80" 
                alt="Ahmed Malik" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-playfair font-semibold mb-1">Ahmed Malik</h3>
            <p className="text-gold mb-2">CEO & Founder</p>
            <p className="text-gray-600 text-sm">
              With over 35 years in the jewelry industry, Ahmed brings unparalleled expertise and vision.
            </p>
          </div>

          <div className="text-center">
            <div className="mb-4 rounded-full overflow-hidden w-48 h-48 mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80" 
                alt="Zara Malik" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-playfair font-semibold mb-1">Zara Malik</h3>
            <p className="text-gold mb-2">Creative Director</p>
            <p className="text-gray-600 text-sm">
              A graduate from the London School of Design, Zara leads our innovative design team.
            </p>
          </div>

          <div className="text-center">
            <div className="mb-4 rounded-full overflow-hidden w-48 h-48 mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80" 
                alt="Sohail Khan" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-playfair font-semibold mb-1">Sohail Khan</h3>
            <p className="text-gold mb-2">Master Craftsman</p>
            <p className="text-gray-600 text-sm">
              With 25 years of experience, Sohail oversees our workshop and trains our next generation.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gold/10 py-16 px-4 rounded-lg">
        <h2 className="text-2xl font-playfair font-bold mb-4">Visit Our Store</h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-8">
          Experience the beauty of our collections in person. Our knowledgeable team is ready to assist you in finding the perfect piece.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/pages/stores" className="btn-primary">
            Store Locations
          </Link>
          <Link to="/pages/contact-us" className="btn-outlined">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;


import { useState } from "react";
import { Link } from "react-router-dom";

import storesData from '../data/stores.json';

const storeLocations = storesData.stores;

const Stores = () => {
  const [activeStore, setActiveStore] = useState(storeLocations[0]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-playfair font-bold mb-4">Our Store Locations</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Visit one of our stores to experience our jewelry collections in person and receive expert assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {storeLocations.map(store => (
          <div
            key={store.id}
            className={`border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
              activeStore.id === store.id
                ? "border-gold shadow-md"
                : "border-gray-200 hover:border-gold/50"
            }`}
            onClick={() => setActiveStore(store)}
          >
            <div className="h-48 overflow-hidden">
              <img
                src={store.image}
                alt={store.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-playfair font-semibold text-lg mb-2">{store.name}</h3>
              <p className="text-gray-600 text-sm mb-1">{store.address}</p>
              <p className="text-gray-600 text-sm">{store.phone}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Active Store Details */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8">
            <h2 className="text-2xl font-playfair font-bold mb-4">{activeStore.name}</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <h4 className="font-medium mb-1">Address</h4>
                  <p className="text-gray-600">{activeStore.address}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <h4 className="font-medium mb-1">Phone</h4>
                  <a href={`tel:${activeStore.phone.replace(/\s/g, '')}`} className="text-gray-600 hover:text-gold transition-colors">{activeStore.phone}</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <a href={`mailto:${activeStore.email}`} className="text-gray-600 hover:text-gold transition-colors">{activeStore.email}</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-medium mb-1">Store Hours</h4>
                  <p className="text-gray-600 whitespace-pre-line">{activeStore.hours}</p>
                </div>
              </div>
            </div>
            
            <Link to="/pages/contact-us" className="btn-primary inline-block mt-4">
              Contact This Store
            </Link>
          </div>
          
          <div className="h-96 md:h-auto">
            <iframe
              src={activeStore.mapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title={`Map of ${activeStore.name}`}
            ></iframe>
          </div>
        </div>
      </div>

      {/* Store Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-6 bg-gold/10 rounded-lg">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 className="text-xl font-playfair font-semibold mb-2">In-Store Shopping</h3>
          <p className="text-gray-700">
            Visit any of our locations to browse our complete collection and receive personalized assistance from our jewelry experts.
          </p>
        </div>

        <div className="text-center p-6 bg-gold/10 rounded-lg">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-playfair font-semibold mb-2">Private Consultations</h3>
          <p className="text-gray-700">
            Schedule a private appointment with our jewelry consultants for special occasions or custom designs.
          </p>
        </div>

        <div className="text-center p-6 bg-gold/10 rounded-lg">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
            </svg>
          </div>
          <h3 className="text-xl font-playfair font-semibold mb-2">Jewelry Services</h3>
          <p className="text-gray-700">
            We offer cleaning, repairs, resizing, and appraisals for all your jewelry needs at our stores.
          </p>
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center">
        <h2 className="text-2xl font-playfair font-bold mb-4">Plan Your Visit</h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-6">
          We look forward to welcoming you to one of our store locations. For any inquiries or to schedule an appointment, please don't hesitate to contact us.
        </p>
        <Link to="/pages/contact-us" className="btn-primary">
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default Stores;

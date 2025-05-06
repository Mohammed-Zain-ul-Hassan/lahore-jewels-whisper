import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import productsData from '../data/products.json';

interface ChatbotProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

interface Message {
  sender: "user" | "bot";
  text: string;
  links?: { text: string; url: string }[];
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  karat: string;
  gemstone: string;
  featured: boolean;
  collection: string[];
  specifications: {
    metal: string;
    weight: string;
    gemstone: string;
    carats: string;
    dimensions: string;
  };
  relatedProducts: string[];
}

const Chatbot = ({ isOpen, toggleOpen }: ChatbotProps) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const products = productsData.products as Product[];

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          sender: "bot",
          text: "Welcome to Lahori Jewellers! I'm your virtual assistant. How may I assist you today? You can ask about our collections, specific products, or find jewelry based on preferences like budget, occasion, or gemstone.",
          links: [
            { text: "Browse All Products", url: "/collections/all-products" },
            { text: "Ladies Collection", url: "/collections/ladies-collection" },
            { text: "Men's Collection", url: "/collections/mens-collection" },
            { text: "Contact Us", url: "/pages/contact-us" }
          ]
        }
      ]);
    }
  }, [messages.length]);

  // Auto scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getProductRecommendation = (category: string, priceMin = 0, priceMax = Infinity, gemstone?: string, featured = false) => {
    let filteredProducts = products.filter(p => 
      p.category === category && 
      p.price >= priceMin && 
      p.price <= priceMax
    );
    
    if (gemstone && gemstone !== "any") {
      filteredProducts = filteredProducts.filter(p => 
        p.gemstone.toLowerCase() === gemstone.toLowerCase()
      );
    }
    
    if (featured) {
      filteredProducts = filteredProducts.filter(p => p.featured);
    }
    
    // If no products match criteria, return broader results
    if (filteredProducts.length === 0) {
      return products.filter(p => p.category === category).slice(0, 3);
    }
    
    // Sort by price for budget requests
    if (priceMax < Infinity) {
      filteredProducts.sort((a, b) => b.price - a.price); // Most expensive first within range
    }
    
    return filteredProducts.slice(0, 3);
  };

  const getProductsByOccasion = (occasion: string) => {
    let recommendedProducts: Product[] = [];
    
    switch(occasion.toLowerCase()) {
      case "wedding":
      case "engagement":
        recommendedProducts = [
          ...products.filter(p => p.id === "diamond-engagement-ring" || p.category === "Rings" && p.featured).slice(0, 2),
          ...products.filter(p => p.id === "diamond-tennis-bracelet" || p.category === "Bracelets" && p.featured).slice(0, 1)
        ];
        break;
        
      case "anniversary":
        recommendedProducts = [
          ...products.filter(p => p.category === "Necklaces" && p.featured).slice(0, 2),
          ...products.filter(p => p.category === "Rings" && p.featured).slice(0, 1)
        ];
        break;
        
      case "birthday":
        recommendedProducts = [
          ...products.filter(p => p.category === "Earrings" && p.featured).slice(0, 1),
          ...products.filter(p => p.category === "Bracelets" && p.featured).slice(0, 1),
          ...products.filter(p => p.id === "gold-charm-bracelet" || p.category === "Necklaces").slice(0, 1)
        ];
        break;
        
      case "gift":
      case "present":
        // Mix of categories for diverse gift options
        recommendedProducts = [
          ...products.filter(p => p.category === "Earrings" && p.price < 2000).slice(0, 1),
          ...products.filter(p => p.category === "Bracelets" && p.price < 2000).slice(0, 1),
          ...products.filter(p => p.category === "Necklaces" && p.price < 2500).slice(0, 1)
        ];
        break;
        
      case "graduation":
        recommendedProducts = [
          ...products.filter(p => p.category === "Necklaces" && p.price < 2000).slice(0, 2),
          ...products.filter(p => p.category === "Earrings" && p.price < 1500).slice(0, 1)
        ];
        break;
      
      default:
        // For unknown occasions, provide a mix of featured items
        recommendedProducts = products.filter(p => p.featured).slice(0, 3);
    }
    
    return recommendedProducts;
  };

  const getProductsByBudget = (budget: number) => {
    // Split budget into different price tiers
    let lowRange: Product[] = [];
    let midRange: Product[] = [];
    let highRange: Product[] = [];
    
    if (budget <= 1000) {
      lowRange = products.filter(p => p.price <= budget).slice(0, 3);
      return lowRange;
    } else if (budget <= 2500) {
      lowRange = products.filter(p => p.price <= budget * 0.5).slice(0, 1);
      midRange = products.filter(p => p.price > budget * 0.5 && p.price <= budget).slice(0, 2);
      return [...lowRange, ...midRange];
    } else {
      lowRange = products.filter(p => p.price <= budget * 0.3).slice(0, 1);
      midRange = products.filter(p => p.price > budget * 0.3 && p.price <= budget * 0.7).slice(0, 1);
      highRange = products.filter(p => p.price > budget * 0.7 && p.price <= budget).slice(0, 1);
      return [...lowRange, ...midRange, ...highRange];
    }
  };

  const getBudgetFromText = (text: string): number | null => {
    // Extract dollar amounts from text
    const dollarPattern = /\$(\d+[,\d]*)/g;
    const matches = text.match(dollarPattern);
    
    if (matches && matches.length > 0) {
      // Remove commas and convert to number
      return parseInt(matches[0].replace(/[$,]/g, ''));
    }
    
    // Look for number followed by keywords
    const budgetPatterns = [
      /(\d+[,\d]*)\s*dollars/i,
      /(\d+[,\d]*)\s*usd/i,
      /budget\s*of\s*(\d+[,\d]*)/i,
      /spend\s*(\d+[,\d]*)/i,
      /under\s*(\d+[,\d]*)/i,
      /below\s*(\d+[,\d]*)/i,
      /(\d+[,\d]*)\s*or\s*less/i,
      /(\d+[,\d]*)\s*budget/i,
      /around\s*(\d+[,\d]*)/i,
      /about\s*(\d+[,\d]*)/i,
    ];
    
    for (const pattern of budgetPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        return parseInt(match[1].replace(/,/g, ''));
      }
    }
    
    return null;
  };

  const parsePriceRange = (text: string): { min: number; max: number } | null => {
    // Look for patterns like "between $X and $Y" or "$X to $Y" or "$X-$Y"
    const rangePatterns = [
      /between\s*\$?(\d+[,\d]*)\s*and\s*\$?(\d+[,\d]*)/i,
      /\$?(\d+[,\d]*)\s*to\s*\$?(\d+[,\d]*)/i,
      /\$?(\d+[,\d]*)\s*-\s*\$?(\d+[,\d]*)/i,
      /from\s*\$?(\d+[,\d]*)\s*to\s*\$?(\d+[,\d]*)/i
    ];
    
    for (const pattern of rangePatterns) {
      const match = text.match(pattern);
      if (match && match[1] && match[2]) {
        const min = parseInt(match[1].replace(/,/g, ''));
        const max = parseInt(match[2].replace(/,/g, ''));
        return { min, max };
      }
    }
    
    // Look for patterns like "under $X" or "less than $X"
    const underPatterns = [
      /under\s*\$?(\d+[,\d]*)/i,
      /less\s*than\s*\$?(\d+[,\d]*)/i,
      /below\s*\$?(\d+[,\d]*)/i,
      /not\s*more\s*than\s*\$?(\d+[,\d]*)/i
    ];
    
    for (const pattern of underPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        const max = parseInt(match[1].replace(/,/g, ''));
        return { min: 0, max };
      }
    }
    
    // Look for patterns like "over $X" or "more than $X"
    const overPatterns = [
      /over\s*\$?(\d+[,\d]*)/i,
      /more\s*than\s*\$?(\d+[,\d]*)/i,
      /above\s*\$?(\d+[,\d]*)/i,
      /at\s*least\s*\$?(\d+[,\d]*)/i
    ];
    
    for (const pattern of overPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        const min = parseInt(match[1].replace(/,/g, ''));
        return { min, max: Infinity };
      }
    }
    
    // Simple budget as a fallback
    const budget = getBudgetFromText(text);
    if (budget) {
      return { min: 0, max: budget };
    }
    
    return null;
  };

  const handleGemstoneQuery = (text: string) => {
    const gemstones = ["ruby", "diamond", "emerald", "sapphire", "pearl", "onyx", "amethyst"];
    let matchedGemstone = null;
    
    for (const gemstone of gemstones) {
      if (text.toLowerCase().includes(gemstone)) {
        matchedGemstone = gemstone;
        break;
      }
    }
    
    if (matchedGemstone) {
      const matchingProducts = products
        .filter(p => p.gemstone.toLowerCase() === matchedGemstone)
        .slice(0, 3);
      
      const gemstoneCapitalized = matchedGemstone.charAt(0).toUpperCase() + matchedGemstone.slice(1);
      
      if (matchingProducts.length > 0) {
        return {
          text: `Our ${gemstoneCapitalized} collection features exquisite pieces that showcase the natural beauty of this precious gemstone. Each piece is expertly crafted to highlight the gemstone's unique character:`,
          links: [
            ...matchingProducts.map(product => ({
              text: `${product.name} - ${formatPrice(product.price)}`,
              url: `/products/${product.id}`
            })),
            { text: `View All ${gemstoneCapitalized} Jewelry`, url: `/collections/gemstone-${matchedGemstone}` }
          ]
        };
      }
    }
    
    return null;
  };

  const handleMetalQuery = (text: string) => {
    const metalTypes = {
      "gold": "Gold",
      "white gold": "White Gold",
      "rose gold": "Rose Gold"
    };
    
    let matchedMetal = null;
    
    for (const [metalKey, metalName] of Object.entries(metalTypes)) {
      if (text.toLowerCase().includes(metalKey)) {
        matchedMetal = metalName;
        break;
      }
    }
    
    if (matchedMetal) {
      const matchingProducts = products
        .filter(p => p.specifications.metal.includes(matchedMetal))
        .slice(0, 3);
      
      if (matchingProducts.length > 0) {
        return {
          text: `Our ${matchedMetal} collection features timeless elegance and exceptional craftsmanship. Here are some of our finest ${matchedMetal.toLowerCase()} pieces:`,
          links: [
            ...matchingProducts.map(product => ({
              text: `${product.name} - ${formatPrice(product.price)}`,
              url: `/products/${product.id}`
            })),
            { text: `View All ${matchedMetal} Jewelry`, url: `/collections/${matchedMetal.toLowerCase().replace(' ', '-')}` }
          ]
        };
      }
    }
    
    return null;
  };

  const getProductRecommendationText = (products: Product[], context: string) => {
    if (products.length === 0) {
      return "I couldn't find exact matches for your request, but I'd be happy to help you explore other options. Please let me know if you'd like to see our featured collections or have any other preferences.";
    }
    
    const contextMap: Record<string, string> = {
      "wedding": "These exquisite pieces would make your special day even more memorable. Each piece is crafted with excellence and designed to last a lifetime:",
      "engagement": "Make your proposal unforgettable with one of these stunning pieces that symbolize eternal love and commitment:",
      "anniversary": "Celebrate your love story with these timeless pieces that represent the beauty of your journey together:",
      "birthday": "Make their birthday truly special with these carefully selected pieces that are sure to delight:",
      "gift": "These thoughtfully selected pieces make perfect gifts that will be cherished for years to come:",
      "budget": "These exceptional pieces offer remarkable value within your budget, each one showcasing our commitment to quality and craftsmanship:",
      "default": "Here are some exceptional pieces I've selected for you, each one crafted with the finest materials and attention to detail:"
    };
    
    return contextMap[context] || contextMap["default"];
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage as Message]);
    setInput("");
    setLoading(true);

    try {
      const userInput = input.toLowerCase();
      let botResponse: Message;

      // Check for occasion-based recommendations
      const occasionKeywords = ["wedding", "engagement", "anniversary", "birthday", "gift", "present", "graduation"];
      let matchedOccasion = null;
      
      for (const occasion of occasionKeywords) {
        if (userInput.includes(occasion)) {
          matchedOccasion = occasion;
          break;
        }
      }
      
      if (matchedOccasion) {
        const recommendedProducts = getProductsByOccasion(matchedOccasion);
        const responseText = getProductRecommendationText(recommendedProducts, matchedOccasion);
        
        botResponse = {
          sender: "bot",
          text: responseText,
          links: [
            ...recommendedProducts.map(product => ({
              text: `${product.name} - ${formatPrice(product.price)}`,
              url: `/products/${product.id}`
            })),
            { 
              text: `View All ${matchedOccasion.charAt(0).toUpperCase() + matchedOccasion.slice(1)} Gift Ideas`, 
              url: `/collections/occasion-${matchedOccasion}` 
            }
          ]
        };
      }
      // Check for budget-based recommendations
      else if (userInput.includes("budget") || /\$\d+/.test(userInput) || 
               userInput.includes("afford") || userInput.includes("spend") ||
               userInput.includes("price") || userInput.includes("cost")) {
        
        const priceRange = parsePriceRange(userInput);
        let recommendedProducts: Product[] = [];
        
        if (priceRange) {
          // Price range specified
          recommendedProducts = products
            .filter(p => p.price >= priceRange.min && p.price <= priceRange.max)
            .sort((a, b) => b.price - a.price) // Most expensive first
            .slice(0, 3);
            
          botResponse = {
            sender: "bot",
            text: `These beautiful pieces match your price range from ${formatPrice(priceRange.min)} to ${priceRange.max === Infinity ? 'luxury options' : formatPrice(priceRange.max)}. Each one represents exceptional craftsmanship and value:`,
            links: [
              ...recommendedProducts.map(product => ({
                text: `${product.name} - ${formatPrice(product.price)}`,
                url: `/products/${product.id}`
              })),
              { 
                text: `Shop Our Price Range Collection`, 
                url: `/collections/price-range?min=${priceRange.min}&max=${priceRange.max === Infinity ? '10000' : priceRange.max}` 
              }
            ]
          };
        } else {
          // General budget mention without specific amount
          const budgetAmount = getBudgetFromText(userInput);
          
          if (budgetAmount) {
            recommendedProducts = getProductsByBudget(budgetAmount);
            
            botResponse = {
              sender: "bot",
              text: `For a budget of ${formatPrice(budgetAmount)}, I've selected these exceptional pieces that offer outstanding value and craftsmanship:`,
              links: [
                ...recommendedProducts.map(product => ({
                  text: `${product.name} - ${formatPrice(product.price)}`,
                  url: `/products/${product.id}`
                })),
                { 
                  text: `View All Items Under ${formatPrice(budgetAmount)}`, 
                  url: `/collections/under-${budgetAmount}` 
                }
              ]
            };
          } else {
            // No specific budget amount found
            botResponse = {
              sender: "bot",
              text: "We have beautiful jewelry pieces across all price points. Could you tell me your approximate budget so I can recommend the perfect pieces for you?",
              links: [
                { text: "Luxury Collection (Over $3,000)", url: "/collections/luxury" },
                { text: "Premium Collection ($1,500-$3,000)", url: "/collections/premium" },
                { text: "Everyday Collection (Under $1,500)", url: "/collections/everyday" }
              ]
            };
          }
        }
      }
      // Check for gemstone-specific queries
      else if (userInput.includes("ruby") || userInput.includes("diamond") || 
               userInput.includes("emerald") || userInput.includes("sapphire") ||
               userInput.includes("pearl") || userInput.includes("onyx") ||
               userInput.includes("amethyst") || userInput.includes("gemstone")) {
        
        const gemstoneResponse = handleGemstoneQuery(userInput);
        
        if (gemstoneResponse) {
          botResponse = {
            sender: "bot",
            text: gemstoneResponse.text,
            links: gemstoneResponse.links
          };
        } else if (userInput.includes("gemstone")) {
          // General gemstone question
          botResponse = {
            sender: "bot",
            text: "We offer a wide variety of precious gemstones in our collections. Each gemstone has its own unique beauty and character:",
            links: [
              { text: "Diamond Collection", url: "/collections/gemstone-diamond" },
              { text: "Ruby Collection", url: "/collections/gemstone-ruby" },
              { text: "Emerald Collection", url: "/collections/gemstone-emerald" },
              { text: "Sapphire Collection", url: "/collections/gemstone-sapphire" },
              { text: "Pearl Collection", url: "/collections/gemstone-pearl" }
            ]
          };
        } else {
          // Fallback for gemstone not found
          botResponse = {
            sender: "bot",
            text: "We have beautiful jewelry with various gemstones. Would you like to explore our collections by gemstone type?",
            links: [
              { text: "Browse By Gemstone", url: "/collections/gemstones" },
              { text: "View Featured Collections", url: "/collections/featured" }
            ]
          };
        }
      }
      // Check for metal type queries
      else if (userInput.includes("gold") || userInput.includes("white gold") || 
               userInput.includes("rose gold") || userInput.includes("metal")) {
        
        const metalResponse = handleMetalQuery(userInput);
        
        if (metalResponse) {
          botResponse = {
            sender: "bot",
            text: metalResponse.text,
            links: metalResponse.links
          };
        } else if (userInput.includes("metal")) {
          // General metal question
          botResponse = {
            sender: "bot",
            text: "We craft our jewelry using the finest precious metals, each offering unique beauty and characteristics:",
            links: [
              { text: "Gold Collection", url: "/collections/gold" },
              { text: "White Gold Collection", url: "/collections/white-gold" },
              { text: "Rose Gold Collection", url: "/collections/rose-gold" }
            ]
          };
        } else {
          // Fallback for metal not found
          botResponse = {
            sender: "bot",
            text: "We have exquisite jewelry crafted from various precious metals. Would you like to explore our collections by metal type?",
            links: [
              { text: "Browse By Metal", url: "/collections/metals" },
              { text: "View Featured Collections", url: "/collections/featured" }
            ]
          };
        }
      }
      // Category-specific queries
      else if (userInput.includes("ring") || userInput.includes("rings")) {
        const ringProducts = getProductRecommendation("Rings", 0, Infinity);
        
        botResponse = {
          sender: "bot",
          text: "Our ring collection features exquisite craftsmanship and timeless designs. From engagement rings to statement pieces, each one is crafted to perfection:",
          links: ringProducts.map(product => ({
            text: `${product.name} - ${formatPrice(product.price)}`,
            url: `/products/${product.id}`
          })).concat([{ text: "View All Rings", url: "/collections/rings" }])
        };
      } else if (userInput.includes("earring") || userInput.includes("earrings")) {
        const earringProducts = getProductRecommendation("Earrings", 0, Infinity);
        
        botResponse = {
          sender: "bot",
          text: "Our earrings collection features designs that range from elegant studs to dramatic chandeliers. Each pair showcases exceptional craftsmanship and attention to detail:",
          links: earringProducts.map(product => ({
            text: `${product.name} - ${formatPrice(product.price)}`,
            url: `/products/${product.id}`
          })).concat([{ text: "View All Earrings", url: "/collections/earrings" }])
        };
      } else if (userInput.includes("necklace") || userInput.includes("necklaces") || userInput.includes("pendant")) {
        const necklaceProducts = getProductRecommendation("Necklaces", 0, Infinity);
        
        botResponse = {
          sender: "bot",
          text: "Discover our stunning necklace collection, featuring pieces that make a statement or add subtle elegance to any outfit. Each necklace is meticulously crafted for beauty and durability:",
          links: necklaceProducts.map(product => ({
            text: `${product.name} - ${formatPrice(product.price)}`,
            url: `/products/${product.id}`
          })).concat([{ text: "View All Necklaces", url: "/collections/necklaces" }])
        };
      } else if (userInput.includes("bracelet") || userInput.includes("bracelets")) {
        const braceletProducts = getProductRecommendation("Bracelets", 0, Infinity);
        
        botResponse = {
          sender: "bot",
          text: "Our bracelet collection combines timeless elegance with modern designs. From tennis bracelets to charm bracelets, each piece is crafted to perfection:",
          links: braceletProducts.map(product => ({
            text: `${product.name} - ${formatPrice(product.price)}`,
            url: `/products/${product.id}`
          })).concat([{ text: "View All Bracelets", url: "/collections/bracelets" }])
        };
      } else if (userInput.includes("bangle") || userInput.includes("bangles")) {
        const bangleProducts = getProductRecommendation("Bangles", 0, Infinity);
        
        botResponse = {
          sender: "bot",
          text: "Our bangle collection offers both statement pieces and everyday elegance. Each bangle reflects our commitment to quality craftsmanship and timeless design:",
          links: bangleProducts.map(product => ({
            text: `${product.name} - ${formatPrice(product.price)}`,
            url: `/products/${product.id}`
          })).concat([{ text: "View All Bangles", url: "/collections/bangles" }])
        };
      } else if (userInput.includes("men") || userInput.includes("mens") || userInput.includes("man") || userInput.includes("groom") || userInput.includes("husband") || userInput.includes("boyfriend")) {
        const mensProducts = products.filter(p => 
          p.collection.includes("mens") || 
          p.category === "Men's Jewelry"
        ).slice(0, 3);
        
        botResponse = {
          sender: "bot",
          text: "Our men's collection features sophisticated pieces designed with elegance and refined style. From cufflinks to signet rings, each piece embodies timeless masculinity:",
          links: mensProducts.map(product => ({
            text: `${product.name} - ${formatPrice(product.price)}`,
            url: `/products/${product.id}`
          })).concat([{ text: "View Men's Collection", url: "/collections/mens-collection" }])
        };
      } else if (userInput.includes("recommendation") || userInput.includes("recommend") || userInput.includes("suggest") || userInput.includes("suggestions")) {
        // Featured recommendations
        const featuredProducts = products.filter(p => p.featured).slice(0, 3);
        
        botResponse = {
          sender: "bot",
          text: "I'd be delighted to recommend some of our most exceptional pieces. These featured items showcase our finest craftsmanship and most popular designs:",
          links: featuredProducts.map(product => ({
            text: `${product.name} - ${formatPrice(product.price)}`,
            url: `/products/${product.id}`
          })).concat([{ text: "View All Featured Items", url: "/collections/featured" }])
        };
      } else if (userInput.includes("contact") || userInput.includes("store") || userInput.includes("location") || userInput.includes("visit") || userInput.includes("appointment")) {
        botResponse = {
          sender: "bot",
          text: "We'd love to welcome you to our stores where our expert staff can provide personalized assistance. You can also reach us through various channels:",
          links: [
            { text: "Our Store Locations", url: "/pages/stores" },
            { text: "Book an Appointment", url: "/pages/appointments" },
            { text: "Contact Customer Service", url: "/pages/contact-us" }
          ]
        };
      } else if (userInput.includes("about") || userInput.includes("history") || userInput.includes("company") || userInput.includes("lahori")) {
        botResponse = {
          sender: "bot",
          text: "Lahori Jewellers has a rich heritage spanning generations. Our commitment to exceptional craftsmanship, ethically sourced materials, and timeless designs has made us a trusted name in fine jewelry:",
          links: [
            { text: "Our Story", url: "/pages/about-us" },
            { text: "Our Craftsmanship", url: "/pages/craftsmanship" },
            { text: "Ethical Sourcing", url: "/pages/ethical-sourcing" }
          ]
        };
      } else if (userInput.includes("custom") || userInput.includes("customize") || userInput.includes("personalize") || userInput.includes("bespoke")) {
        botResponse = {
          sender: "bot",
          text: "We offer exquisite custom jewelry services to help you create the perfect piece. Our expert artisans will work closely with you to bring your vision to life:",
          links: [
            { text: "Custom Jewelry Services", url: "/pages/custom-jewelry" },
            { text: "Book a Custom Consultation", url: "/pages/custom-consultation" },
            { text: "View Custom Design Gallery", url: "/pages/custom-gallery" }
          ]
        };
      } else if (userInput.includes("repair") || userInput.includes("resize") || userInput.includes("fix") || userInput.includes("service")) {
        botResponse = {
          sender: "bot",
          text: "We provide professional jewelry repair and maintenance services to keep your precious pieces in perfect condition. Our skilled craftsmen handle everything from resizing to stone replacement:",
          links: [
            { text: "Jewelry Repair Services", url: "/pages/repair-services" },
            { text: "Maintenance Tips", url: "/pages/jewelry-care" },
            { text: "Book a Repair Consultation", url: "/pages/repair-consultation" }
          ]
        };
      } else {
        // General search for matching products
        const matchingProducts = products.filter(product => 
          product.name.toLowerCase().includes(userInput) ||
          product.description.toLowerCase().includes(userInput) ||
          product.category.toLowerCase().includes(userInput) ||
          product.gemstone.toLowerCase().includes(userInput)
        ).slice(0, 3);

        if (matchingProducts.length > 0) {
          botResponse = {
            sender: "bot",
            text: "I found these exquisite pieces that might be perfect for you. Each one represents our commitment to exceptional quality and design:",
            links: matchingProducts.map(product => ({
              text: `${product.name} - ${formatPrice(product.price)}`,
              url: `/products/${product.id}`
            }))
          };
        } else {
          // Default response with personalized suggestions
          const featuredItems = products.filter(p => p.featured).slice(0, 2);
          
          botResponse = {
            sender: "bot",
            text: "I'd be delighted to help you find the perfect jewelry piece. You can explore our collections by category, metal type, or occasion. Or let me know your specific preferences, such as budget range, gemstone preference, or the occasion you're shopping for.",
            links: [
              ...featuredItems.map(product => ({
                text: `Featured: ${product.name} - ${formatPrice(product.price)}`,
                url: `/products/${product.id}`
              })),
              { text: "Shop by Category", url: "/collections/all-products" },
              { text: "Shop by Occasion", url: "/collections/occasions" },
              { text: "Shop by Gemstone", url: "/collections/gemstones" }
            ]
          };
        }
      }

      setTimeout(() => {
        setMessages((prev) => [...prev, botResponse]);
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error in chatbot response:", error);
      setMessages((prev) => [
        ...prev,
        { 
          sender: "bot", 
          text: "I'm having trouble processing your request right now. Please try again later or contact our customer service team directly for immediate assistance." 
        }
      ]);
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const ChatbotButton = () => (
    <button
      onClick={toggleOpen}
      className="fixed bottom-6 right-6 bg-gold text-black p-3 rounded-full shadow-lg hover:bg-gold-dark transition-colors z-50"
      aria-label="Chat with us"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );

  if (!isOpen) {
    return <ChatbotButton />;
  }

  return (
    <>
      <div className="chatbot-container fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden z-50 border border-gold/30">
        <div className="chatbot-header bg-gold/10 p-3 flex justify-between items-center border-b border-gold/20">
          <h3 className="font-bold text-black">Lahori Jewellers Assistant</h3>
          <button onClick={toggleOpen} className="hover:bg-gold-dark/20 rounded-full p-1 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="chatbot-messages flex-1 p-3 overflow-y-auto">
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`max-w-[85%] ${
                message.sender === "user" 
                  ? "ml-auto bg-gold/10 text-black" 
                  : "mr-auto bg-gray-100 text-black"
              } rounded-lg p-3 mb-2`}
            >
              <p>{message.text}</p>
              {message.links && (
                <div className="mt-2 flex flex-col space-y-2">
                  {message.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.url}
                      className="text-burgundy hover:underline text-sm font-medium"
                    >
                      {link.text} →
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="mr-auto bg-gray-100 rounded-lg p-3 mb-2">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse delay-150"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse delay-300"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="chatbot-input border-t border-gold/20 p-3 flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about our jewelry..."
            className="flex-1 bg-transparent outline-none text-black"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className={`p-2 rounded-full ${
              !input.trim() || loading
                ? "text-gray-400"
                : "text-gold hover:text-gold-dark"
            } transition-colors`}
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
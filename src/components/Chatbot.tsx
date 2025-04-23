
import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";

interface ChatbotProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

interface Message {
  sender: "user" | "bot";
  text: string;
  links?: { text: string; url: string }[];
}

const Chatbot = ({ isOpen, toggleOpen }: ChatbotProps) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const apiKey = "AIzaSyAN43Wv5EuJg4lh-Y8LAr-VGUENeZa-5W4"; // Gemini API Key

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          sender: "bot",
          text: "Welcome to Lahori Jewellers! I'm your virtual assistant. How may I assist you today? You can ask about our collections, specific products, or find jewelry based on your preferences.",
          links: [
            { text: "Browse All Products", url: "/collections/all-products" },
            { text: "Ladies Collection", url: "/collections/ladies-collection" },
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

  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage as Message]);
    setInput("");
    setLoading(true);

    try {
      // Simulate API call to Gemini (We'll actually implement this later)
      // For now, let's create placeholder responses
      setTimeout(() => {
        let botResponse: Message;
        
        const userInput = input.toLowerCase();
        
        if (userInput.includes("ring") || userInput.includes("rings")) {
          botResponse = {
            sender: "bot",
            text: "We have a beautiful collection of rings. Here are some options you might like:",
            links: [
              { text: "22K Gold Ring with Ruby", url: "/products/22k-gold-ruby-ring" },
              { text: "Diamond Engagement Ring", url: "/products/diamond-engagement-ring" },
              { text: "View All Rings", url: "/collections/all-products" }
            ]
          };
        } else if (userInput.includes("earring") || userInput.includes("earrings")) {
          botResponse = {
            sender: "bot",
            text: "Our earrings collection features stunning designs. Here are some popular options:",
            links: [
              { text: "Pearl Drop Earrings", url: "/products/pearl-drop-earrings" },
              { text: "Gold Stud Earrings", url: "/products/gold-stud-earrings" },
              { text: "View All Earrings", url: "/collections/all-products" }
            ]
          };
        } else if (userInput.includes("contact") || userInput.includes("store") || userInput.includes("location")) {
          botResponse = {
            sender: "bot",
            text: "You can visit our stores or contact us through various channels:",
            links: [
              { text: "Our Stores", url: "/pages/stores" },
              { text: "Contact Us", url: "/pages/contact-us" }
            ]
          };
        } else if (userInput.includes("about") || userInput.includes("history")) {
          botResponse = {
            sender: "bot",
            text: "Lahori Jewellers has a rich heritage in fine jewelry craftsmanship:",
            links: [
              { text: "About Us", url: "/pages/about-us" }
            ]
          };
        } else {
          botResponse = {
            sender: "bot",
            text: "I'd be happy to help you find the perfect jewelry piece. You can browse our collections or ask me about specific items like rings, earrings, or necklaces.",
            links: [
              { text: "All Products", url: "/collections/all-products" },
              { text: "Ladies Collection", url: "/collections/ladies-collection" }
            ]
          };
        }
        
        setMessages((prev) => [...prev, botResponse]);
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error in chatbot response:", error);
      setMessages((prev) => [
        ...prev,
        { 
          sender: "bot", 
          text: "I'm having trouble connecting right now. Please try again later or contact us directly." 
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
      <div className="chatbot-container">
        <div className="chatbot-header">
          <h3 className="font-bold">Jewelry Assistant</h3>
          <button onClick={toggleOpen} className="hover:bg-gold-dark/20 rounded-full p-1 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="chatbot-messages">
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
        
        <div className="chatbot-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about our jewelry..."
            className="flex-1 bg-transparent outline-none"
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

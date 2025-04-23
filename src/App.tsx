import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Collections from "./pages/Collections";
import AllProducts from "./pages/AllProducts";
import LadiesCollection from "./pages/LadiesCollection";
import ProductDetail from "./pages/ProductDetail";
import AboutUs from "./pages/AboutUs";
import Stores from "./pages/Stores";
import ContactUs from "./pages/ContactUs";
import Layout from "./components/Layout";
import Chatbot from "./components/Chatbot";

const queryClient = new QueryClient();

const App = () => {
  const [chatbotOpen, setChatbotOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/collections/all-products" element={<AllProducts />} />
              <Route path="/collections/ladies-collection" element={<LadiesCollection />} />
              <Route path="/products/:productId" element={<ProductDetail />} />
              <Route path="/pages/about-us" element={<AboutUs />} />
              <Route path="/pages/stores" element={<Stores />} />
              <Route path="/pages/contact-us" element={<ContactUs />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Chatbot isOpen={chatbotOpen} toggleOpen={() => setChatbotOpen(!chatbotOpen)} />
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

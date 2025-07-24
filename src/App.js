// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import { WishlistProvider } from './components/WishlistContext';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Categories from './components/CategoryGrid';
import Footer from './components/Footer';
import OrderHistory from './elements/OrderHistory';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import SearchResults from './components/SearchResults';
import Wishlist from './components/Wishlist';
import About from './components/About';
import Contact from './components/Contact';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import FAQs from './components/FAQs';
import Login from './components/Login';
import Register from './components/Register';
import ShopByCategory from './components/ShopByCategory';
import AccessoriesPage from './components/AccessoriesPage'; 
import SpeakerPage from './components/SpeakerPage'; // Import the SpeakerPage
import CameraPage from './components/CameraPage'; // Import the CameraPage


const App = () => {
  
  return (
    <CartProvider>
      <WishlistProvider>
       
        <Router> 
          
          <div className="min-h-screen w-full flex flex-col">
           
            <Header />

            <Navigation />
     
            <main className="flex-col flex-1 w-full">
              <Routes>
                <Route path="/" element={<><ShopByCategory/><Categories /></>} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/order-history" element={<OrderHistory />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products/accessories" element={<AccessoriesPage />} />
                <Route path="/products/speakers" element={<SpeakerPage />} /> {/* Route for Speaker Page */}
                <Route path="/cameras" element={<CameraPage />} /> {/* Route for Camera Page */}
                 
                
                
              </Routes>
              
            </main>
            
            <Footer />
          </div>
        </Router>
      </WishlistProvider>
    </CartProvider>
    
  );
};
export default App;
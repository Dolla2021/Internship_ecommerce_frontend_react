// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import { WishlistProvider } from './components/WishlistContext';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Categories from './components/CategoryGrid';
import Footer from './components/Footer';
import OrderHistory from './components/OrderHistory';
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
import SpeakerPage from './components/SpeakerPage';
import CameraPage from './components/CameraPage';
import AdminPage from './Admin/AdminPage';
import Checkout from './components/Checkout';

// Admin Nested Sections
import AnalyticsSection from './Admin/component/AnalyticsSection';
import CustomersSection from './Admin/component/CustomersSection';
import OrdersSection from './Admin/component/OrdersSection';
import ProductsSection from './Admin/component/ProductsSection';
import UserProfilePage from './components/UserProfilePage';


const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  return (
    <div className="min-h-screen w-full flex flex-col">
      {!isAdminRoute && <Header />}
      {!isAdminRoute && <Navigation />}
      <main className="flex-col flex-1 w-full">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<><ShopByCategory /><Categories /></>} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/About" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/faqs" element={<FAQs />} />
          {/* Category Routes */}
          <Route path="/products/accessories" element={<AccessoriesPage />} />
          <Route path="/products/speakers" element={<SpeakerPage />} />
          <Route path="/products/cameras" element={<CameraPage />} />
          {/* Customer Routes (Protected) */}
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/UserProfilePage" element={<UserProfilePage />} />
          {/* Admin Routes (Protected) */}
          <Route path="/admin" element={<AdminPage />}>
            <Route path="products" element={<ProductsSection />} />
            <Route path="orders" element={<OrdersSection />} />
            <Route path="customers" element={<CustomersSection />} />
            <Route path="analytics" element={<AnalyticsSection />} />
            
          </Route>
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};
const App = () => {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <AppContent />
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
};
export default App;
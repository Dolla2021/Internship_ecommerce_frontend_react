import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { FaYoutube, FaGlassMartiniAlt, FaLinkedin, FaFacebook, FaSlack, FaMapMarkerAlt, FaPhone, FaClock, FaEnvelope } from 'react-icons/fa';
const Footer = () => {
  const [email, setEmail] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setNewsletterMessage('Thank you for subscribing!');
      setEmail('');
      setTimeout(() => setNewsletterMessage(''), 3000); // Clear message after 3 seconds
    } else {
      setNewsletterMessage('Please enter a valid email.');
    }
  };
  return (
    <footer className="bg-gray-800 text-white py-10 px-6">
      {/* Top Info Row */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 border-b pb-8 border-gray-700">
        <div className="flex items-start gap-3">
          <FaMapMarkerAlt className="text-xl" />
          <div>
            <h4 className="font-semibold">Visit Us</h4>
            <p>123 Furniture Street, Design District</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <FaPhone className="text-xl" />
          <div>
            <h4 className="font-semibold">Call Us</h4>
            <p>+91 98470 01004</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <FaClock className="text-xl" />
          <div>
            <h4 className="font-semibold">Working Hours</h4>
            <p>Mon - Sat: 10:00 AM - 7:00 PM</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <FaEnvelope className="text-xl" />
          <div>
            <h4 className="font-semibold">Email Us</h4>
            <p>info@furnitureshop.com</p>
          </div>
        </div>
      </div>
      {/* Bottom Row */}
      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* TULOS Branding */}
        <div>
          <h2 className="text-xl font-bold">TULOS</h2>
          <p className="text-sm mt-2">
            Discover curated furniture collections at TULOS, blending style and comfort to elevate your living spaces.
          </p>
          <div className="flex gap-3 mt-4 text-xl text-gray-400">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FaYoutube className="hover:text-yellow-400 transition" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin className="hover:text-yellow-400 transition" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook className="hover:text-yellow-400 transition" />
            </a>
            <a href="https://slack.com" target="_blank" rel="noopener noreferrer" aria-label="Slack">
              <FaSlack className="hover:text-yellow-400 transition" />
            </a>
            <a href="https://martini.com" target="_blank" rel="noopener noreferrer" aria-label="Martini">
              <FaGlassMartiniAlt className="hover:text-yellow-400 transition" />
            </a>
          </div>
        </div>
        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/about" className="hover:text-yellow-400 transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-400 transition">Contact Us</Link></li>
            <li><Link to="/terms" className="hover:text-yellow-400 transition">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-yellow-400 transition">Privacy Policy</Link></li>
            <li><Link to="/faqs" className="hover:text-yellow-400 transition">FAQs</Link></li>
          </ul>
        </div>
        {/* Categories */}
        <div>
          <h4 className="font-semibold mb-2">Categories</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/products/electronics" className="hover:text-yellow-400 transition">Electronics</Link></li>
            <li><Link to="/products/speakers" className="hover:text-yellow-400 transition">Speakers</Link></li>
            <li><Link to="/products/watches" className="hover:text-yellow-400 transition">Watches</Link></li>
            <li><Link to="/categories/tshirts" className="hover:text-yellow-400 transition">T-Shirts</Link></li>
            <li><Link to="/categories/accessories" className="hover:text-yellow-400 transition">Accessories</Link></li>
            <li><Link to="/categories/household" className="hover:text-yellow-400 transition">Household</Link></li>
          </ul>
        </div>
        {/* Newsletter */}
        <div>
          <h4 className="font-semibold mb-2">Newsletter</h4>
          <p className="text-sm mb-3">Subscribe to our newsletter to receive updates and exclusive offers.</p>
          <form onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded border text-sm mb-2 text-gray-900"
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Subscribe
            </button>
          </form>
          {newsletterMessage && (
            <p className={`text-sm mt-2 ${email ? 'text-green-400' : 'text-green-600'}`}>
              {newsletterMessage}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
};
export default Footer;
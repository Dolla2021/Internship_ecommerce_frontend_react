
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { FaYoutube, FaGlassMartiniAlt, FaLinkedin, FaFacebook, FaSlack, FaMapMarkerAlt, FaPhone, FaClock, FaEnvelope } from 'react-icons/fa';
const Footer = () => {
  const [email, setEmail] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setNewsletterMessage('Please enter your email address.');
      return;
    }
    if (!validateEmail(email)) {
      setNewsletterMessage('Please enter a valid email address.');
      return;
    }
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNewsletterMessage('Thank you for subscribing! Welcome to our community.');
      setEmail('');
    } catch (error) {
      setNewsletterMessage('Subscription failed. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setNewsletterMessage(''), 5000);
    }
  };
  return (
    <footer className="bg-gray-800 text-white py-10 px-6" role="contentinfo">
      {/* Top Info Row */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 border-b pb-8 border-gray-700">
        <div className="flex items-start gap-3 hover:transform hover:scale-105 transition-transform">
          <FaMapMarkerAlt className="text-xl text-yellow-400" aria-hidden="true" />
          <div>
            <h4 className="font-semibold">Visit Us</h4>
            <address className="not-italic">123 Furniture Street, Design District</address>
          </div>
        </div>
        <div className="flex items-start gap-3 hover:transform hover:scale-105 transition-transform">
          <FaPhone className="text-xl text-yellow-400" aria-hidden="true" />
          <div>
            <h4 className="font-semibold">Call Us</h4>
            <a href="tel:+919847001004" className="hover:text-yellow-400 transition">+91 98470 01004</a>
          </div>
        </div>
        <div className="flex items-start gap-3 hover:transform hover:scale-105 transition-transform">
          <FaClock className="text-xl text-yellow-400" aria-hidden="true" />
          <div>
            <h4 className="font-semibold">Working Hours</h4>
            <p>Mon - Sat: 10:00 AM - 7:00 PM</p>
          </div>
        </div>
        <div className="flex items-start gap-3 hover:transform hover:scale-105 transition-transform">
          <FaEnvelope className="text-xl text-yellow-400" aria-hidden="true" />
          <div>
            <h4 className="font-semibold">Email Us</h4>
            <a href="mailto:info@furnitureshop.com" className="hover:text-yellow-400 transition">info@furnitureshop.com</a>
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
            {[
              { icon: FaYoutube, link: 'https://youtube.com', label: 'YouTube' },
              { icon: FaLinkedin, link: 'https://linkedin.com', label: 'LinkedIn' },
              { icon: FaFacebook, link: 'https://facebook.com', label: 'Facebook' },
              { icon: FaSlack, link: 'https://slack.com', label: 'Slack' },
              { icon: FaGlassMartiniAlt, link: 'https://martini.com', label: 'Martini' }
            ].map(({ icon: Icon, link, label }) => (
              <a
                key={label}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="hover:text-yellow-400 transform hover:scale-110 transition-all"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {['About', 'Contact Us', 'Terms & Conditions', 'Privacy Policy', 'FAQs'].map((item) => (
              <li key={item}>
                <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-yellow-400 transition">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Categories */}
        <div>
          <h4 className="font-semibold mb-2">Categories</h4>
          <ul className="space-y-2 text-sm">
            {['Electronics', 'Speakers', 'Watches', 'T-Shirts', 'Accessories', 'Household'].map((category) => (
              <li key={category}>
                <Link to={`/categories/${category.toLowerCase()}`} className="hover:text-yellow-400 transition">
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Newsletter */}
        <div>
          <h4 className="font-semibold mb-2">Newsletter</h4>
          <p className="text-sm mb-3">Subscribe to our newsletter to receive updates and exclusive offers.</p>
          <form onSubmit={handleNewsletterSubmit} className="space-y-2">
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded border text-sm text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                aria-label="Email for newsletter"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                className={`w-full mt-2 bg-yellow-400 text-gray-900 py-2 rounded hover:bg-yellow-500 transition ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
            {newsletterMessage && (
              <p className={`text-sm mt-2 ${
                newsletterMessage.includes('Thank you') ? 'text-green-400' : 'text-red-400'
              }`}>
                {newsletterMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
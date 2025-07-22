// src/components/Contact.jsx
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formMessage, setFormMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormMessage('Thank you for your message! We’ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } else {
      setFormMessage('Please fill out all fields.');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold">Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded text-gray-900"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-2 border rounded text-gray-900"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-semibold">Message</label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full p-2 border rounded text-gray-900"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Send Message
        </button>
        {formMessage && (
          <p className={`text-sm ${formData.name ? 'text-green-600' : 'text-red-600'}`}>
            {formMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default Contact;
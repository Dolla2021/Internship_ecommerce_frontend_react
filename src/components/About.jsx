import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-50 py-12 px-4 md:px-8 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">About Our Store</h1>

        <p className="text-gray-700 text-lg leading-relaxed mb-8 text-center">
          Welcome to <strong>YourShop</strong>, your number one source for quality and affordable products.
          We're dedicated to giving you the very best of fashion, electronics, and lifestyle items, with a focus on quality, customer service, and uniqueness.
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-purple-600">Our Mission</h3>
            <p className="text-gray-600 text-sm">
              We aim to bring the latest and most useful products to your doorstep with speed and satisfaction guaranteed.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-purple-600">Why Choose Us?</h3>
            <p className="text-gray-600 text-sm">
              Affordable pricing, secure payment, fast delivery, and top-notch customer support — we’re here to serve you.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-purple-600">Our Team</h3>
            <p className="text-gray-600 text-sm">
              A passionate group of developers, designers, and business professionals dedicated to your satisfaction.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions or feedback, feel free to contact us at{' '}
            <a href="mailto:support@yourshop.com" className="text-purple-600 underline">support@yourshop.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

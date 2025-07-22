import React from 'react';
const About = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">About Us</h2>
      <p className="text-gray-700 mb-4">
        Welcome to <span className="font-semibold">TULOS</span>, your one-stop shop for curated furniture collections. 
        At TULOS, we believe that your home should reflect your personal style and provide comfort for you and your loved ones.
      </p>
      <p className="text-gray-700 mb-4">
        Our mission is to provide high-quality furniture that transforms homes into havens of beauty and functionality. 
        We carefully select each piece to ensure it meets our high standards of quality, durability, and design.
      </p>
      <h3 className="text-2xl font-semibold mt-6 mb-4">Our Values</h3>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>Quality: We prioritize quality in every piece of furniture we offer.</li>
        <li>Style: Our collections blend modern trends with timeless designs.</li>
        <li>Affordability: We believe that beautiful furniture should be accessible to everyone.</li>
        <li>Customer Satisfaction: Our customers are at the heart of everything we do.</li>
      </ul>
      <h3 className="text-2xl font-semibold mt-6 mb-4">Our Story</h3>
      <p className="text-gray-700 mb-4">
        Founded in [Year], TULOS started with a simple idea: to make stylish furniture accessible to everyone. 
        Over the years, we have grown into a trusted brand known for our commitment to quality and customer service.
      </p>
      <p className="text-gray-700 mb-4">
        Our team is passionate about helping you create the home of your dreams. 
        Whether you are looking for a statement piece or functional furniture, we are here to guide you every step of the way.
      </p>
      <h3 className="text-2xl font-semibold mt-6 mb-4">Join Us on Our Journey</h3>
      <p className="text-gray-700 mb-4">
        Thank you for choosing TULOS. We invite you to explore our collections and find the perfect pieces for your home. 
        Together, let’s create spaces that inspire and bring joy.
      </p>
      <div className="mt-6">
        <h4 className="text-lg font-semibold">Connect with Us</h4>
        <p className="text-gray-700">Follow us on social media to stay updated on new arrivals, promotions, and design tips!</p>
        <ul className="flex space-x-4 mt-2">
          <li><a href="#" className="text-blue-500 hover:underline">Facebook</a></li>
          <li><a href="#" className="text-blue-500 hover:underline">Instagram</a></li>
          <li><a href="#" className="text-blue-500 hover:underline">Twitter</a></li>
        </ul>
      </div>
    </div>
  );
};
export default About;
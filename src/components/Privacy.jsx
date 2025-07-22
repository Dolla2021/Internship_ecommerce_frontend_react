import React from 'react';
const Privacy = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h2>
      
      <p className="text-gray-700 mb-4">
        At <span className="font-semibold">TULOS</span>, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website or make a purchase.
      </p>
      <h3 className="text-2xl font-semibold mt-6 mb-4">1. Information We Collect</h3>
      <p className="text-gray-700 mb-4">
        We may collect the following types of personal information:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>Name</li>
        <li>Email Address</li>
        <li>Shipping Address</li>
        <li>Billing Information</li>
        <li>Phone Number</li>
      </ul>
      <h3 className="text-2xl font-semibold mt-6 mb-4">2. How We Use Your Information</h3>
      <p className="text-gray-700 mb-4">
        Your information is used for the following purposes:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>To process and fulfill your orders.</li>
        <li>To communicate with you about your orders and provide customer support.</li>
        <li>To improve our website and services based on user feedback.</li>
        <li>To send promotional emails and newsletters (you can opt-out at any time).</li>
      </ul>
      <h3 className="text-2xl font-semibold mt-6 mb-4">3. Data Protection</h3>
      <p className="text-gray-700 mb-4">
        We implement a variety of security measures to maintain the safety of your personal information. Your data is stored on secure servers and is only accessible by authorized personnel.
      </p>
      <h3 className="text-2xl font-semibold mt-6 mb-4">4. Sharing Your Information</h3>
      <p className="text-gray-700 mb-4">
        We do not sell, trade, or otherwise transfer your personal information to outside parties without your consent, except to provide services you have requested or as required by law.
      </p>
      <h3 className="text-2xl font-semibold mt-6 mb-4">5. Your Rights</h3>
      <p className="text-gray-700 mb-4">
        You have the right to:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>Request access to the personal information we hold about you.</li>
        <li>Request correction of any inaccuracies in your personal information.</li>
        <li>Request deletion of your personal information.</li>
      </ul>
      <h3 className="text-2xl font-semibold mt-6 mb-4">6. Changes to This Privacy Policy</h3>
      <p className="text-gray-700 mb-4">
        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
      </p>
      <h3 className="text-2xl font-semibold mt-6 mb-4">7. Contact Us</h3>
      <p className="text-gray-700 mb-4">
        If you have any questions about this Privacy Policy, please contact us at <a href="mailto:info@furnitureshop.com" className="text-blue-500 hover:underline">info@furnitureshop.com</a>.
      </p>
      <p className="text-gray-700 mt-4">
        Thank you for choosing TULOS. We appreciate your trust in us to protect your personal information.
      </p>
    </div>
  );
};
export default Privacy;
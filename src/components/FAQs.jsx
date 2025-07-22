import React, { useState } from 'react';
const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    {
      question: "How can I pay for my appointment?",
      answer: "You can pay for your appointment using various methods, including credit/debit cards, PayPal, and other online payment options.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      question: "What can I expect at my first consultation?",
      answer: "During your first consultation, we will discuss your needs and expectations, and we may perform a preliminary assessment.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      question: "What are your opening hours?",
      answer: "Our opening hours are Monday to Friday, 9 AM to 5 PM. We are closed on weekends.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      question: "Do I need a referral?",
      answer: "No, a referral is not required. You can book an appointment directly.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      question: "Is the cost of the appointment covered by private health insurance?",
      answer: "Coverage depends on your specific insurance plan. Please check with your insurance provider for details.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
  ];
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <section className="bg-white">
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl">FAQ's</h1>
        <hr className="my-6 border-gray-200" />
        <div>
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                className="flex items-center focus:outline-none w-full"
                onClick={() => toggleFAQ(index)}
              >
                <svg
                  className="flex-shrink-0 w-6 h-6 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="square" strokeLinejoin="round" strokeWidth="1" d="M20 12H4"></path>
                </svg>
                <h1 className="mx-4 text-xl text-gray-700">{faq.question}</h1>
              </button>
              {openIndex === index && (
                <div className="flex mt-4 md:mx-10">
                  <span className="border border-blue-500"></span>
                  <p className="max-w-3xl px-4 text-gray-500">
                    {faq.answer}
                  </p>
                </div>
              )}
              <hr className="my-8 border-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default FAQs;
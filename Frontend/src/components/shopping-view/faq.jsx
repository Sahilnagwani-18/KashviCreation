import React, { useState } from "react";

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What types of sarees does Kashvi Creation offer?",
      answer:
        "Kashvi Creation offers a wide range of sarees, including traditional silk sarees, designer sarees, bridal sarees, and casual wear sarees. Each piece is crafted with precision and elegance to suit every occasion.",
    },
    {
      question: "How can I place an order on Kashvi Creation?",
      answer:
        "You can place an order directly through our website by browsing our collection, selecting your favorite saree, and proceeding to checkout. For any assistance, feel free to contact our customer support team.",
    },
    {
      question: "Do you offer customization for sarees?",
      answer:
        "Yes, we offer customization services for sarees. You can choose specific fabrics, colors, and designs to create a saree that matches your unique style. Contact us for more details.",
    },
    {
      question: "What is the delivery time for orders?",
      answer:
        "The delivery time depends on your location and the availability of the product. Typically, orders are delivered within 5-7 business days. For custom orders, it may take up to 2-3 weeks.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods, including credit/debit cards, net banking, UPI, and cash on delivery (COD) for select regions.",
    },
    {
      question: "How do I care for my saree to ensure its longevity?",
      answer:
        "To maintain the beauty of your saree, dry clean silk and heavily embroidered sarees. For cotton and casual wear sarees, gentle hand washing is recommended. Always store your sarees in a cool, dry place.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we offer international shipping. Shipping charges and delivery times vary based on the destination. Please contact us for more details.",
    },
    {
      question: "What is your return and exchange policy?",
      answer:
        "We offer a hassle-free return and exchange policy within 7 days of delivery. The product must be unused and in its original packaging. Please refer to our Returns & Exchanges page for more details.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12">
      <div className="max-w-4xl mx-auto p-6">
        {/* Animated Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800 animate-bounce">
          Frequently Asked Questions
        </h1>

        {/* Accordion Items */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <button
                onClick={() => handleToggle(index)}
                className="w-full flex justify-between items-center p-6 focus:outline-none"
              >
                <span className="text-lg font-medium text-gray-700">
                  {item.question}
                </span>
                <span
                  className={`text-gray-500 transform transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  activeIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-6 text-gray-600">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
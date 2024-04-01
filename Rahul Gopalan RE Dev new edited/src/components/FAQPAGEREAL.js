import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./FAQ.css";

const FAQs = [
  {
    id: 1,
    question: "What is a real estate website?",
    answer:
      "A real estate website is a platform where you can search, buy, sell, or rent properties. Our website offers a wide range of properties for sale or rent, along with valuable information and resources for home buyers, sellers, and renters.",
  },
  {
    id: 2,
    question: "How do I search for properties on your site?",
    answer:
      "To search for properties on our site, simply enter your desired location, price range, and property type in the search bar. You can also use filters to narrow down your search and find the perfect property that fits your needs.",
  },
  {
    id: 3,
    question: "How do I contact a real estate agent?",
    answer:
      "To contact a real estate agent, navigate to the property listing you are interested in and click on the 'Contact Agent' button. Fill out the contact form, and an agent will get back to you as soon as possible.",
  },
  {
    id: 4,
    question: "What are the benefits of using your site?",
    answer:
      "Our site offers numerous benefits, including a large database of properties, detailed property information, the ability to contact agents directly, and various resources for home buyers, sellers, and renters.",
  },
  {
    id: 5,
    question: "How do I create an account on your site?",
    answer:
      "To create an account on our site, click on the 'Sign Up' button in the top right corner of the homepage. Fill out the registration form with your information and follow the instructions to complete your account creation.",
  },
  {
    id: 6,
    question: "How do I reset my password?",
    answer:
      "If you need to reset your password, click on the 'Forgot Password?' link on the login page. Enter your email address, and we will send you a link to reset your password.",
  },
  {
    id: 7,
    question: "Can I save properties for later?",
    answer:
      "Yes, you can save properties for later by clicking on the 'Save' button on the property listing. The property will be saved to your account, and you can access it at any time from your 'Saved Properties' list.",
  },
  {
    id: 8,
    question: "How do I make an offer on a property?",
    answer:
      "To make an offer on a property, first, ensure you have created an account on our site. Then, navigate to the property listing and click on the 'Make an Offer' button. Fill out the details so as to be verified"
  },
  {
    id: 9,
    question: "What are the steps to sell a property?",
    answer:
      "The steps to sell a property include determining the property's value, preparing it for sale, listing it on the market, negotiating offers, and closing the sale. Your real estate agent will assist you throughout the process to ensure a smooth and successful transaction.",
  },
];



const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      {FAQs.map((faq, index) => (
        <div
          key={faq.id}
          className={`faq-item ${index === activeIndex ? "active" : ""}`}
          onClick={() => toggleAnswer(index)}
        >
          <div className="faq-question">
            <span className="question">Q: {faq.question}</span>
            <span className="toggle-icon">
              {index === activeIndex ? "-" : "+"}
            </span>
          </div>
          <div className="faq-answer">{faq.answer}</div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
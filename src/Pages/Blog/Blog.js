import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Blog = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="my-8 p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      {/* Question 1 */}
      <div className="border-b border-gray-300 pb-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleAccordion(0)}
        >
          <h3
            className={`text-xl font-semibold transition-colors duration-200 ${
              activeIndex === 0 ? "text-blue-600" : "text-gray-800"
            }`}
          >
            1.How do I sell my phone on this website?
          </h3>
          <ExpandMoreIcon
            className={`transition-transform duration-200 ${
              activeIndex === 0 ? "rotate-180" : ""
            }`}
          />
        </div>
        {activeIndex === 0 && (
          <p className="mt-3 text-gray-700">
            To sell your phone, simply create an account, list your phone by
            providing the necessary details such as the model, condition, price,
            and photos, and post the listing. Interested buyers can then contact
            you through the platform, and you can arrange the sale.
          </p>
        )}
      </div>

      {/* Question 2 */}
      <div className="border-b border-gray-300 py-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleAccordion(1)}
        >
          <h3
            className={`text-xl font-semibold transition-colors duration-200 ${
              activeIndex === 1 ? "text-blue-600" : "text-gray-800"
            }`}
          >
            2. How can I be sure the phone I’m buying is in good condition?
          </h3>
          <ExpandMoreIcon
            className={`transition-transform duration-200 ${
              activeIndex === 1 ? "rotate-180" : ""
            }`}
          />
        </div>
        {activeIndex === 1 && (
          <p className="mt-3 text-gray-700">
            Each seller is required to provide detailed information about the
            phone's condition, including any damages or issues. We encourage
            buyers to ask the seller for additional photos or to inspect the
            device in person before completing the purchase. You can also check
            the reviews of the seller for added confidence.
          </p>
        )}
      </div>

      {/* Question 3 */}
      <div className="border-b border-gray-300 py-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleAccordion(2)}
        >
          <h3
            className={`text-xl font-semibold transition-colors duration-200 ${
              activeIndex === 2 ? "text-blue-600" : "text-gray-800"
            }`}
          >
            3. What payment methods are supported?
          </h3>
          <ExpandMoreIcon
            className={`transition-transform duration-200 ${
              activeIndex === 2 ? "rotate-180" : ""
            }`}
          />
        </div>
        {activeIndex === 2 && (
          <p className="mt-3 text-gray-700">
            We support secure payment methods, stripe.The available payment
            options will be displayed when you check out.
          </p>
        )}
      </div>

      {/* Question 4 */}
      <div className="py-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleAccordion(3)}
        >
          <h3
            className={`text-xl font-semibold transition-colors duration-200 ${
              activeIndex === 3 ? "text-blue-600" : "text-gray-800"
            }`}
          >
            4. Can I return the phone if it’s not as described?
          </h3>
          <ExpandMoreIcon
            className={`transition-transform duration-200 ${
              activeIndex === 3 ? "rotate-180" : ""
            }`}
          />
        </div>
        {activeIndex === 3 && (
          <p className="mt-3 text-gray-700">
            Yes, if the phone you receive is not as described or is defective,
            you can initiate a return or refund within the stipulated period. Be
            sure to read the return policy on the product page before
            purchasing.
          </p>
        )}
      </div>
    </div>
  );
};

export default Blog;


import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What time should guests arrive?",
    answer: "We recommend guests arrive 30 minutes before the ceremony starts to allow time for seating."
  },
  {
    question: "Is there a dress code?",
    answer: "Yes, we request semi-formal attire. Ladies in dresses or elegant pantsuits, and gentlemen in suits or blazers with dress pants."
  },
  {
    question: "Will the ceremony and reception be indoors or outdoors?",
    answer: "The ceremony will be held outdoors in the garden area, while the reception will take place in the main hall."
  },
  {
    question: "Can I bring a plus one?",
    answer: "Due to venue capacity, we can only accommodate the guests named on your invitation. Please refer to your invitation for details."
  },
  {
    question: "Will there be vegetarian/vegan options available?",
    answer: "Yes, we will have vegetarian and vegan options available. Please indicate your dietary preferences in the RSVP form."
  },
  {
    question: "Is the venue wheelchair accessible?",
    answer: "Yes, the venue is wheelchair accessible. If you have any specific accessibility requirements, please let us know in advance."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="wedding-container">
      <h2 className="section-title">Frequently Asked Questions</h2>
      
      <div className="max-w-3xl mx-auto divide-y">
        {faqs.map((faq, index) => (
          <div key={index} className="py-6">
            <button
              className="flex w-full justify-between items-center text-left"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-medium text-wedding-text">{faq.question}</h3>
              <span>
                {openIndex === index ? (
                  <Minus className="h-5 w-5 text-wedding-primary" />
                ) : (
                  <Plus className="h-5 w-5 text-wedding-primary" />
                )}
              </span>
            </button>
            
            {openIndex === index && (
              <div className="mt-3 text-wedding-text">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;

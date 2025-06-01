import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-6">
      <button 
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-2xl font-bold text-gray-800">{question}</span>
        {isOpen ? (
          <ChevronUp className="text-blue-500" size={32} />
        ) : (
          <ChevronDown className="text-blue-500" size={32} />
        )}
      </button>
      {isOpen && (
        <div 
          className="mt-4 text-2xl text-gray-600 pr-8 animate-fadeIn"
          aria-hidden={!isOpen}
        >
          {answer}
        </div>
      )}
    </div>
  );
};

export default FAQItem;
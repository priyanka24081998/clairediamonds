"use client";

import { useState } from "react";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";

const Currency: React.FC = () => {
  const [currency, setCurrency] = useState<string>("INR");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const currencyFlags: Record<string, string> = {
    AUD: "/assets/aus-flag.png",
    USD: "/assets/usa-flag.png", 
    CAD: "/assets/can-flag.png",
    UK: "/assets/uk-flag.png", 
    EUR: "/assets/european-union.png", 
    INR: "/assets/india-flag.png", 
  };

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative inline-block">
      
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center text-[#9f7d48] font-cinzel bg-white px-[5px] rounded-lg border-2 border-[#9f7d48] focus:outline-none"
      >
        <Image
          src={currencyFlags[currency]}
          alt={currency}
          width={20}
          height={16}
          className="mr-2"
        />
        {currency}
        <FaChevronDown className="ml-2 text-xs" />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 shadow-lg rounded-md max-h-36 overflow-y-auto z-[200]">
          {Object.entries(currencyFlags).map(([code, flag]) => (
            <button
              key={code}
              onClick={() => handleCurrencyChange(code)}
              className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 text-sm"
            >
              <Image src={`${flag}`} alt={code} width={20} height={16} className="mr-2" />
              <span>{code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Currency;

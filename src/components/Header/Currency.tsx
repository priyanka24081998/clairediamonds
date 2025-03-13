'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaChevronDown } from 'react-icons/fa';
import { getLocation } from '@/lib/getLocation';
import { currencyMap } from '@/lib/currencyMap';

const currencyFlags: Record<string, string> = {
  AUD: '/assets/aus-flag.png',
  USD: '/assets/usa-flag.png',
  CAD: '/assets/can-flag.png',
  UK: '/assets/uk-flag.png',
  EUR: '/assets/european-union.png',
  INR: '/assets/india-flag.png',
};

const Currency: React.FC = () => {
  const [currency, setCurrency] = useState<string>('INR');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // ✅ 1. Fetch location and set currency based on the location
  useEffect(() => {
    async function fetchCurrency() {
      const savedCurrency = localStorage.getItem('currency');
      if (savedCurrency) {
        setCurrency(savedCurrency);
      } else {
        const location = await getLocation();
        if (location?.country && location.country in currencyMap) {
          const detectedCurrency = currencyMap[location.country as keyof typeof currencyMap] || 'USD';
          setCurrency(detectedCurrency);
          localStorage.setItem('currency', detectedCurrency);
        }
      }
    }
    fetchCurrency();
  }, []);
  

  // ✅ 2. Handle currency change
  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    localStorage.setItem('currency', newCurrency);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative inline-block">
      {/* Current Currency Button */}
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
              className={`flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 text-sm ${
                currency === code ? 'bg-gray-100' : ''
              }`}
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

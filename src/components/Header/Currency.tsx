"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";
import { getLocation } from "@/lib/getLocation";
import { currencyMap } from "@/lib/currencyMap";

const currencyFlags: Record<string, { flag: string; country: string }> = {
  AUD: { flag: "/assets/aus-flag.png", country: "Australia" },
  USD: { flag: "/assets/usa-flag.png", country: "United States" },
  CAD: { flag: "/assets/can-flag.png", country: "Canada" },
  GBP: { flag: "/assets/uk-flag.png", country: "United Kingdom" },
  EUR: { flag: "/assets/european-union.png", country: "European Union" },
  INR: { flag: "/assets/india-flag.png", country: "India" },
  JPY: { flag: "/assets/japan.png", country: "Japan" },
  CNY: { flag: "/assets/china.png", country: "China" },
  CHF: { flag: "/assets/switzerland.png", country: "Switzerland" },
  SEK: { flag: "/assets/sweden.png", country: "Sweden" },
  NOK: { flag: "/assets/norway.png", country: "Norway" },
  BRL: { flag: "/assets/brazil.png", country: "Brazil" },
  ZAR: { flag: "/assets/south-africa.png", country: "South Africa" },
 
  AOA: { flag: "/assets/japan.png", country: "Angola" },
  XCD: { flag: "/assets/japan.png", country: "Antigua and Barbuda" },
  ARS: { flag: "/assets/japan.png", country: "Argentina" },
  AMD: { flag: "/assets/japan.png", country: "Armenia" },
  BSD: { flag: "/assets/japan.png", country: "Bahamas" },
  BYN: { flag: "/assets/japan.png", country: "Belarus" },
  BTN: { flag: "/assets/japan.png", country: "Bhutan" },
  BOB: { flag: "/assets/japan.png", country: "Bolivia" },
  BWP: { flag: "/assets/japan.png", country: "Botswana" }, //stopped here
  BGN: { flag: "/assets/japan.png", country: "Bulgaria" },
  BIF: { flag: "/assets/japan.png", country: "Burundi" },
  CVE: { flag: "/assets/japan.png", country: "Cabo Verde" },
  KHR: { flag: "/assets/japan.png", country: "Cambodia" },
  CLP: { flag: "/assets/japan.png", country: "Chile" },
  COP: { flag: "/assets/japan.png", country: "Colombia" },
  CDF: { flag: "/assets/japan.png", country: "Congo" },
  CRC: { flag: "/assets/japan.png", country: "Costa Rica" },
  HRK: { flag: "/assets/japan.png", country: "Croatia" },
  CUP: { flag: "/assets/japan.png", country: "Cuba" },
  CZK: { flag: "/assets/japan.png", country: "Czech Republic" },
  DKK: { flag: "/assets/japan.png", country: "Denmark" },
  DOP: { flag: "/assets/japan.png", country: "Dominican Republic" },
  ERN: { flag: "/assets/japan.png", country: "Eritrea" },
  SZL: { flag: "/assets/japan.png", country: "Eswatini" },
  ETB: { flag: "/assets/japan.png", country: "Ethiopia" },
  FJD: { flag: "/assets/japan.png", country: "Fiji" },
  GEL: { flag: "/assets/japan.png", country: "Georgia" },
  GHS: { flag: "/assets/japan.png", country: "Ghana" },
  GTQ: { flag: "/assets/japan.png", country: "Guatemala" },
  GYD: { flag: "/assets/japan.png", country: "Guyana" },
  HTG: { flag: "/assets/japan.png", country: "Haiti" },
  HNL: { flag: "/assets/japan.png", country: "Honduras" },
  HUF: { flag: "/assets/japan.png", country: "Hungary" },
  ISK: { flag: "/assets/japan.png", country: "Iceland" },
  ILS: { flag: "/assets/japan.png", country: "Israel" },
  JMD: { flag: "/assets/japan.png", country: "Jamaica" },
  KZT: { flag: "/assets/japan.png", country: "Kazakhstan" },
  KES: { flag: "/assets/japan.png", country: "Kenya" },
  KPW: { flag: "/assets/japan.png", country: "Korea, North" },
  KRW: { flag: "/assets/japan.png", country: "Korea, South" },
  KWD: { flag: "/assets/japan.png", country: "Kuwait" },
  LAK: { flag: "/assets/japan.png", country: "Laos" },
  LBP: { flag: "/assets/japan.png", country: "Lebanon" },
  LSL: { flag: "/assets/japan.png", country: "Lesotho" },
  LRD: { flag: "/assets/japan.png", country: "Liberia" },
  MGA: { flag: "/assets/japan.png", country: "Madagascar" },
  MWK: { flag: "/assets/japan.png", country: "Malawi" },
  MYR: { flag: "/assets/japan.png", country: "Malaysia" },
  MVR: { flag: "/assets/japan.png", country: "Maldives" },
  MUR: { flag: "/assets/japan.png", country: "Mauritius" },
  MXN: { flag: "/assets/japan.png", country: "Mexico" },
  MDL: { flag: "/assets/japan.png", country: "Moldova" },
  MNT: { flag: "/assets/japan.png", country: "Mongolia" },
  MAD: { flag: "/assets/japan.png", country: "Morocco" },
  MZN: { flag: "/assets/japan.png", country: "Mozambique" },
  MMK: { flag: "/assets/japan.png", country: "Myanmar" },
  NAD: { flag: "/assets/japan.png", country: "Namibia" },
  NPR: { flag: "/assets/japan.png", country: "Nepal" },
  NZD: { flag: "/assets/japan.png", country: "New Zealand" },
  NIO: { flag: "/assets/japan.png", country: "Nicaragua" },
  MKD: { flag: "/assets/japan.png", country: "North Macedonia" },
  OMR: { flag: "/assets/japan.png", country: "Oman" },
  PKR: { flag: "/assets/japan.png", country: "Pakistan" },
  PAB: { flag: "/assets/japan.png", country: "Panama" },
  PGK: { flag: "/assets/japan.png", country: "Papua New Guinea" },
  PYG: { flag: "/assets/japan.png", country: "Paraguay" },
  PEN: { flag: "/assets/japan.png", country: "Peru" },
  PHP: { flag: "/assets/japan.png", country: "Philippines" },
  PLN: { flag: "/assets/japan.png", country: "Poland" },
  QAR: { flag: "/assets/japan.png", country: "Qatar" },
  RON: { flag: "/assets/japan.png", country: "Romania" },
  RUB: { flag: "/assets/japan.png", country: "Russia" },
  RWF: { flag: "/assets/japan.png", country: "Rwanda" },
  WST: { flag: "/assets/japan.png", country: "Samoa" },
  STN: { flag: "/assets/japan.png", country: "Sao Tome and Principe" },
  RSD: { flag: "/assets/japan.png", country: "Serbia" },
  SCR: { flag: "/assets/japan.png", country: "Seychelles" },
  SLL: { flag: "/assets/japan.png", country: "Sierra Leone" },
  SGD: { flag: "/assets/japan.png", country: "Singapore" },
  SBD: { flag: "/assets/japan.png", country: "Solomon Islands" },
  LKR: { flag: "/assets/japan.png", country: "Sri Lanka" },
  SRD: { flag: "/assets/japan.png", country: "Suriname" },
  TZS: { flag: "/assets/japan.png", country: "Tanzania" },
  THB: { flag: "/assets/japan.png", country: "Thailand" },
  XOF: { flag: "/assets/japan.png", country: "Togo" },
  TOP: { flag: "/assets/japan.png", country: "Tonga" },
  TTD: { flag: "/assets/japan.png", country: "Trinidad and Tobago" },
  TRY: { flag: "/assets/japan.png", country: "Turkey" },
  UGX: { flag: "/assets/japan.png", country: "Uganda" },
  AED: { flag: "/assets/japan.png", country: "United Arab Emirates" },
  UYU: { flag: "/assets/japan.png", country: "Uruguay" },
  VUV: { flag: "/assets/japan.png", country: "Vanuatu" },
  VES: { flag: "/assets/japan.png", country: "Venezuela" },
  VND: { flag: "/assets/japan.png", country: "Vietnam" },
  ZMW: { flag: "/assets/japan.png", country: "Zambia" },
  ZWL: { flag: "/assets/japan.png", country: "Zimbabwe" },
};

const Currency: React.FC = () => {
  const [currency, setCurrency] = useState<string>("INR");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // ✅ 1. Fetch location and set currency based on the location
  useEffect(() => {
    async function fetchCurrency() {
      const savedCurrency = localStorage.getItem("currency");
      if (savedCurrency) {
        setCurrency(savedCurrency);
      } else {
        const location = await getLocation();
        if (location?.country && location.country in currencyMap) {
          const detectedCurrency =
            currencyMap[location.country as keyof typeof currencyMap] || "USD";
          setCurrency(detectedCurrency);
          localStorage.setItem("currency", detectedCurrency);
        }
      }
    }
    fetchCurrency();
  }, []);

  // ✅ 2. Handle currency change
  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    localStorage.setItem("currency", newCurrency);
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
          src={currencyFlags[currency].flag}
          alt={currency}
          width={20}
          height={16}
        />
        <span >{currencyFlags[currency].country}</span>
        <FaChevronDown className="ml-2 text-xs" />
      </button>
      
      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 shadow-lg rounded-md max-h-60 overflow-y-auto z-[200]">
          {Object.values(currencyMap).map((code) => (
            <button
              key={code}
              onClick={() => handleCurrencyChange(code)}
              className={`flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 text-sm ${
                currency === code ? "bg-gray-100" : ""
              }`}
            >
              {currencyFlags[code] ? (
                <>
                  <Image
                    src={currencyFlags[code].flag}
                    alt={code}
                    width={20}
                    height={16}
                    className="mr-2"
                  />
                  <span>{currencyFlags[code].country}</span>
                </>
              ) : (
                <span>{code}</span> // Fallback if the currency code is missing from currencyFlags
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Currency;

"use client";

import { useState, useEffect } from "react";
import { useRef } from "react";
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
 
  AOA: { flag: "/assets/Angola.png", country: "Angola" },
  XCD: { flag: "/assets/antigua-and-barbuda.png", country: "Antigua and Barbuda" },
  ARS: { flag: "/assets/Argentina.png", country: "Argentina" },
  AMD: { flag: "/assets/Armenia.png", country: "Armenia" },
  BSD: { flag: "/assets/Bahamas.png", country: "Bahamas" },
  BYN: { flag: "/assets/Belarus.png", country: "Belarus" },
  BTN: { flag: "/assets/Bhutan.png", country: "Bhutan" },
  BOB: { flag: "/assets/Bolivia.png", country: "Bolivia" },
  BWP: { flag: "/assets/botswana.png", country: "Botswana" }, //stopped here
  BGN: { flag: "/assets/bulgaria.png", country: "Bulgaria" },
  BIF: { flag: "/assets/burundi.png", country: "Burundi" },
  CVE: { flag: "/assets/cape-verde.png", country: "Cabo Verde" },
  KHR: { flag: "/assets/Cambodia.png", country: "Cambodia" },
  CLP: { flag: "/assets/chile.png", country: "Chile" },
  COP: { flag: "/assets/colombia.png", country: "Colombia" },
  CDF: { flag: "/assets/congo.png", country: "Congo" },
  CRC: { flag: "/assets/costa-rica.png", country: "Costa Rica" },
  HRK: { flag: "/assets/croatia.png", country: "Croatia" },
  CUP: { flag: "/assets/cuba.png", country: "Cuba" },
  CZK: { flag: "/assets/czech-republic.png", country: "Czech Republic" },
  DKK: { flag: "/assets/denmark.png", country: "Denmark" },
  DOP: { flag: "/assets/dominican-republic.png", country: "Dominican Republic" },
  ERN: { flag: "/assets/eritrea.png", country: "Eritrea" },
  SZL: { flag: "/assets/eswatini.png", country: "Eswatini" },
  ETB: { flag: "/assets/ethiopia.png", country: "Ethiopia" },
  FJD: { flag: "/assets/fiji.png", country: "Fiji" },
  GEL: { flag: "/assets/georgia.png", country: "Georgia" },
  GHS: { flag: "/assets/ghana.png", country: "Ghana" },
  GTQ: { flag: "/assets/guatemala.png", country: "Guatemala" },
  GYD: { flag: "/assets/guyana.png", country: "Guyana" },
  HTG: { flag: "/assets/haiti.png", country: "Haiti" },
  HNL: { flag: "/assets/honduras.png", country: "Honduras" },
  HUF: { flag: "/assets/hungary.png", country: "Hungary" },
  ISK: { flag: "/assets/iceland.png", country: "Iceland" },
  ILS: { flag: "/assets/israel.png", country: "Israel" },
  JMD: { flag: "/assets/jamaica.png", country: "Jamaica" },
  KES: { flag: "/assets/Kenya.png", country: "Kenya" },
  KPW: { flag: "/assets/north-korea.png", country: "Korea, North" },
  KRW: { flag: "/assets/south-korea.png", country: "Korea, South" },
  KWD: { flag: "/assets/kuwait.png", country: "Kuwait" },
  LAK: { flag: "/assets/laos.png", country: "Laos" },
  LBP: { flag: "/assets/lebanon.png", country: "Lebanon" },
  LSL: { flag: "/assets/lesotho.png", country: "Lesotho" },
  LRD: { flag: "/assets/liberia.png", country: "Liberia" },
  MGA: { flag: "/assets/madagascar.png", country: "Madagascar" },
  MWK: { flag: "/assets/malawi.png", country: "Malawi" },
  MYR: { flag: "/assets/malaysia.png", country: "Malaysia" },
  MVR: { flag: "/assets/maldives.png", country: "Maldives" },
  MUR: { flag: "/assets/mauritius.png", country: "Mauritius" },
  MXN: { flag: "/assets/mexico.png", country: "Mexico" },
  MDL: { flag: "/assets/moldova.png", country: "Moldova" },
  MNT: { flag: "/assets/mongolia.png", country: "Mongolia" },
  MAD: { flag: "/assets/morocco.png", country: "Morocco" },
  MMK: { flag: "/assets/myanmar.png", country: "Myanmar" },
  NAD: { flag: "/assets/namibia.png", country: "Namibia" },
  NPR: { flag: "/assets/nepal.png", country: "Nepal" },
  NZD: { flag: "/assets/new-zealand.png", country: "New Zealand" },
  NIO: { flag: "/assets/nicaragua.png", country: "Nicaragua" },
  MKD: { flag: "/assets/north-macedonia.png", country: "North Macedonia" },
  OMR: { flag: "/assets/oman.png", country: "Oman" },
  PKR: { flag: "/assets/pakistan.png", country: "Pakistan" },
  PAB: { flag: "/assets/panama.png", country: "Panama" },
  PGK: { flag: "/assets/papua-new-guinea.png", country: "Papua New Guinea" },
  PYG: { flag: "/assets/paraguay.png", country: "Paraguay" },
  PEN: { flag: "/assets/Peru.png", country: "Peru" },
  PHP: { flag: "/assets/philippines.png", country: "Philippines" },
  PLN: { flag: "/assets/poland.png", country: "Poland" },
  QAR: { flag: "/assets/qatar.png", country: "Qatar" },
  RON: { flag: "/assets/romania.png", country: "Romania" },
  RUB: { flag: "/assets/russia.png", country: "Russia" },
  RWF: { flag: "/assets/rwanda.png", country: "Rwanda" },
  WST: { flag: "/assets/samoa.png", country: "Samoa" },
  STN: { flag: "/assets/sao-tome-and-principe.png", country: "Sao Tome and Principe" },
  RSD: { flag: "/assets/serbia.png", country: "Serbia" },
  SCR: { flag: "/assets/seychelles.png", country: "Seychelles" },
  SLL: { flag: "/assets/sierra-leone.png", country: "Sierra Leone" },
  SGD: { flag: "/assets/singapore.png", country: "Singapore" },
  SBD: { flag: "/assets/solomon-islands.png", country: "Solomon Islands" },
  LKR: { flag: "/assets/sri-lanka.png", country: "Sri Lanka" },
  SRD: { flag: "/assets/suriname.png", country: "Suriname" },
  TZS: { flag: "/assets/tanzania.png", country: "Tanzania" },
  THB: { flag: "/assets/thailand.png", country: "Thailand" },
  XOF: { flag: "/assets/togo.png", country: "Togo" },
  TOP: { flag: "/assets/tonga.png", country: "Tonga" },
  TTD: { flag: "/assets/trinidad-and-tobago.png", country: "Trinidad and Tobago" },
  TRY: { flag: "/assets/turkey.png", country: "Turkey" },
  UGX: { flag: "/assets/uganda.png", country: "Uganda" },
  AED: { flag: "/assets/united-arab-emirates.png", country: "United Arab Emirates" },
  UYU: { flag: "/assets/uruguay.png", country: "Uruguay" },
  VUV: { flag: "/assets/vanuatu.png", country: "Vanuatu" },
  VES: { flag: "/assets/venezuela.png", country: "Venezuela" },
  VND: { flag: "/assets/vietnam.png", country: "Vietnam" },
  ZMW: { flag: "/assets/zambia.png", country: "Zambia" },
  ZWL: { flag: "/assets/zimbabwe.png", country: "Zimbabwe" },
};

const Currency: React.FC = () => {
  const [currency, setCurrency] = useState<string>("INR");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ 1. Fetch location and set currency based on the location
  useEffect(() => {
    async function fetchCurrency() {
      const savedCurrency = localStorage.getItem("currency");
      if (savedCurrency) {
        console.log("Using saved currency:", savedCurrency);
        setCurrency(savedCurrency);
      } else {
        const location = await getLocation();
       
        console.log("Detected location:", location); // ✅ Check location data
  
        if (location?.country && location.country in currencyMap) {
          const detectedCurrency =
            currencyMap[location.country as keyof typeof currencyMap] || "USD";
            
          console.log("Detected currency based on location:", detectedCurrency); // ✅ Check detected currency
          setCurrency(detectedCurrency);
          localStorage.setItem("currency", detectedCurrency);
        } else {
          console.log("Location not detected or currency not mapped. Using default currency: USD");
          setCurrency("USD");
        }
      }
    }
    fetchCurrency();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false); // 👈 Close dropdown
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ✅ 2. Handle currency change
  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    localStorage.setItem("currency", newCurrency);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
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

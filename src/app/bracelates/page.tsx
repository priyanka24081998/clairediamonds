"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Philosopher } from "next/font/google";

import { getLocation } from "@/lib/getLocation";      // ✅ FIXED
import { convertCurrency } from "@/lib/convertCurrency";
import { currencyMap } from "@/lib/currencyMap";
import { currencySymbol } from "@/lib/currencySymbol";       // ✅ FIXED

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface Product {
  _id: string;
  name: string;
  images: string[];
  videos: string[];
  description: string;

  price?: Record<string, number>; // simplify price object

  categoryId: {
    _id: string;
    categoryName: string;
  };
  subCategoryId: {
    _id: string;
    subCategoryName: string;
  };
}

const Bracelates = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currency, setCurrency] = useState("USD");
  const [convertedPrices, setConvertedPrices] = useState<Record<string, number>>({}); // store converted prices

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://claireapi.onrender.com/product/");

      if (response.data && Array.isArray(response.data.data)) {
        const filtered = response.data.data.filter(
          (item: Product) =>
            item?.categoryId?.categoryName?.toLowerCase() === "Bracelets"
        );

        setProducts(filtered);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  // 👉 1. Load Products
  useEffect(() => {
    fetchProducts();
  }, []);

  // 👉 2. Detect User Country + Currency
  useEffect(() => {
    async function loadCurrency() {
      const loc = await getLocation();

      if (loc) {
        const mapped = currencyMap[loc.country] || loc.currency || "USD";
        setCurrency(mapped);
      }
    }

    loadCurrency();
  }, []);

  // 👉 3. Convert every product price to detected currency
  useEffect(() => {
    async function convertAllPrices() {
      const output: Record<string, number> = {};

      for (const p of products) {
        // use "silver" as main price (or your logic)
        const basePrice = p.price?.silver || 0;

        const converted = await convertCurrency(basePrice, "USD", currency);
        output[p._id] = converted;
      }

      setConvertedPrices(output);
    }

    if (products.length > 0 && currency) {
      convertAllPrices();
    }
  }, [products, currency]);

  return (
    <div className="pt-4 md:pt-10 container mx-auto bg-white">
      <h2
        className={`text-[20px] md:text-3xl text-[#43825c] text-center font-bold mb-2 ${philosopher.className}`}
      >
        Bracelets
        <Image
          src="/assets/divider.png"
          alt="line"
          width={1200}
          height={800}
          className="w-[100px] h-[10px] md:w-[150px] md:h-[15px] mt-4 mx-auto"
        />
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-8 py-4 lg:py-10 mx-auto">
        {products.length > 0 ? (
          products.map((product) => (
            <Link key={product._id} href={`/products/${product._id}`}>
              <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 border border-gray-100 cursor-pointer">

                <div className="overflow-hidden rounded-xl">
                  <Image
                    src={product.images?.[0] || "/placeholder.jpg"}
                    alt={product.name}
                    width={600}
                    height={400}
                    className="w-full h-[150px] lg:h-[260px] object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                </div>

                <div className="mt-4">
                  <h2 className={`${philosopher.className} capitalize text-[#9f7d48] text-[14px] md:text-[18px] font-semibold group-hover:text-[#43825c] transition-colors truncate`}>
                    {product.name}
                  </h2>

                  <p className={`${philosopher.className} text-[#43825c] font-bold text-lg mt-3`}>
                    {convertedPrices[product._id] ? (
                      <span>
                        {currencySymbol[currency] ? currencySymbol[currency] : currency}
                        {" "}
                        {convertedPrices[product._id].toFixed(2)}
                      </span>
                    ) : (
                      <span>
                        {currencySymbol["USD"] ? currencySymbol["USD"] : "USD"}
                        {" "}
                        {product.price?.silver?.toFixed(2) || "0.00"}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Bracelates;

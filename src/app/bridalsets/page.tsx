"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Philosopher } from "next/font/google";

import { convertCurrency } from "@/lib/convertCurrency";
import { currencySymbol } from "@/lib/currencySymbol";
import { getLocation } from "@/lib/getLocation";
import { currencyMap } from "@/lib/currencyMap";

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
  price?: Record<string, number>;
  categoryId: {
    _id: string;
    categoryName: string;
  };
  subCategoryId: {
    _id: string;
    subCategoryName: string;
  };
}

const Bridalsets = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [convertedPrices, setConvertedPrices] = useState<Record<string, number>>({});
  const [currency, setCurrency] = useState<string>("USD");

  // Fetch products once
  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://claireapi.onrender.com/product/");
      if (response.data && Array.isArray(response.data.data)) {
        const filtered = response.data.data.filter(
          (item: Product) =>
            item?.categoryId?.categoryName?.toLowerCase() === "bridal sets"
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

  useEffect(() => {
    fetchProducts();
  }, []);

  // Detect initial currency from localStorage or user location
  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency");

    if (savedCurrency) {
      setCurrency(savedCurrency);
    } else {
      // Only call getLocation if no saved currency
      (async () => {
        const loc = await getLocation();
        const detectedCurrency = loc ? currencyMap[loc.country] || loc.currency || "USD" : "USD";
        setCurrency(detectedCurrency);
        localStorage.setItem("currency", detectedCurrency);
      })();
    }
  }, []);

  // Convert prices whenever products or currency changes
  useEffect(() => {
    if (products.length === 0) return;

    const convertAllPrices = async () => {
      const output: Record<string, number> = {};
      for (const p of products) {
        const basePrice = p.price?.silver || 0;
        const converted = await convertCurrency(basePrice, "USD", currency);
        output[p._id] = converted;
      }
      setConvertedPrices(output);
    };

    convertAllPrices();

    // Listen for currency changes from Currency.tsx dropdown
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "currency") {
        setCurrency(e.newValue || "USD");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [products, currency]);

  return (
    <div className="pt-4 md:pt-10 container mx-auto bg-white">
      <h2
        className={`text-[20px] md:text-3xl text-[#43825c] text-center font-bold mb-2 ${philosopher.className}`}
      >
        Bridal Sets
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
          products.map((product) => {
            const displayCurrency = localStorage.getItem("currency") || currency;
            return (
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
                    <h2
                      className={`${philosopher.className} capitalize text-[#9f7d48] text-[14px] md:text-[18px] font-semibold group-hover:text-[#43825c] transition-colors truncate`}
                    >
                      {product.name}
                    </h2>

                    <p className={`${philosopher.className} text-[#43825c] font-bold text-lg mt-3`}>
                      {convertedPrices[product._id] ? (
                        <span>
                          {currencySymbol[displayCurrency] || displayCurrency}{" "}
                          {convertedPrices[product._id].toFixed(2)}
                        </span>
                      ) : (
                        <span>
                          {currencySymbol["USD"] || "USD"}{" "}
                          {product.price?.silver?.toFixed(2) || "0.00"}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <p className="text-center text-gray-500 col-span-3">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Bridalsets;

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Philosopher } from "next/font/google";
import { getLocation } from "@/lib/getLocation";
import { convertCurrency } from "@/lib/convertCurrency";
import { currencyMap } from "@/lib/currencyMap";
import { currencySymbol } from "@/lib/currencySymbol";

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface FavoriteItem {
  _id: string;
  productId: string;
  selectedMetal: string;
  product: {
    name: string;
    price: Record<string, number>;
    images: string[];
    weight?: string;
    clarity?: string;
    color?: string;
    cut?: string;
  };
}

export default function FavoritesPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [convertedPrices, setConvertedPrices] = useState<Record<string, number>>({});

  const API_BASE = "https://claireapi.onrender.com";

  // ----------------------------
  // Get userId
  // ----------------------------
  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

  // ----------------------------
  // Detect Currency
  // ----------------------------
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

  // ----------------------------
  // Fetch Favorites
  // ----------------------------
  useEffect(() => {
    if (!userId) return;

    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/favorites/${userId}`);
        setFavorites(res.data);
      } catch (err) {
        console.error("Fetch Favorites Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId]);

  // ----------------------------
  // Convert Prices
  // ----------------------------
  useEffect(() => {
    async function convertAll() {
      const map: Record<string, number> = {};
      for (const item of favorites) {
        const metalKey = item.selectedMetal;
        const basePrice = item.product?.price?.[metalKey] ?? 0;
        const converted = await convertCurrency(basePrice, "USD", currency);
        map[item._id] = converted;
      }
      setConvertedPrices(map);
    }

    if (favorites.length > 0 && currency) {
      convertAll();
    }
  }, [favorites, currency]);

  // ----------------------------
  // Remove from Favorites
  // ----------------------------
  const removeFavorite = async (productId: string, selectedMetal: string) => {
    if (!userId) return;

    try {
      await axios.delete(`${API_BASE}/favorites`, {
        data: { userId, productId, selectedMetal },
      });
      setFavorites(favorites.filter(
        item => item.productId !== productId || item.selectedMetal !== selectedMetal
      ));
    } catch (err) {
      console.error(err);
      alert("Failed to remove from favorites");
    }
  };

  if (!userId) return <p className="p-6">Loading...</p>;

  return (
    <div className="py-10 container mx-auto px-4 overflow-x-hidden">
      <h1 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#43825c] text-center font-bold mb-6 ${philosopher.className}`}>
        Your Favorites
      </h1>

      {loading && <p>Loading favorites...</p>}
      {!loading && favorites.length === 0 && <p>You have no favorite items yet.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {favorites && favorites.length > 0 ? (
          favorites
            .filter((item): item is CartItem => !!item && !!item._id) // remove null or missing _id
            .map((item) => {
              const convertedPrice = convertedPrices[item._id] || 0;

              return (
                <div key={item._id} className="border rounded-lg p-4 shadow-sm">
                  {item.product?.images?.[0] && (
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name || "Product Image"}
                      width={200}
                      height={200}
                      className="rounded-lg object-cover w-full h-48"
                    />
                  )}
                  <h2 className={`text-lg font-semibold mt-2 ${philosopher.className}`}>
                    {item.product?.name || "Unnamed Product"}
                  </h2>
                  <p className="text-gray-700">Metal: {item.selectedMetal || "-"}</p>
                  <p className="text-[#32796B] font-semibold mt-1">
                    {currencySymbol[currency] || currency} {convertedPrice.toFixed(2)}
                  </p>

                  <div className="flex gap-4 mt-3">
                    <Link href={`/product/${item.productId}`}>
                      <button className="text-[#0A6E6E] underline font-medium">View Product</button>
                    </Link>
                    <button
                      onClick={() => removeFavorite(item.productId, item.selectedMetal)}
                      className="text-red-500 underline font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
        ) : (
          <p className="text-center text-gray-500">No favorites yet.</p>
        )}
      </div>
    </div>
  );
}

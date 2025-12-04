"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import { getLocation } from "@/lib/getLocation";
import { convertCurrency } from "@/lib/convertCurrency";
import { currencyMap } from "@/lib/currencyMap";
import { currencySymbol } from "@/lib/currencySymbol";

interface FavoriteItem {
  _id: string;
  userId: string;
  productId: string;
  selectedMetal: string;

  product: {
    name: string;
    images: string[];
    price: Record<string, number>;
  };
}

export default function FavoritesPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [currency, setCurrency] = useState("USD");
  const [convertedPrices, setConvertedPrices] = useState<Record<string, number>>({});

  const API_BASE = "https://claireapi.onrender.com";

  // 🌍 1️⃣ Detect User ID
  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

  // 💱 2️⃣ Detect Currency
  useEffect(() => {
    async function loadCurr() {
      const loc = await getLocation();
      if (loc) {
        const cur = currencyMap[loc.country] || loc.currency || "USD";
        setCurrency(cur);
      }
    }
    loadCurr();
  }, []);

  // ❤️ 3️⃣ Load all favorites
  useEffect(() => {
    if (!userId) return;

    async function loadFavorites() {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/favorites/${userId}`);
        setFavorites(res.data);
      } catch (err) {
        console.error("Fetch favorites error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();
  }, [userId]);

  // 💱 4️⃣ Convert prices
  useEffect(() => {
    async function convertAll() {
      const map: Record<string, number> = {};

      for (const item of favorites) {
        const metalKey = item.selectedMetal;
        const base = item.product?.price?.[metalKey] || 0;

        const converted = await convertCurrency(base, "USD", currency);
        map[item._id] = converted;
      }

      setConvertedPrices(map);
    }

    if (favorites.length > 0 && currency) {
      convertAll();
    }
  }, [favorites, currency]);

  // ❌ 5️⃣ Remove Favorite
  const removeFavorite = async (productId: string, selectedMetal: string) => {
    if (!userId) return;

    try {
      await axios.delete(`${API_BASE}/favorites`, {
        data: { userId, productId, selectedMetal },
      });

      setFavorites(
        favorites.filter(
          (f) =>
            f.productId !== productId ||
            f.selectedMetal !== selectedMetal
        )
      );
    } catch (err) {
      console.error("Remove favorite error:", err);
    }
  };

  // UI ⬇⬇⬇
  if (!userId) return <p className="p-6">Please login to view favorites.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-[#43825c]">Your Favourites</h1>

      {loading && <p>Loading favorites...</p>}
      {!loading && favorites.length === 0 && (
        <p className="text-gray-500">No favourite products yet.</p>
      )}

      {favorites.map((item) => {
        const converted = convertedPrices[item._id];
        const usdPrice = item.product?.price?.[item.selectedMetal] ?? 0;

        return (
          <div
            key={item._id}
            className="flex justify-between items-center mb-4 border p-4 rounded-lg"
          >
            {/* Image + Info */}
            <div className="flex items-center gap-4">
              <Image
                src={item.product.images?.[0] || "/placeholder.jpg"}
                alt={item.product.name}
                width={80}
                height={80}
                className="rounded"
              />

              <div>
                <p className="font-semibold text-[#9f7d48]">
                  {item.product.name}
                </p>
                <p className="text-sm text-gray-500">
                  Metal: {item.selectedMetal}
                </p>

                <p className="mt-1 font-semibold text-[#43825c]">
                  {converted ? (
                    <>
                      {currencySymbol[currency] || currency}{" "}
                      {converted.toFixed(2)}
                    </>
                  ) : (
                    <>USD {usdPrice}</>
                  )}
                </p>
              </div>
            </div>

            {/* Remove */}
            <button
              className="text-red-600 font-bold"
              onClick={() =>
                removeFavorite(item.productId, item.selectedMetal)
              }
            >
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
}

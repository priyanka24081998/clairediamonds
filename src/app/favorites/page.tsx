"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

import { getLocation } from "@/lib/getLocation";
import { convertCurrency } from "@/lib/convertCurrency";
import { currencySymbol } from "@/lib/currencySymbol";
import { currencyMap } from "@/lib/currencyMap";

interface FavoriteItem {
  _id: string;
  productId: string;
  product: {
    _id: string;
    name: string;
    images: string[];
    price: Record<string, number>;
  };
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [currency, setCurrency] = useState("USD");
  const [converted, setConverted] = useState<Record<string, number>>({});
  const [userId, setUserId] = useState<string | null>(null);

  const API_BASE = "https://claireapi.onrender.com";

  // 1️⃣ Load User
  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

  // 2️⃣ Detect Currency
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

  // 3️⃣ Fetch Favorites
  useEffect(() => {
    if (!userId) return;
    async function loadFavorites() {
      const res = await axios.get(`${API_BASE}/favorites/${userId}`);
      setFavorites(res.data);
    }
    loadFavorites();
  }, [userId]);

  // 4️⃣ Convert Prices
  useEffect(() => {
    async function convertAll() {
      const map: Record<string, number> = {};
      for (const fav of favorites) {
        const base = fav.product?.price?.silver || 0;
        const convertedPrice = await convertCurrency(base, "USD", currency);
        map[fav._id] = convertedPrice;
      }
      setConverted(map);
    }
    if (favorites.length > 0) convertAll();
  }, [favorites, currency]);

  // 5️⃣ Remove Favorite
  const removeFavorite = async (productId: string) => {
    if (!userId) return;
    await axios.delete(`${API_BASE}/favorites`, {
      data: { userId, productId }
    });
    setFavorites(favorites.filter(f => f.productId !== productId));
  };

  // 6️⃣ ADD TO CART
  const addToCart = async (productId: string, selectedMetal: string) => {
    if (!userId) {
      alert("Please login first.");
      return;
    }

    try {
      await axios.post(`${API_BASE}/cart`, {
        userId,
        productId,
        quantity: 1,
        selectedMetal,
      });

      alert("Added to cart!");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  };

  // UI ---------------------------------
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Favorites</h1>

      {favorites.length === 0 && <p>No favorites added yet.</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((fav) => {
          const item = fav.product;
          const price = converted[fav._id] || 0;

          return (
            <div
              key={fav._id}
              className="border rounded-xl p-4 shadow-md bg-white"
            >
              {/* Image */}
              <Link href={`/products/${item._id}`}>
                <Image
                  src={item.images?.[0]}
                  alt={item.name}
                  width={300}
                  height={250}
                  className="rounded-xl w-full h-48 object-cover"
                />
              </Link>

              {/* Name */}
              <h2 className="text-lg font-semibold mt-3">{item.name}</h2>

              {/* Price */}
              <p className="text-[#43825c] font-bold mt-1">
                {currencySymbol[currency] || currency} {price.toFixed(2)}
              </p>

              {/* SELECT METAL */}
              <select
                id={`metal-${item._id}`}
                className="mt-3 border px-2 py-1 rounded w-full"
              >
                {Object.keys(item.price).map(metal => (
                  <option key={metal} value={metal}>
                    {metal.toUpperCase()} — {currencySymbol[currency]}{" "}
                    {(converted[fav._id] || 0).toFixed(2)}
                  </option>
                ))}
              </select>

              {/* BUTTONS */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => removeFavorite(item._id)}
                  className="text-red-500 font-semibold"
                >
                  Remove
                </button>

                <button
                  onClick={() => {
                    const select = document.getElementById(
                      `metal-${item._id}`
                    ) as HTMLSelectElement;
                    const metal = select.value;
                    addToCart(item._id, metal);
                  }}
                  className="bg-[#43825c] text-white px-3 py-1 rounded-lg"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

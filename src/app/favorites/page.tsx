"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: Record<string, number>;
  images: string[];
}

interface FavoriteItem {
  _id: string;
  userId: string;
  productId: string;
  product: Product | null;
}

export default function FavoritesPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(false);

  const API_BASE = "https://claireapi.onrender.com";

  // Get userId from localStorage
  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);

  // Fetch favorites
  useEffect(() => {
    if (!userId) return;

    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/favorites/${userId}`);
        setFavorites(res.data);
      } catch (err) {
        console.error("Failed to load favorites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId]);

  // Remove favorite
  const removeFavorite = async (productId: string) => {
    if (!userId) return;
    try {
      await axios.delete(`${API_BASE}/favorites`, {
        data: { userId, productId },
      });

      setFavorites((prev) =>
        prev.filter((item) => item.productId !== productId)
      );
    } catch (err) {
      console.error("Failed to remove favorite:", err);
    }
  };

  if (!userId) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Favorites</h1>

      {loading && <p>Loading favorites...</p>}

      {!loading && favorites.length === 0 && (
        <p>No favorites added yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {favorites.map((item) => {
          const product = item.product;
          if (!product) return null; // in case of missing product

          return (
            <div
              key={item._id}
              className="border p-3 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                {product.images?.[0] && (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={90}
                    height={90}
                    className="rounded-md"
                  />
                )}

                <div>
                  <p className="font-semibold">{product.name}</p>

                  {/* show lowest price */}
                  {product.price && (
                    <p className="text-gray-600 text-sm">
                      From ₹{Math.min(...Object.values(product.price))}
                    </p>
                  )}

                  <Link
                    href={`/product/${product._id}`}
                    className="text-blue-600 text-sm underline"
                  >
                    View Product
                  </Link>
                </div>
              </div>

              <button
                onClick={() => removeFavorite(item.productId)}
                className="text-red-500 font-bold"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

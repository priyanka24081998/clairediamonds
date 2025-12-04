"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

// -------------------- TYPES --------------------
interface Product {
  _id: string;
  name: string;
  price: number;
  images?: string[];
}

interface Favorite {
  userId: string;
  product: Product | null;
}

// -------------------- COMPONENT --------------------
export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    if (!userId) return;

    const fetchFavorites = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/favorites/${userId}`
        );
        setFavorites(res.data.favorites || []);
      } catch (error) {
        console.log("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [userId]);

  // REMOVE FAVORITE
  const removeFavorite = async (productId: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/favorites`, {
        data: { userId, productId },
      });

      setFavorites((prev) =>
        prev.filter((fav) => fav.product?._id !== productId)
      );
    } catch (error) {
      console.log("Error removing favorite:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Your Favorites</h1>

      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {favorites.map((fav) => {
            const product = fav.product;
            if (!product) return null;

            const imageUrl =
              product?.images && product.images.length > 0
                ? product.images[0]
                : "/placeholder.png";

            return (
              <div
                key={product._id}
                className="border rounded-lg p-3 shadow-md"
              >
                <Link href={`/product/${product._id}`}>
                  <Image
                    src={imageUrl}
                    width={300}
                    height={300}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </Link>

                <h2 className="text-lg font-medium mt-2">{product.name}</h2>
                <p className="text-gray-600">₹{product.price}</p>

                <button
                  onClick={() => removeFavorite(product._id)}
                  className="mt-3 w-full bg-red-500 text-white py-2 rounded-md"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

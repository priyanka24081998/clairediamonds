"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface FavoriteButtonProps {
  productId: string;
  userId: string;
}
interface FavoriteItem {
  productId: string;
  // you can add other fields if your backend returns them
}

export default function FavoriteButton({ productId, userId }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const API_BASE = "http://localhost:5000";

 useEffect(() => {
  if (!userId) return;

  const fetchFavorites = async () => {
    const res = await axios.get<FavoriteItem[]>(`${API_BASE}/favorites/${userId}`);
    setIsFavorite(res.data.some(item => item.productId === productId));
  };

  fetchFavorites();
}, [productId, userId]);

  const toggleFavorite = async () => {
    if (!userId) return alert("Please login first!");
    try {
      if (isFavorite) {
        await axios.delete(`${API_BASE}/favorites`, { data: { userId, productId } });
        setIsFavorite(false);
      } else {
        await axios.post(`${API_BASE}/favorites`, { userId, productId });
        setIsFavorite(true);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <button onClick={toggleFavorite} className="text-red-500 text-xl">
      {isFavorite ? "❤️" : "🤍"}
    </button>
  );
}

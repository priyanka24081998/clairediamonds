"use client";

import { useState } from "react";
import axios from "axios";

interface AddToCartButtonProps {
  productId: string;
  userId: string;
}

export default function AddToCartButton({ productId, userId }: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false);
  const API_BASE = "https://claireapi.onrender.com"; // your backend URL

  const handleAddToCart = async () => {
    if (!userId) return alert("Please login first!");
    setLoading(true);

    try {
      await axios.post(`${API_BASE}/cart`, {
        userId,
        productId,
        quantity: 1,
      });
      alert("Added to cart!");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
    >
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
}

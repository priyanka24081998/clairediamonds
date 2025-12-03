"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface CartIconProps {
  userId: string;
}

export default function CartIcon({ userId }: CartIconProps) {
  const [count, setCount] = useState(0);
  const API_BASE = "http://localhost:5000";

  useEffect(() => {
    if (!userId) return;
    const fetchCart = async () => {
      const res = await axios.get(`${API_BASE}/cart/${userId}`);
      setCount(res.data.length);
    };
    fetchCart();
  }, [userId]);

  return (
    <div className="relative">
      <span className="material-icons">shopping_cart</span>
      {count > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 rounded-full text-white w-5 h-5 text-xs flex items-center justify-center">
          {count}
        </span>
      )}
    </div>
  );
}

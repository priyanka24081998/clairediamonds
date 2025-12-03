"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface ProductInfo {
  name: string;
  price: number;
  image?: string;
  metal?: string;
}

interface CartItem {
  _id: string;
  productId: string;
  quantity: number;
  product: ProductInfo;
}

export default function CartPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const API_BASE = "https://claireapi.onrender.com";

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchCart = async () => {
      try {
        const res = await axios.get(`${API_BASE}/cart/${userId}`);
        setCartItems(res.data);
      } catch (err) {
        console.error("Fetch cart error:", err);
      }
    };

    fetchCart();
  }, [userId]);

  const removeItem = async (productId: string) => {
    if (!userId) return;

    try {
      await axios.delete(`${API_BASE}/cart`, { data: { userId, productId } });
      setCartItems(cartItems.filter(item => item.productId !== productId));
    } catch (err) {
      console.error("Remove cart item error:", err);
    }
  };

  const total = cartItems.reduce((acc, item) => acc + (item.product?.price || 0) * item.quantity, 0);

  if (!userId) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item._id} className="flex items-center justify-between mb-4 border-b pb-4">
              <div className="flex items-center gap-4">
                <Image
                  src={item.product?.image || "/placeholder.png"}
                  alt={item.product?.name || "Product"}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{item.product?.name || "Unknown Product"}</p>
                  <p className="text-sm text-gray-600">Metal: {item.product?.metal || "N/A"}</p>
                  <p>₹{item.product?.price} × {item.quantity}</p>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.productId)}
                className="text-red-500 font-semibold"
              >
                Remove
              </button>
            </div>
          ))}
          <p className="mt-4 font-bold text-lg">Total: ₹{total}</p>
        </>
      )}
    </div>
  );
}

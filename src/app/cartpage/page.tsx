"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  price: Record<string, number>;
  metal: string;
  images: string[];
}

interface CartItem {
  _id: string;
  productId: string;
  quantity: number;
  product: Product;
}

export default function CartPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const API_BASE = "https://claireapi.onrender.com";

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchCart = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/cart/${userId}`);
        setCartItems(res.data);
      } catch (err) {
        console.error("Fetch Cart Error:", err);
      } finally {
        setLoading(false);
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
      console.error("Remove Item Error:", err);
    }
  };

  const total = cartItems.reduce((acc, item) => {
    const price = item.product?.price?.[item.product?.metal] ?? 0;
    return acc + price * item.quantity;
  }, 0);

  if (!userId) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {loading && <p>Loading cart...</p>}
      {cartItems.length === 0 && <p>Your cart is empty</p>}
      {cartItems.map(item => {
        const price = item.product?.price?.[item.product?.metal] ?? 0;
        return (
          <div key={item._id} className="flex justify-between items-center mb-4 border p-2 rounded">
            <div className="flex items-center gap-4">
              {item.product?.images?.[0] && (
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  width={80}
                  height={80}
                />
              )}
              <div>
                <p className="font-semibold">{item.product?.name || "Unknown Product"}</p>
                <p className="text-sm text-gray-500">Metal: {item.product?.metal || "N/A"}</p>
                <p>
                  ₹{price} × {item.quantity} = ₹{price * item.quantity}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeItem(item.productId)}
              className="text-red-500 font-bold"
            >
              Remove
            </button>
          </div>
        );
      })}
      {cartItems.length > 0 && (
        <p className="mt-4 font-bold text-lg">Total: ₹{total}</p>
      )}
    </div>
  );
}

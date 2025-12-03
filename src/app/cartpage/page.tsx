"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface CartItem {
  _id: string;
  productId: string;
  quantity: number;
  product: { name: string; price: number };
}

export default function CartPage() {
  const [userId, setUserId] = useState<string | null>(null); // store userId in state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const API_BASE = "https://claireapi.onrender.com";

  useEffect(() => {
    const id = localStorage.getItem("userId"); // only run on client
    setUserId(id);
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchCart = async () => {
      try {
        const res = await axios.get(`${API_BASE}/cart/${userId}`);
        setCartItems(res.data);
      } catch (err) {
        console.error(err);
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
      console.error(err);
    }
  };

  const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  if (!userId) return <p className="p-6">Loading...</p>; // wait for client render

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 && <p>Your cart is empty</p>}
      {cartItems.map(item => (
        <div key={item._id} className="flex justify-between mb-3">
          <div>
            <p>{item.product.name}</p>
            <p>₹{item.product.price} × {item.quantity}</p>
          </div>
          <button
            onClick={() => removeItem(item.productId)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
      {cartItems.length > 0 && (
        <p className="mt-4 font-bold">Total: ₹{total}</p>
      )}
    </div>
  );
}

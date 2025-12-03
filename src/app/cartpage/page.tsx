"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface CartItem {
  _id: string;
  productId: string;
  quantity: number;
  product?: { name?: string; price?: number }; // optional, may be undefined
}

export default function CartPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const API_BASE = "https://claireapi.onrender.com";

  // Get userId from localStorage
  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) setUserId(id);
  }, []);

  // Fetch cart items
  useEffect(() => {
    if (!userId) return;

    const fetchCart = async () => {
      try {
        const res = await axios.get(`${API_BASE}/cart/${userId}`);
        const items: CartItem[] = res.data;

        // Optional: fill product with defaults if missing
        const safeItems = items.map(item => ({
          ...item,
          product: item.product || { name: "Unknown Product", price: 0 },
        }));

        setCartItems(safeItems);
      } catch (err) {
        console.error("Fetch Cart Error:", err);
      }
    };

    fetchCart();
  }, [userId]);

  // Remove item from cart
  const removeItem = async (productId: string) => {
    if (!userId) return;

    try {
      await axios.delete(`${API_BASE}/cart`, { data: { userId, productId } });
      setCartItems(cartItems.filter(item => item.productId !== productId));
    } catch (err) {
      console.error("Remove Cart Item Error:", err);
    }
  };

  // Calculate total safely
  const total = cartItems.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.quantity,
    0
  );

  if (!userId) return <p className="p-6">Loading user info...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item._id} className="flex justify-between mb-3">
              <div>
                <p>{item.product?.name || "Unknown Product"}</p>
                <p>
                  ₹{item.product?.price || 0} × {item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeItem(item.productId)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <p className="mt-4 font-bold">Total: ₹{total}</p>
        </>
      )}
    </div>
  );
}

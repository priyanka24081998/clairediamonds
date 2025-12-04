"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import { getLocation } from "@/lib/getLocation";
import { convertCurrency } from "@/lib/convertCurrency";
import { currencyMap } from "@/lib/currencyMap";
import { currencySymbol } from "@/lib/currencySymbol";
import Link from "next/link";

interface CartItem {
  _id: string;
  productId: string;
  quantity: number;
  selectedMetal: string;
  product: {
    name: string;
    price: Record<string, number>;
    images: string[];
  };
}

export default function CartPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [currency, setCurrency] = useState("USD");
  const [convertedPrices, setConvertedPrices] = useState<
    Record<string, number>
  >({});

  const API_BASE = "https://claireapi.onrender.com";

  // ----------------------------------------
  // 1️⃣ Get userId
  // ----------------------------------------
  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

  // ----------------------------------------
  // 2️⃣ Detect Currency
  // ----------------------------------------
  useEffect(() => {
    async function loadCurrency() {
      const loc = await getLocation();

      if (loc) {
        const mapped =
          currencyMap[loc.country] || loc.currency || "USD";
        setCurrency(mapped);
      }
    }

    loadCurrency();
  }, []);

  // ----------------------------------------
  // 3️⃣ Fetch Cart Items
  // ----------------------------------------
  useEffect(() => {
    if (!userId) {
      setCartItems([]);  // 👈 clear old cart
      return;
    }

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

  // ----------------------------------------
  // 4️⃣ Convert prices of each cart item
  // ----------------------------------------
  useEffect(() => {
    async function convertAll() {
      const map: Record<string, number> = {};

      for (const item of cartItems) {
        const metalKey = item.selectedMetal;
        const basePrice = item.product?.price?.[metalKey] ?? 0;

        const converted = await convertCurrency(basePrice, "USD", currency);
        map[item._id] = converted;
      }

      setConvertedPrices(map);
    }

    if (cartItems.length > 0 && currency) {
      convertAll();
    }
  }, [cartItems, currency]);

  // ----------------------------------------
  // 5️⃣ Remove From Cart
  // ----------------------------------------
  const removeItem = async (productId: string, selectedMetal: string) => {
    if (!userId) return;
    try {
      await axios.delete(`${API_BASE}/cart`, {
        data: { userId, productId, selectedMetal },
      });

      setCartItems(
        cartItems.filter(
          (item) =>
            item.productId !== productId ||
            item.selectedMetal !== selectedMetal
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // ----------------------------------------
  // 6️⃣ Calculate TOTAL converted
  // ----------------------------------------
  const total = cartItems.reduce((acc, item) => {
    const converted = convertedPrices[item._id] || 0;
    return acc + converted * item.quantity;
  }, 0);
  // ----------------------------------------
  // 6️⃣ Add to Favorites and remove from Cart
  const moveToFavorites = async (productId: string, selectedMetal: string) => {
    if (!userId) return;

    try {
      // Add to favorites
      await axios.post(`${API_BASE}/favorites`, { userId, productId });

      // Remove from cart
      await axios.delete(`${API_BASE}/cart`, {
        data: { userId, productId, selectedMetal },
      });

      // Update UI
      setCartItems(cartItems.filter(
        item => item.productId !== productId || item.selectedMetal !== selectedMetal
      ));

      alert("Moved to Favorites ❤️");
    } catch (err) {
      console.error(err);
      alert("Failed to move to favorites");
    }
  };
  // ----------------------------------------
  // RETURN UI
  // ----------------------------------------
  if (!userId) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {loading && <p>Loading cart...</p>}
      {cartItems.length === 0 && <p>Your cart is empty</p>}

      {cartItems.map((item) => {
        const converted = convertedPrices[item._id];
        const usdPrice = item.product?.price?.[item.selectedMetal] ?? 0;

        return (
          <div
            key={item._id}
            className="flex justify-between items-center gap-6 mb-6 p-6 rounded-xl border border-[#dbe7e6] bg-white shadow-sm hover:shadow-md transition-all"
            style={{ borderColor: "#CDE8E6" }}
          >
            {/* LEFT */}
            <div className="flex items-center gap-6">
              {item.product?.images?.[0] && (
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  width={95}
                  height={95}
                  className="rounded-lg border border-[#dbe7e6] p-1 bg-[#f9ffff]"
                />
              )}

              <div className="space-y-1">
                {/* PRODUCT NAME */}
                <p className="font-semibold text-xl text-[#1A3C40] tracking-wide"
                  style={{ fontFamily: "Georgia, serif" }}>
                  {item.product?.name || "Unknown Product"}
                </p>

                {/* METAL */}
                <p className="text-sm text-[#4f6f72]">
                  Metal:{" "}
                  <span className="font-medium text-[#1A3C40] uppercase">
                    {item.selectedMetal}
                  </span>
                </p>

                {/* PRICE */}
                <p className="mt-2 font-semibold text-[#1A3C40] text-lg">
                  {converted ? (
                    <>
                      {currencySymbol[currency] || currency}{" "}
                      {(converted * item.quantity).toFixed(2)}

                      <span className="block text-[#688a8c] text-xs mt-1">
                        ({currencySymbol[currency] || currency}{" "}
                        {converted.toFixed(2)} × {item.quantity})
                      </span>
                    </>
                  ) : (
                    <>USD {usdPrice} × {item.quantity}</>
                  )}
                </p>
              </div>
            </div>

            {/* RIGHT BUTTONS */}
            <div className="flex flex-col items-end gap-3">
              {/* Remove */}
              <button
                onClick={() =>
                  removeItem(item.productId, item.selectedMetal)
                }
                className="text-[#ba4b4b] font-medium hover:text-red-600 transition"
              >
                Remove
              </button>

              {/* Favorites */}
              <Link href="/favorites" className="w-full">
                <button
                  onClick={() => moveToFavorites(item.productId, item.selectedMetal)}
                  className="font-semibold text-[#008C8C] hover:text-[#006e6e] transition hover:underline"
                >
                  Add to Favorites
                </button>
              </Link>
            </div>
          </div>
        );
      })}

      {cartItems.length > 0 && (
        <p className="mt-10 font-bold text-2xl text-[#1A3C40] tracking-wide border-t pt-6"
          style={{ borderColor: "#CDE8E6" }}>
          Total: {currencySymbol[currency] || currency} {total.toFixed(2)}
        </p>
      )}

    </div>
  );
}

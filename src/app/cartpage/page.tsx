"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import { getLocation } from "@/lib/getLocation";
import { convertCurrency } from "@/lib/convertCurrency";
import { currencyMap } from "@/lib/currencyMap";
import { currencySymbol } from "@/lib/currencySymbol";

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
        const usdPrice =
          item.product?.price?.[item.selectedMetal] ?? 0;

        return (
          <div
            key={item._id}
            className="flex justify-between items-center mb-4 border p-3 rounded-lg"
          >
            <div className="flex items-center gap-4">
              {item.product?.images?.[0] && (
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  width={80}
                  height={80}
                  className="rounded"
                />
              )}

              <div>
                <p className="font-semibold">
                  {item.product?.name || "Unknown Product"}
                </p>
                <p className="text-sm text-gray-600">
                  Metal: {item.selectedMetal}
                </p>

                <p className="mt-1 font-semibold text-[#43825c]">
                  {converted ? (
                    <>
                      {currencySymbol[currency] || currency}
                      {" "}
                      {(converted * item.quantity).toFixed(2)}
                      {" "}
                      <span className="text-gray-500 text-sm">
                        ({currencySymbol[currency] || currency}{" "}
                        {converted.toFixed(2)} × {item.quantity})
                      </span>
                    </>
                  ) : (
                    <>
                      USD {usdPrice} × {item.quantity}
                    </>
                  )}
                </p>
              </div>
            </div>

            <a href=""><button
              onClick={() =>
                removeItem(item.productId, item.selectedMetal)
              }
              className="text-red-500 font-bold"
            >
              Remove
            </button></a>
          </div>
        );
      })}

      {cartItems.length > 0 && (
        <p className="mt-6 font-bold text-xl">
          Total: {currencySymbol[currency] || currency}
          {" "}
          {total.toFixed(2)}
        </p>
      )}
    </div>
  );
}

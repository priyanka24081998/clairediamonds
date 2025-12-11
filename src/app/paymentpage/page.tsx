"use client";

import { useState, useEffect } from "react";
import { convertCurrency } from "@/lib/convertCurrency";
import { getLocation } from "@/lib/getLocation";
import { currencyMap } from "@/lib/currencyMap";
import { currencySymbol } from "@/lib/currencySymbol";

const API_BASE = "https://claireapi.onrender.com";

interface Product {
  _id: string;
  name: string;
  price: Record<string, number>;
}

interface CartItem {
  _id: string;
  productId: string;
  quantity: number;
  selectedMetal: string;
  product: Product;
}

interface ShippingInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
}

interface PayPalLink {
  href: string;
  rel: string;
  method: string;
}

interface PayPalOrder {
  id: string;
  status: string;
  links: PayPalLink[];
}

export default function PaymentPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [convertedPrices, setConvertedPrices] = useState<Record<string, number>>({});
  const [total, setTotal] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("USD");
  const [loading, setLoading] = useState<boolean>(false);

  // -------------------------------
  // 1️⃣ Detect currency
  // -------------------------------
  useEffect(() => {
    const detectCurrency = async () => {
      const loc = await getLocation();
      if (loc) {
        const mapped = currencyMap[loc.country] || loc.currency || "USD";
        setCurrency(mapped);
      }
    };
    detectCurrency();
  }, []);

  // -------------------------------
  // 2️⃣ Fetch cart items
  // -------------------------------
  useEffect(() => {
    const fetchCart = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        alert("Please login first");
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/cart/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data: CartItem[] = await res.json();
        setCartItems(data || []);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    fetchCart();
  }, []);

  // -------------------------------
  // 3️⃣ Convert prices
  // -------------------------------
  useEffect(() => {
    const convertAll = async () => {
      const map: Record<string, number> = {};
      for (const item of cartItems) {
        const priceKey = item.selectedMetal;
        const basePrice = item.product?.price?.[priceKey] || 0;

        const converted = await convertCurrency(basePrice, "USD", currency);
        map[item._id] = converted;
      }
      setConvertedPrices(map);
    };

    if (cartItems.length > 0 && currency) convertAll();
  }, [cartItems, currency]);

  // -------------------------------
  // 4️⃣ Calculate total
  // -------------------------------
  useEffect(() => {
    const cartTotal = cartItems.reduce((sum, item) => {
      const price = convertedPrices[item._id] || 0;
      return sum + price * item.quantity;
    }, 0);
    setTotal(cartTotal);
  }, [convertedPrices, cartItems]);

  // -------------------------------
  // 5️⃣ PayPal Payment
  // -------------------------------
  const startPayPalPayment = async () => {
    try {
      setLoading(true);

      const shipping: ShippingInfo = JSON.parse(
        localStorage.getItem("shippingInfo") || "{}"
      );

      if (
        !shipping.name ||
        !shipping.address ||
        !shipping.city ||
        !shipping.state ||
        !shipping.pincode ||
        !shipping.phone ||
        !shipping.email
      ) {
        alert("Shipping information missing.");
        setLoading(false);
        return;
      }

      const products = cartItems.map((item) => ({
        _id: item.product._id,
        name: item.product.name,
        price: convertedPrices[item._id] || 0,
        quantity: item.quantity,
        metal: item.selectedMetal,
        size: "N/A",
      }));

      const userId = localStorage.getItem("userId");

      const res = await fetch(`${API_BASE}/order/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          total,
          products,
          shipping,
        }),
      });

      const orderData: PayPalOrder = await res.json();

      const approveLink = orderData.links.find((l) => l.rel === "approve");
      if (!approveLink) {
        alert("PayPal approval link not found.");
        setLoading(false);
        return;
      }

      window.location.href = approveLink.href;
    } catch (error) {
      console.error("PayPal payment error:", error);
      alert("Something went wrong during payment");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // Render UI
  // -------------------------------
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Proceed to Payment</h1>

      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-2">Order Summary</h2>

        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between py-1">
            <p>{item.product.name} ({item.selectedMetal})</p>
            <p>{currencySymbol[currency] || currency}{" "}
              {((convertedPrices[item._id] || 0) * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}

        <div className="border-t mt-2 pt-2 flex justify-between font-semibold text-lg">
          <span>Total:</span>
          <span>{currencySymbol[currency] || currency} {total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={startPayPalPayment}
        className="w-full py-3 bg-[#43825c] text-white font-semibold rounded-lg hover:bg-[#095c5c] transition-colors"
      >
        {loading ? "Redirecting to PayPal..." : "Pay with PayPal"}
      </button>
    </div>
  );
}

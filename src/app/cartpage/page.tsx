"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Philosopher } from "next/font/google";
import { getLocation } from "@/lib/getLocation";
import { convertCurrency } from "@/lib/convertCurrency";
import { currencyMap } from "@/lib/currencyMap";
import { currencySymbol } from "@/lib/currencySymbol";
import Link from "next/link";


const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
}); 

type PayPalLink = {
  href: string;
  rel: string;
};

interface CartItem {
  _id: string;
  productId: string;
  quantity: number;
  selectedMetal: string;
  product: {
    name: string;
    price: Record<string, number>;
    images: string[];
    weight?: string;
    clarity?: string;
    color?: string;
    cut?: string;
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

  const startPayPalPayment = async () => {
  try {
    const res = await fetch("/api/paypal/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ total: total.toFixed(2) }),
    });

    const data = await res.json();

const approveLink = data.links.find((l: PayPalLink) => l.rel === "approve");

    if (approveLink) {
      window.location.href = approveLink.href; // redirect to PayPal securely
    }
  } catch (err) {
    console.log(err);
  }
};
  
  // ----------------------------------------
  // RETURN UI
  // ----------------------------------------
  if (!userId) return <p className="p-6">Loading...</p>;

  return (
    <div className="py-10 container mx-auto px-4 overflow-x-hidden">
      <h1
        className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#43825c] text-center font-bold mb-6 ${philosopher.className}`}
      >
        Shopping Bag
      </h1>

      <div className="w-full flex flex-col lg:flex-row gap-10 overflow-x-hidden">

        {/* CART LEFT SIDE */}
        <div className="flex-1 space-y-10 overflow-x-hidden">

          {loading && <p>Loading cart...</p>}
          {cartItems.length === 0 && <p>Your cart is empty</p>}

          {cartItems.map((item) => {
            const convertedPrice = convertedPrices[item._id] || 0;

            return (
              <div
                key={item._id}
                className="border-b pb-8 w-full overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row gap-6 w-full">

                  {/* IMAGE */}
                  <div className="w-full sm:w-[180px] lg:w-[240px] mx-auto flex justify-center flex-shrink-0">
                    {item.product?.images?.[0] && (
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        width={200}
                        height={200}
                        className="rounded-lg shadow-sm object-cover max-h-[220px] w-auto max-w-full"
                      />
                    )}
                  </div>

                  {/* DETAILS */}
                  <div className="flex-1 min-w-0">

                    <h2
                      className={`text-lg sm:text-xl font-semibold text-gray-900 ${philosopher.className}`}
                    >
                      {item.product?.name}
                    </h2>

                    <p className="text-sm sm:text-base text-gray-700 mt-1">
                      Metal: {item.selectedMetal}
                    </p>

                    {/* Tiffany-Style Description */}
                    <div className="text-xs sm:text-sm md:text-base text-gray-600 mt-3 space-y-1 max-w-full">

                      <div className="grid grid-cols-2 gap-y-1 max-w-full">
                        <p>Carat - {item.product?.weight || "-"}</p>
                        <p>Cut - {item.product?.cut || "-"}</p>
                        <p>Clarity - {item.product?.clarity || "-"}</p>
                        <p>Color - {item.product?.color || "-"}</p>
                      </div>

                      <p className="pt-1">Claire Diamonds Certificate</p>

                      <p className="font-medium text-gray-700 pt-2">
                        Express Delivery With Signature
                      </p>

                      <p className="text-gray-500 hidden lg:block leading-relaxed">
                        We offer complimentary engraving for all jewellery. Engravings
                        are the perfect way to show your partner how much you think of them.
                        Use these ideas as inspiration when designing any of our personalized
                        jewellery or engraved gifts.
                      </p>

                    </div>

                    {/* PRICE */}
                    <p className="mt-4 text-lg sm:text-xl md:text-2xl font-semibold text-[#32796B]">
                      {currencySymbol[currency] || currency}{" "}
                      {(convertedPrice * item.quantity).toFixed(2)}
                    </p>

                    {/* BUTTONS */}
                    <div className="flex gap-6 mt-5 text-sm sm:text-base flex-wrap">
                      <Link href="/favorites">
                        <button
                          onClick={() => moveToFavorites(item.productId, item.selectedMetal)}
                          className="text-[#0A6E6E] underline font-medium"
                        >
                          Save for Later
                        </button>
                      </Link>

                      <button
                        onClick={() => removeItem(item.productId, item.selectedMetal)}
                        className="text-red-500 font-medium underline"
                      >
                        Remove
                      </button>
                    </div>

                  </div>

                </div>

                {/* MOBILE DESCRIPTION */}
                <p className="text-gray-500 lg:hidden mt-3 text-xs sm:text-sm leading-relaxed">
                  We offer complimentary engraving for all jewellery. Engravings
                  help personalize your gift. Use these ideas as inspiration when
                  designing any of our personalized jewellery or engraved gifts.
                </p>

              </div>
            );
          })}

        </div>

        {/* RIGHT SIDE ORDER SUMMARY */}
        <div className="w-full lg:w-[340px] border p-6 rounded-lg shadow-sm bg-[#FAFAFA] h-fit overflow-hidden">
          <h3 className="text-lg sm:text-xl font-serif mb-4">Order Summary</h3>

          <div className="space-y-4 text-sm sm:text-base">

            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>{currencySymbol[currency] || currency} {total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-700">
              <span>Express Delivery With Signature</span>
              <span>{currencySymbol[currency] || currency} 0.00</span>
            </div>

            <div className="flex justify-between text-gray-700">
              <span>Estimated Tax</span>
              <span>-</span>
            </div>

            <p className="text-xs sm:text-sm text-gray-500">
              Taxes and other shipping methods may apply.
            </p>

            <div className="flex justify-between pt-3 border-t font-semibold text-base sm:text-lg text-gray-900">
              <span>Estimated Total</span>
              <span>{currencySymbol[currency] || currency} {total.toFixed(2)}</span>
            </div>

            <p className="text-sm text-[#0A6E6E] mt-2 font-medium">
              Complimentary Delivery & Returns
            </p>

            <Link href={{
              pathname: "/paymentpage",
              query: { total: total.toFixed(2), currency } // pass total and currency
            }}>
              <button
                onClick={startPayPalPayment}
                className="w-full mt-4 py-3 bg-[#43825c] text-white font-semibold rounded-lg hover:bg-[#095c5c] transition-colors"
              >
                Checkout
              </button>
            </Link>
            <div id="paypal-container" style={{ display: "none" }}></div>

            
          </div>
        </div>
      </div>
    </div>


  );
}

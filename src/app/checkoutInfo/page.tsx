// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// const API_BASE = "https://claireapi.onrender.com";

// interface Product {
//   _id: string;
//   name: string;
//   price: Record<string, number>;
// }

// interface CartItem {
//   _id: string;
//   productId: string;
//   quantity: number;
//   selectedMetal: string;
//   product: Product;
// }

// interface ShippingInfo {
//   name: string;
//   address: string;
//   city: string;
//   state: string;
//   pincode: string;
//   phone: string;
//   email: string;
// }

// export default function CheckoutInfo() {
//   const router = useRouter();

//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [total, setTotal] = useState<number>(0);
//   const [currency, setCurrency] = useState<string>("USD");
//   const [loading, setLoading] = useState<boolean>(true);

//   const [name, setName] = useState("");
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");

 

//  useEffect(() => {
//   const fetchCart = async () => {
//     const userId = localStorage.getItem("userId");
//     if (!userId) {
//       alert("Please login first!");
//       router.push("/login");
//       return;
//     }

//     const token = localStorage.getItem("token");

//     try {
//       setLoading(true);
//       const res = await axios.get(`${API_BASE}/cart/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const items: CartItem[] = res.data; // use res.data directly
//       setCartItems(items);

//       const cartTotal = items.reduce((sum: number, item: CartItem) => {
//         const priceKey = item.selectedMetal; // should match the key in product.price
//         const price = item.product?.price?.[priceKey] || 0;
//         return sum + price * item.quantity;
//       }, 0);

//       setTotal(cartTotal);
//       setCurrency(localStorage.getItem("currency") || "USD");

//     } catch (err) {
//       console.error("Fetch Cart Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchCart();
// }, [router]);


//   const handleProceed = () => {
//     if (!name || !address || !city || !state || !pincode || !phone || !email) {
//       alert("Please fill all fields.");
//       return;
//     }

//     const shippingData: ShippingInfo = {
//       name,
//       address,
//       city,
//       state,
//       pincode,
//       phone,
//       email,
//     };
//     localStorage.setItem("shippingInfo", JSON.stringify(shippingData));

//     router.push(`/paymentpage?total=${total}&currency=${currency}`);
//   };

//   if (loading) return <p className="p-4">Loading...</p>;
//   if (!cartItems || cartItems.length === 0)
//     return <p className="p-4">Your cart is empty.</p>;

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h1 className="text-2xl font-semibold mb-4">Shipping Information</h1>

//       <div className="bg-gray-100 p-4 rounded-lg mb-6">
//         <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
//         {cartItems.map((item) => (
//           <div key={item._id} className="flex justify-between py-1">
//             <p>
//               {item.product.name} ({item.selectedMetal})
//             </p>
//             <p>
//               {currency}{" "}
//               {(item.product.price[item.selectedMetal] * item.quantity).toFixed(
//                 2
//               )}
//             </p>
//           </div>
//         ))}

//         <div className="border-t mt-2 pt-2 flex justify-between font-semibold text-lg">
//           <span>Total:</span>
//           <span>
//             {currency} {total.toFixed(2)}
//           </span>
//         </div>
//       </div>

//       <div className="space-y-4">
//         <input
//           type="text"
//           placeholder="Full Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full p-3 border rounded-lg"
//         />
//         <input
//           type="text"
//           placeholder="Address"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           className="w-full p-3 border rounded-lg"
//         />
//         <input
//           type="text"
//           placeholder="City"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           className="w-full p-3 border rounded-lg"
//         />
//         <input
//           type="text"
//           placeholder="State"
//           value={state}
//           onChange={(e) => setState(e.target.value)}
//           className="w-full p-3 border rounded-lg"
//         />
//         <input
//           type="text"
//           placeholder="Pincode"
//           value={pincode}
//           onChange={(e) => setPincode(e.target.value)}
//           className="w-full p-3 border rounded-lg"
//         />
//         <input
//           type="text"
//           placeholder="Mobile Number"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           className="w-full p-3 border rounded-lg"
//         />
//         <input
//           type="email"
//           placeholder="Email Address"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-3 border rounded-lg"
//         />
//       </div>

//       <button
//         onClick={handleProceed}
//         className="w-full mt-6 py-3 bg-[#43825c] text-white font-semibold rounded-lg hover:bg-[#095c5c] transition-colors"
//       >
//         Proceed to Payment
//       </button>
//     </div>
//   );
// }
// above code for show currency in usd without converting it

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getLocation } from "@/lib/getLocation";
import { convertCurrency } from "@/lib/convertCurrency";
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

export default function CheckoutInfo() {
  const router = useRouter();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [convertedPrices, setConvertedPrices] = useState<Record<string, number>>({});
  const [total, setTotal] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("USD");
  const [loading, setLoading] = useState<boolean>(true);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // -------------------------------
  // 1️⃣ Detect Currency
  // -------------------------------
  useEffect(() => {
    async function loadCurrency() {
      const loc = await getLocation();
      if (loc) {
        const mapped = currencyMap[loc.country] || loc.currency || "USD";
        setCurrency(mapped);
      }
    }
    loadCurrency();
  }, []);

  // -------------------------------
  // 2️⃣ Fetch Cart Items
  // -------------------------------
  useEffect(() => {
    const fetchCart = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Please login first!");
        router.push("/login");
        return;
      }

      const token = localStorage.getItem("token");

      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/cart/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const items: CartItem[] = res.data || [];
        setCartItems(items);

      } catch (err) {
        console.error("Fetch Cart Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [router]);

  // -------------------------------
  // 3️⃣ Convert Prices
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

    if (cartItems.length > 0 && currency) {
      convertAll();
    }
  }, [cartItems, currency]);

  // -------------------------------
  // 4️⃣ Calculate Total
  // -------------------------------
  useEffect(() => {
    const cartTotal = cartItems.reduce((sum, item) => {
      const price = convertedPrices[item._id] || 0;
      return sum + price * item.quantity;
    }, 0);
    setTotal(cartTotal);
  }, [convertedPrices, cartItems]);

  // -------------------------------
  // 5️⃣ Handle Proceed
  // -------------------------------
  const handleProceed = () => {
    if (!name || !address || !city || !state || !pincode || !phone || !email) {
      alert("Please fill all fields.");
      return;
    }

    const shippingData: ShippingInfo = {
      name,
      address,
      city,
      state,
      pincode,
      phone,
      email,
    };
    localStorage.setItem("shippingInfo", JSON.stringify(shippingData));

    router.push(`/paymentpage?total=${total}&currency=${currency}`);
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (!cartItems || cartItems.length === 0)
    return <p className="p-4">Your cart is empty.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Shipping Information</h1>

      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between py-1">
            <p>
              {item.product.name} ({item.selectedMetal})
            </p>
            <p>
              {currencySymbol[currency] || currency}{" "}
              {((convertedPrices[item._id] || 0) * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}

        <div className="border-t mt-2 pt-2 flex justify-between font-semibold text-lg">
          <span>Total:</span>
          <span>
            {currencySymbol[currency] || currency} {total.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Mobile Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
      </div>

      <button
        onClick={handleProceed}
        className="w-full mt-6 py-3 bg-[#43825c] text-white font-semibold rounded-lg hover:bg-[#095c5c] transition-colors"
      >
        Proceed to Payment
      </button>
    </div>
  );
}

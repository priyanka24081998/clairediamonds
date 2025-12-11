"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE = "https://claireapi.onrender.com/api";

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
                const res = await fetch(`${API_BASE}/cart/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data: CartItem[] = await res.json();
                setCartItems(data || []);
                console.log("Fetched cart data:", data);


                // Calculate total dynamically
                const cartTotal = (data || []).reduce((sum, item) => {
                    const itemPrice = item.product.price[item.selectedMetal] || 0;
                    return sum + itemPrice * item.quantity;
                }, 0);
                setTotal(cartTotal);

                const userCurrency = localStorage.getItem("currency") || "USD";
                setCurrency(userCurrency);
            } catch (error) {
                console.error("Error fetching cart:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [router]);


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
                            {currency} {(item.product.price[item.selectedMetal] * item.quantity).toFixed(2)}
                        </p>
                    </div>
                ))}

                <div className="border-t mt-2 pt-2 flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>
                        {currency} {total.toFixed(2)}
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

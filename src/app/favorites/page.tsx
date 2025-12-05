"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Philosopher } from "next/font/google";
import { getLocation } from "@/lib/getLocation";
import { convertCurrency } from "@/lib/convertCurrency";
import { currencySymbol } from "@/lib/currencySymbol";
import { currencyMap } from "@/lib/currencyMap";

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface Product {
    _id: string;
    name: string;
    images: string[];
    price: Record<string, number>;
}

interface FavoriteItem {
    _id: string;
    productId: string;
    product: Product;
}

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
    const [currency, setCurrency] = useState("USD");
    const [converted, setConverted] = useState<Record<string, Record<string, number>>>({});
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const API_BASE = "https://claireapi.onrender.com";

    useEffect(() => {
        const id = localStorage.getItem("userId");
        setUserId(id);
    }, []);

    useEffect(() => {
        async function loadCurrency() {
            try {
                const loc = await getLocation();
                if (loc) {
                    const mapped = currencyMap[loc.country] || loc.currency || "USD";
                    setCurrency(mapped);
                }
            } catch (err) {
                console.error("Currency detection error:", err);
                setCurrency("USD");
            }
        }
        loadCurrency();
    }, []);

    useEffect(() => {
        if (!userId) return;

        async function loadFavorites() {
            try {
                setLoading(true);
                const res = await axios.get(`${API_BASE}/favorites/${userId}`);
                const validFavorites = (res.data || []).filter((f: unknown): f is FavoriteItem => {
                    return f !== null && typeof f === "object" && "product" in f;
                });
                setFavorites(validFavorites);
            } catch (err) {
                console.error("Fetch favorites error:", err);
                setFavorites([]);
            } finally {
                setLoading(false);
            }
        }

        loadFavorites();
    }, [userId]);

    useEffect(() => {
        async function convertAll() {
            const map: Record<string, Record<string, number>> = {};

            for (const fav of favorites) {
                if (!fav || !fav.product) continue;
                map[fav._id] = {};
                for (const metal of Object.keys(fav.product.price)) {
                    const base = fav.product.price[metal] || 0;
                    const convertedPrice = await convertCurrency(base, "USD", currency);
                    map[fav._id][metal] = Number(convertedPrice);
                }
            }
   
            setConverted(map);
        }

        if (favorites.length > 0) convertAll();
    }, [favorites, currency]);

    const removeFavorite = async (productId: string) => {
        if (!userId) return;
        try {
            await axios.delete(`${API_BASE}/favorites`, {
                data: { userId, productId },
            });
            setFavorites(favorites.filter(f => f.productId !== productId));
        } catch (err) {
            console.error(err);
            alert("Failed to remove favorite.");
        }
    };

    const handleAddToCartAndRemove = async (productId: string, selectedMetal: string) => {
        if (!userId) {
            alert("Please login first.");
            return;
        }

        try {
            await axios.post(`${API_BASE}/cart`, {
                userId,
                productId,
                quantity: 1,
                selectedMetal,
            });

            await axios.delete(`${API_BASE}/favorites`, {
                data: { userId, productId },
            });

            setFavorites(favorites.filter(f => f.productId !== productId));
        } catch (err) {
            console.error(err);
            alert("Failed to move product to cart");
        }
    };

    if (loading) return <p className="p-6 text-center">Loading favorites...</p>;

    if (!favorites.length) return <p className="p-6 text-center">No favorites added yet.</p>;

    return (
        <div className="p-6">
<h1
        className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#43825c] text-center font-bold mb-6 ${philosopher.className}`}
      >
        Your Favorites
      </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favorites.map(fav => {
                    if (!fav || !fav.product) return null;

                    const product = fav.product;
                    const productConverted = converted[fav._id] || {};
                    const defaultPrice = productConverted["silver"] || 0;

                    return (
                        <div key={fav._id} className="border rounded-xl p-4 shadow-md bg-white relative group">

                            {/* Clickable overlay */}
                            <Link
                                href={`/products/${product._id}`}
                                className="absolute inset-0 z-10"
                            >
                                <span className="sr-only">{product.name}</span>
                            </Link>

                            {/* Image */}
                            <Image
                                src={product.images?.[0] || "/placeholder.jpg"}
                                alt={product.name}
                                width={300}
                                height={250}
                                className="rounded-xl w-full h-48 object-cover"
                            />

                            {/* Name */}
                            <h2 className="text-lg font-semibold mt-3 relative z-20">{product.name}</h2>

                            {/* Price */}
                            <p className="text-[#43825c] font-bold mt-1 relative z-20">
                                {currencySymbol[currency] || currency} {defaultPrice.toFixed(2)}
                            </p>

                            {/* SELECT METAL */}
                            <select
                                id={`metal-${product._id}`}
                                className="mt-3 border px-2 py-1 rounded w-full text-[16px] relative z-20"
                            >
                                {Object.keys(product.price).map(metal => (
                                    <option key={metal} value={metal}>
                                        {metal.toUpperCase()} — {currencySymbol[currency]}{" "}
                                        {(productConverted[metal] || 0).toFixed(2)}
                                    </option>
                                ))}
                            </select>

                            {/* BUTTONS */}
                            <div className="flex justify-between mt-4 relative z-20">
                                <button
                                    onClick={() => removeFavorite(product._id)}
                                    className="text-red-500 font-semibold"
                                >
                                    Remove
                                </button>

                                <Link href="/cartpage">
                                    <button
                                        onClick={() => {
                                            const select = document.getElementById(
                                                `metal-${product._id}`
                                            ) as HTMLSelectElement;
                                            const metal = select?.value || "silver";
                                            handleAddToCartAndRemove(product._id, metal);
                                        }}
                                        className="bg-[#43825c] text-white px-3 py-1 rounded-lg"
                                    >
                                        Add to Cart
                                    </button>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Philosopher } from "next/font/google";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa6";
import { Accordion, AccordionSummary, AccordionDetails, } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getLocation } from "@/lib/getLocation";      // ✅ FIXED
import { convertCurrency } from "@/lib/convertCurrency";
import { currencyMap } from "@/lib/currencyMap";
import { currencySymbol } from "@/lib/currencySymbol";
import router from "next/router";

const philosopher = Philosopher({
    subsets: ["latin"],
    weight: ["400", "700"],
});


interface VideoObject {
    url: string;
    public_id: string;
}


interface Product {
    _id: string;
    name: string;
    description: string;
    price?: {
        silver?: number;
        "10k_yellow_gold"?: number;
        "10k_rose_gold"?: number;
        "10k_white_gold"?: number;
        "14k_yellow_gold"?: number;
        "14k_rose_gold"?: number;
        "14k_white_gold"?: number;
        "18k_yellow_gold"?: number;
        "18k_rose_gold"?: number;
        "18k_white_gold"?: number;
        platinum?: number;
    };
    images: string[];
    videos: (string | VideoObject)[];
    diamond: string;
    cut: string;
    color: string;
    clarity: string;
    weight: string;
    categoryId: {
        _id: string;
        categoryName: string;
    };
    subCategoryId: {
        _id: string;
        subCategoryName: string;
    };
}

const metalImageMap: Record<string, string> = {

    "10k_yellow_gold": "goldmetal.png",
    "10k_rose_gold": "rosemetal.png",
    "10k_white_gold": "whitemetal.png",
    "14k_yellow_gold": "goldmetal.png",
    "14k_rose_gold": "rosemetal.png",
    "14k_white_gold": "whitemetal.png",
    "18k_yellow_gold": "goldmetal.png",
    "18k_rose_gold": "rosemetal.png",
    "18k_white_gold": "whitemetal.png",
    silver: "silvermetal.png",
    platinum: "platinummetal.png",
};

const ringSizes = [
    "3", "3.25", "3.5", "3.75",
    "4", "4.25", "4.5", "4.75",
    "5", "5.25", "5.5", "5.75",
    "6", "6.25", "6.5", "6.75",
    "7", "7.25", "7.5", "7.75",
    "8", "8.25", "8.5", "8.75",
    "9", "9.25", "9.5", "9.75",
    "10", "10.25", "10.5", "10.75",
    "11", "11.25", "11.5", "11.75",
    "12", "12.25", "12.5", "12.75",
    "13", "13.25", "13.5", "13.75",
    "14", "14.25", "14.5", "14.75",
    "15", "15.25", "15.5", "15.75",
];

const getMetalDisplayName = (key: string) => {
    if (key === "silver") return "Silver";
    if (key === "platinum") return "Platinum";

    return key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
};

export default function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = React.use(params);
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeMedia, setActiveMedia] = useState<{ type: "image" | "video"; src: string }>({ type: "image", src: "/placeholder.jpg" });
    const [selectedMetal, setSelectedMetal] = useState<string>("silver"); // default to silver
    const [price, setPrice] = useState<number>(0);
    const [open, setOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);

    const [currency, setCurrency] = useState("USD");
    const [convertedPrices, setConvertedPrices] = useState<Record<string, number>>({});
    const [customizeOpen, setCustomizeOpen] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
        setUserId(storedUserId);
    }
}, []);
    const API_BASE = "https://claireapi.onrender.com";

    const videoRef = useRef<HTMLVideoElement>(null);


    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                const response = await axios.get(
                    `https://claireapi.onrender.com/product/${id}`
                );
                const data = response.data?.data || response.data;
                setProduct(data);
                setActiveMedia({ type: "image", src: data?.images?.[0] || "/placeholder.jpg" });
                setPrice(data?.price?.silver || 0); // default price = silver
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);
  
    // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


    // Update price when metal changes
    useEffect(() => {
        if (product && selectedMetal) {
            setPrice(product.price?.[selectedMetal as keyof typeof product.price] || 0);
        }
    }, [selectedMetal, product]);
    // 👉 2. Detect User Country + Currency
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

    // 👉 3. Convert every product price to detected currency
    useEffect(() => {
        const convertPrice = async () => {
            if (!product || !selectedMetal) return;

            const basePrice = product.price?.[selectedMetal as keyof typeof product.price] || 0;
            const converted = await convertCurrency(basePrice, "USD", currency);

            setConvertedPrices({ [product._id]: converted });
        };

        convertPrice();
    }, [product, selectedMetal, currency]);

    useEffect(() => {
        if (activeMedia.type === "video" && videoRef.current) {
            videoRef.current.load();
            videoRef.current.play().catch(() => { });
        }
    }, [activeMedia]);

    // Check if this product is already in favorites
    useEffect(() => {
        if (!userId || !product) return;

        const fetchFavorites = async () => {
            try {
                const res = await axios.get(`${API_BASE}/favorites/${userId}`);
                // specify type instead of any
                const favorites: { productId: string }[] = res.data;
                setIsFavorite(favorites.some(item => item.productId === product._id));
            } catch (err) {
                console.error(err);
            }
        };

        fetchFavorites();
    }, [userId, product]);

    // load userId on client
useEffect(() => {
  const storedUserId = localStorage.getItem("userId");
  if (storedUserId) {
    setUserId(storedUserId);
  }
}, []);

const handleAddToCart = async () => {
  if (!product?._id) {
    alert("Product not found!");
    return;
  }

  const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("Please login first!");
    return;
  }

  setLoading(true);

  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${API_BASE}/cart`,
      { userId, productId: product._id, quantity: Number(quantity) },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("Add to Cart response:", res.data);

    if (res.data?._id) {
        console.log(res.data._id);
        
      alert("Product added to cart!");
      // Delay router.push to make sure alert finishes
      setTimeout(() => {
        router.push("/cartpage");
      }, 50);
      return;
    }

    alert("Failed to add to cart");

  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("Cart Error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Failed to add to cart");
    } else {
      console.error("Unexpected error:", err);
      alert("Failed to add to cart");
    }
  } finally {
    setLoading(false);
  }
};





    // Toggle wishlist / favorite
    const toggleFavorite = async () => {
        if (!userId || !product) return alert("Please login first!");
        try {
            if (isFavorite) {
                await axios.delete(`${API_BASE}/favorites`, { data: { userId, productId: product._id } });
                setIsFavorite(false);
            } else {
                await axios.post(`${API_BASE}/favorites`, { userId, productId: product._id });
                setIsFavorite(true);
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };

    if (loading) return <p className="text-center py-10">Loading...</p>;
    if (!product) return <p className="text-center py-10">Product not found.</p>;

    return (
        <div  className="container mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT SIDE - IMAGE & VIDEO SLIDER */}
            <div className="flex flex-col lg:flex-row gap-4">

                {/* Thumbnails — LEFT on desktop */}
                <div className="lg:h-[500px] lg:overflow-y-auto order-2 lg:order-1 w-full lg:w-1/5">
                    <div
                        className="
            flex 
            flex-row        /* mobile: thumbnails horizontal */
            md:flex-row     /* tablet: thumbnails horizontal */
            lg:flex-col     /* desktop: thumbnails vertical */
            gap-3 
            
            overflow-x-auto
         
        "
                    >
                        {product.images.map((img, idx) => (
                            <div
                                key={`img-${idx}`}
                                onClick={() => setActiveMedia({ type: "image", src: img })}
                                className={`border rounded-lg overflow-hidden cursor-pointer min-w-[70px] md:min-w-[90px] ${activeMedia.src === img ? "border-black" : "border-gray-300"
                                    }`}
                            >
                                <Image
                                    src={img}
                                    alt={`Thumb ${idx}`}
                                    width={90}
                                    height={90}
                                    className="object-cover w-[70px] h-[70px] md:w-[90px] md:h-[90px]"
                                />
                            </div>
                        ))}

                        {product.videos.map((vidObj, idx) => {
                            const vid = typeof vidObj === "string" ? vidObj : vidObj.url; // handle old data too
                            return (
                                <div
                                    key={`vid-${idx}`}
                                    onClick={() => setActiveMedia({ type: "video", src: vid })}
                                    className={`border rounded-lg relative cursor-pointer min-w-[70px] md:min-w-[90px] ${activeMedia.src === vid ? "border-black" : "border-gray-300"
                                        }`}
                                >
                                    <video
                                        width={90}
                                        height={90}
                                        className="object-cover w-[70px] h-[70px] md:w-[90px] md:h-[90px]"
                                    >
                                        <source src={vid} type="video/mp4" />
                                    </video>

                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-600 opacity-50">
                                        <svg
                                            className="w-6 h-6 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M4 2v20l18-10L4 2z" />
                                        </svg>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>

                {/* Main Display — RIGHT on desktop */}
                <div className="flex-1 order-1 lg:order-2">
                    {activeMedia.type === "video" ? (
                        <video
                            ref={videoRef}
                            controls
                            controlsList="nodownload"
                            autoPlay
                            muted
                            loop
                            className="rounded-2xl object-cover w-full h-[350px] sm:h-[420px] md:h-[480px] lg:h-[500px]"
                            key={activeMedia.src} // force React to remount video
                        >
                            <source src={activeMedia.src} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <Image
                            src={activeMedia.src}
                            alt={product.name}
                            width={1200}
                            height={800}
                            className="rounded-2xl object-cover md:object-contain w-full h-[350px] sm:h-[420px] md:h-[400px] lg:h-[500px]"
                        />
                    )}

                </div>
            </div>

            {/* RIGHT SIDE - PRODUCT DETAILS */}
            <div ref={dropdownRef} className="flex flex-col gap-4 md:py-6 font-sans">
                <h1
                    className={`text-[20px] md:text-3xl text-[#43825c] capitalize font-bold md:mb-2 ${philosopher.className}`}>
                    {product.name}
                </h1>

                {/* PRICE */}
                <p className={`${philosopher.className} text-[#43825c] font-bold text-lg md:mt-3`}>
                    {convertedPrices[product._id] ? (
                        <span>
                            {currencySymbol[currency] || currency} {convertedPrices[product._id].toFixed(2)}
                            <br /> <span className="hidden">{price.toFixed(2)}</span>
                        </span>
                    ) : (
                        <span>
                            {currencySymbol["USD"] || "USD"} {product.price?.[selectedMetal as keyof typeof product.price]?.toFixed(2) || "0.00"}
                        </span>
                    )}
                </p>

                {/* Metal Variant */}
                <div className="flex flex-col gap-2">
                    <label className="font-medium">
                        Metal type: {selectedMetal ? getMetalDisplayName(selectedMetal) : ""}
                    </label>
                    <div className="grid grid-cols-6 md:grid-cols-12">
                        {Object.entries(product.price ?? {})
                            .sort(([keyA], [keyB]) => (keyA === "silver" ? -1 : keyB === "silver" ? 1 : 0))  // only metals with a price
                            .map(([metalKey]) => (
                                <div
                                    key={metalKey}
                                    onClick={() => setSelectedMetal(metalKey)}

                                >
                                    <Image
                                        src={`/assets/${metalImageMap[metalKey]}`}
                                        alt={metalKey.replaceAll("_", " ")}
                                        width={1200}
                                        height={800}
                                        className={`w-[35px] h-[35px] p-[2px] cursor-pointer border-1 rounded-full ${selectedMetal === metalKey ? "border-black" : "border-none"
                                            }`}
                                    />
                                    <span className="text-xs mt-1 text-center">
                                        {metalKey === "silver"
                                            ? "Silver"
                                            : metalKey === "platinum"
                                                ? "Platinum"
                                                : metalKey.split("_")[0].toUpperCase()}
                                    </span>
                                </div>
                            ))}
                    </div>
                </div>


                {/* Ring Size */}
                <div className="relative inline-block text-left mt-2">
                    {/* Label */}
                    <div className="gap-2 flex items-center">
                        <label className="font-medium">Ring Size : (US) </label>

                        {/* Button */}
                        <button
                            onClick={() => setOpen(!open)}
                            className="border  rounded-lg px-3 py-1 bg-white shadow-sm"
                        >
                            {selectedSize || "Select Size"}
                        </button>
                    </div>

                    {/* Dropdown */}
                    {open && (
                        <div className="absolute left-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-2 z-50">
                            <div className="grid grid-cols-4 gap-2 max-h-60 overflow-y-auto">
                                {ringSizes.map((size) => (
                                    <div
                                        key={size}
                                        onClick={() => {
                                            setSelectedSize(size);
                                            setOpen(false);
                                        }}
                                        className="cursor-pointer border rounded-md px-2 py-1 text-center hover:bg-gray-100"
                                    >
                                        {size}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>


                {/* Quantity Selector */}


                <div className="flex mr-[300px] sm:mr-[0px] items-center justify-between border rounded-lg px-2 py-1 w-[120px] lg:w-[150px]">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-2 text-lg"
                    >
                        -
                    </button>

                    <span className="font-medium">{quantity}</span>

                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-2 text-lg"
                    >
                        +
                    </button>
                </div>
                <div className="flex items-center lg:justify-start w-full gap-2  ">

                    {/* Add to Cart */}
                    <Link href="" className="w-full">
                        <button
                            onClick={handleAddToCart}
                              disabled={loading || !userId}

                            className="px-4 py-2 bg-[#43825c] text-white rounded-lg w-full"
                        >
                            {loading ? "Adding..." : "Add to Cart"}
                        </button>
                    </Link>


                    {/* Wishlist */}
                    <Link href="">
                        <button
                            onClick={toggleFavorite}
                            className="p-[7px] border border-gray-400 rounded-lg w-[50px] flex justify-center"
                        >
                            <FaRegHeart
                                className={`w-6 h-6 ${isFavorite ? "text-red-500" : "text-[#9f7d48]"}`}
                            />
                        </button>
                    </Link>

                </div>

                {/* Customise */}
                <div className="">
                    <Link href="">
                        <button
                            onClick={() => setCustomizeOpen(true)}
                            className="px-4 py-2 bg-[#9f7d48] text-white rounded-lg w-full capitalize"
                        >
                            design Customise
                        </button>
                    </Link>
                </div>

                <Dialog
                    open={customizeOpen}
                    onClose={() => setCustomizeOpen(false)}
                    fullWidth
                    maxWidth="xs"
                    PaperProps={{
                        className:
                            "rounded-2xl p-2 sm:p-6 overflow-hidden h-[300px] sm:h-[380px]",
                    }}
                >
                    {/* Close Button */}
                    <IconButton
                        onClick={() => setCustomizeOpen(false)}
                        className="!absolute right-3 top-3 text-gray-600 hover:text-black"
                    >
                        <CloseIcon />
                    </IconButton>

                    {/* Title */}
                    <DialogTitle
                        className="font-sans
                                   text-center text-[#9f7d48] font-bold leading-tight
                                   text-[18px] sm:text-[22px] md:text-[24px]
                                   mt-4
                                 "
                    >
                        Customise Your Dream Jewelry
                    </DialogTitle>

                    {/* Description */}
                    <DialogContent className="md:mt-[20px] overflow-hidden">
                        <p className="text-center text-gray-600 text-[14px] mb-2 font-sans">
                            Choose how you want to customise your jewelry.
                        </p>

                        {/* Button Section */}
                        <div className="flex flex-col gap-4 mt-4">

                            {/* Virtual Appointment */}
                            <Link href="/virtual-appointment">
                                <button
                                    className="
            w-full bg-[#43825c] hover:bg-[#356c4c]
            text-white rounded-lg py-1 md:py-3
            text-[16px] font-medium font-sans
          "
                                >
                                    Virtual Appointment
                                </button>
                            </Link>

                            {/* WhatsApp Chat */}
                            <a href="https://wa.me/916354518849" target="_blank">
                                <button
                                    className="font-sans
            w-full bg-green-600 hover:bg-green-700
            text-white rounded-lg py-1 md:py-3
            text-[16px] font-medium
          "
                                >
                                    Start WhatsApp Chat
                                </button>
                            </a>

                        </div>
                    </DialogContent>

                    {/* Bottom Close Action */}
                    <DialogActions className="flex justify-center">
                        <button
                            onClick={() => setCustomizeOpen(false)}
                            className="text-gray-700 hover:text-black font-medium font-sans"
                        >
                            Close
                        </button>
                    </DialogActions>
                </Dialog>



                {/* accordions */}
                <div className="">
                    <Accordion className="w-full mt-3">
                        <AccordionSummary className="text-lg font-sans font-medium capitalize" expandIcon={<ExpandMoreIcon />}>
                            product Description
                        </AccordionSummary>
                        <AccordionDetails>
                            <p className="text-gray-700 font-sans whitespace-pre-wrap">
                                {product.description}
                            </p>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="w-full mt-2 font-sans rounded-lg">
                        <AccordionSummary className="text-lg font-sans font-medium capitalize" expandIcon={<ExpandMoreIcon />}>
                            additional information
                        </AccordionSummary>
                        <AccordionDetails className="capitalize font-sans">
                            <ul>
                                <li>
                                    <strong>Jewelry Style : </strong> {product.categoryId?.categoryName || "N/A"}
                                </li>
                                <li>
                                    <strong>Jewelry Style : </strong> {product.subCategoryId?.subCategoryName || "N/A"}
                                </li>
                                <li>
                                    <strong>Stone Type : </strong> {product.diamond || "N/A"}
                                </li>
                                <li>
                                    <strong>Stone Shape :</strong> {product.cut || "N/A"}
                                </li>
                                <li>
                                    <strong>Diamond Color :</strong> {product.color || "N/A"}
                                </li>
                                <li>
                                    <strong>Stone clarity :</strong> {product.clarity || "N/A"}
                                </li>
                                <li>
                                    <strong>carat weight :</strong> {product.weight || "N/A"}
                                </li>
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="w-full mt-3">
                        <AccordionSummary className="text-lg font-sans font-medium capitalize" expandIcon={<ExpandMoreIcon />}>
                            Jewelry Certification
                        </AccordionSummary>
                        <AccordionDetails>
                            <p className="text-gray-700 font-sans whitespace-pre-wrap">
                                For rings featuring a center diamond exceeding 0.25 CT, an IGI certification will be included. Certifications for colored gemstones or other stones can be arranged upon request.
                            </p>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="w-full mt-3">
                        <AccordionSummary className="text-lg font-sans font-medium capitalize" expandIcon={<ExpandMoreIcon />}>
                            Shipping details
                        </AccordionSummary>
                        <AccordionDetails>
                            <p className="text-gray-700 font-sans whitespace-pre-wrap">
                                Worldwide Complimentary Express Shipping (5–7 Business Days)
                            </p>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="w-full mt-3">
                        <AccordionSummary className="text-lg font-sans font-medium capitalize" expandIcon={<ExpandMoreIcon />}>
                            return and exchange
                        </AccordionSummary>
                        <AccordionDetails>
                            <p className="text-gray-700 font-sans whitespace-pre-wrap">
                                <span className="font-medium">30 Day Refund Policy</span> <br /><br />
                                Our commitment to your satisfaction ensures hassle-free returns and refunds when you purchase from <a href="https://www.clairediamonds.com/" className="text-[#43825c]"><u>Claire Diamonds.</u></a><br />
                                The returns policy allows you to request a refund within 30 days from the date of delivery. Please note that after 30 days, we are unable to offer a refund or exchange, except in the case of defective or damaged goods.
                                <br />
                                Only one return per order is permitted.
                            </p>
                        </AccordionDetails>
                    </Accordion>

                </div>
            </div>
        </div>
    );
}

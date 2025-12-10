"use client"


import Link from "next/link";
import { useEffect, useState } from "react";

export default function PaymentSuccess() {
    const [showModal, setShowModal] = useState(false);
//     useEffect(() => {
//   const token = localStorage.getItem("token");
//   const userId = localStorage.getItem("userId");
//   if (!token || !userId) {
//     // user logged out or session expired
//     localStorage.removeItem("cartItems"); // extra safety
//   }
// }, []);


    useEffect(() => {
        setShowModal(true);
    }, []);
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
            fetch(`/api/paypal/capture-order?token=${token}`);
        }
    }, []);


    return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
        {showModal && (
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-xl font-bold mb-4">Payment Successful 🎉</h2>
                <p className="mb-4">Your payment was not completed. Please try again.</p>
                <div className="grid grid-cols-2">
                    <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => setShowModal(false)}
                >
                    Close
                </button>
                <Link href=''>
                     <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    
                >
                    My Orders
                </button>
                </Link>
                </div>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => setShowModal(false)}
                >
                    Close
                </button>
            </div>
        )}
    </div>
    )
}

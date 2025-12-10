"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


export default function PaymentCancel() {
  const [showModal, setShowModal] = useState(false);
    const router = useRouter();


  useEffect(() => {
    setShowModal(true);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {showModal && (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold mb-4">Payment Cancelled ❌</h2>
          <p className="mb-4">Your payment was not completed. Please try again.</p>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => router.push("/cartpage")}
          >
            Go to Cart Now
          </button>
        </div>
      )}
    </div>
  );
}

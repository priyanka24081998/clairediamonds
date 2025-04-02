"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Verifyotp = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (!storedEmail) {
      router.push("/signup");
    }
    setEmail(storedEmail || "");
  }, [router]);

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.removeItem("email");
        localStorage.setItem("token", "fake-jwt-token");
        router.push("/");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f4f1f0]">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-semibold text-[#43825c] text-center mb-4">
          Verify Your OTP
        </h2>
        <p className="text-center text-[#9f7d48] mb-6">
          Enter the OTP sent to <strong>{email}</strong>
        </p>

        <form onSubmit={handleVerifyOtp}>
          <div className="mb-4">
            <label className="block text-[#43825c] font-medium mb-2">OTP Code</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your OTP"
              required
            />
          </div>

          <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition duration-300">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verifyotp;

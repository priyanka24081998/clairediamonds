"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const VerifyOtp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email"); // Get email from URL params

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!email) {
      router.push("/signup"); // Redirect if email is missing
    }
  }, [email, router]);

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      console.log("Sending OTP verification request with:");
      console.log("Email:", email);
      console.log("OTP:", otp);
  
      const response = await axios.post("https://claireapi.onrender.com/users/verifyOtp", {
        email,
        otp,
      });
  
      console.log("API Response:", response.data); // Log full API response
  
      if (response.data.message === "User verified successfully!") {
        router.push(`/register?email=${email}`);
      } else {
        setError(response.data.message || "Invalid OTP. Please try again.");
      }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.response?.data || error.message);
          alert(error.response?.data?.message || "Failed to create user. Please try again.");
        } else if (error instanceof Error) {
          console.error("General error:", error.message);
          alert(error.message);
        } else {
          console.error("Unexpected error:", error);
          alert("An unknown error occurred. Please try again.");
        }
      }
  };
  return (
    <div className="flex justify-center items-center lg:min-h-screen bg-[#f4f1f0]">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-semibold text-[#43825c] text-center mb-4">
          Verify Your OTP
        </h2>
        <p className="text-center text-[#9f7d48] mb-6">
          Enter the OTP sent to <span className="font-semibold">{email}</span>
        </p>

        <form onSubmit={handleVerifyOtp}>
          <div className="mb-4">
            <label className="block text-[#43825c] font-medium mb-2">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter OTP"
              required  
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition duration-300"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;

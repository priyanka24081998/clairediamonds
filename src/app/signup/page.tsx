"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Philosopher } from "next/font/google";

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Get all users from API
      const allUsersResponse = await axios.get("https://claireapi.onrender.com/usermail/users");
      
      // Ensure response is an array before searching
      const users = Array.isArray(allUsersResponse.data) ? allUsersResponse.data : [];
      const user = users.find((u) => u.email === email);
  
      if (!user) {
        try {
            const response = await axios.post("https://claireapi.onrender.com/usermail", { email });
            console.log("User creation response:", response.data);
          }catch (error: unknown) {
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
      }
  
      // Send OTP to user (new or existing)
      await axios.post("https://claireapi.onrender.com/users/sendOtp", { email });
  
      // Redirect to OTP verification page
      router.push(`/verifyotp?email=${email}`);
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex justify-center items-center lg:min-h-screen bg-[#f4f1f0]">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2
          className={`text-2xl font-semibold text-[#43825c] text-center mb-4 ${philosopher.className}`}
        >
          Join Claire Family
        </h2>
        <p className="text-center text-[#9f7d48] mb-6">
          Create an account to explore timeless jewelry ✨
        </p>

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-[#43825c] font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition duration-300"
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-[#9f7d48] mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-[#43825c] font-medium">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;


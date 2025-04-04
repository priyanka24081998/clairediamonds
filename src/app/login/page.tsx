"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Philosopher } from "next/font/google";
import axios from "axios";

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://claireapi.onrender.com/auth/me", {
      credentials: "include", // Important for session cookies
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem("token", data.token);
          router.push("/profile");
        }
      })
      .catch((error) => console.error("Error fetching user:", error));
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("https://claireapi.onrender.com/login", {
        email,
        password,
      });

      console.log("Login response:", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        router.push("/"); // Redirect after successful login
      } else {
        alert("Login failed. No token received.");
      }
    } catch (error) {
      console.error("Login failed:", error);

      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Invalid email or password");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://claireapi.onrender.com/auth/google";
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f4f1f0]">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className={`text-2xl font-semibold text-[#43825c] text-center mb-4 ${philosopher.className}`}>
          Welcome to Claire
        </h2>
        <p className="text-center text-[#9f7d48] mb-6">
          Login to continue shopping for your perfect jewelry ✨
        </p>
        
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition duration-300 flex items-center justify-center gap-2"
        >
          <Image src="/google-icon.svg" alt="Google" width={20} height={20} />
          Sign in with Google
        </button>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-[#43825c] font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-[#43825c] font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex justify-between items-center mb-4">
            <Link href="/forgotpassword" className="text-yellow-600 text-sm">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-[#9f7d48] mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#43825c] font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

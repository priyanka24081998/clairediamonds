"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Philosopher } from "next/font/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface DecodedToken {
  email: string;
  name?: string;
}

type User = {
  name: string;
  email: string;
};

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://claireapi.onrender.com/users/",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);

        const decoded: DecodedToken = jwtDecode(token);
        setUser({
          name: decoded.name || decoded.email.split("@")[0],
          email: decoded.email,
        });

        router.push("/");
      } else {
        alert("Login failed: No token received.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f4f1f0]">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2
          className={`text-2xl font-semibold text-[#43825c] text-center mb-4 ${philosopher.className}`}
        >
          Welcome to Claire
        </h2>

        {user ? (
          <div className="text-center">
            <Image
              src="/default-avatar.png"
              alt="Profile"
              width={50}
              height={50}
              className="rounded-full mx-auto mb-3"
            />
            <p className="text-lg font-medium">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
            <Link
              href="/profile"
              className="block mt-4 text-yellow-600 font-medium"
            >
              Go to Profile
            </Link>
          </div>
        ) : (
          <>
            <p className="text-center text-[#9f7d48] mb-6">
              Login to continue shopping for your perfect jewelry ✨
            </p>

            <form onSubmit={handleLogin}>
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

              <div className="mb-6"> {/* Increased margin to push button down */}
                <label className="block text-[#43825c] font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter your password"
                  required
                />
                {/* ---------------------------------
                    🔑 FORGOT PASSWORD LINK ADDED HERE
                    --------------------------------- */}
                <div className="text-right mt-1">
                  <Link
                    href="/forgotpassword" // CHANGE THIS TO YOUR ACTUAL FORGOT PASSWORD ROUTE
                    className="text-sm text-[#43825c] hover:text-yellow-600 font-medium transition duration-150"
                  >
                    Forgot Password?
                  </Link>
                </div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
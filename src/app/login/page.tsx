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
type User = {
    profilePicture?: string;
    name: string;
    email: string;
  };
const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);



  // Fetch user authentication status
  useEffect(() => {
    axios
      .get("https://claireapi.onrender.com/auth/me", { withCredentials: true })
      .then((res) => {
        if (res.data.user) {
          setUser(res.data.user); // Store user info
          localStorage.setItem("token", res.data.token);
        }
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, []);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
  
    if (token) {
      localStorage.setItem("token", token);
      router.push("/"); // Redirect to homepage after login
    }
  }, [router]);

  // Handle normal login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://claireapi.onrender.com/users/",
        { email, password },
        { withCredentials: true }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user); // Store logged-in user
        router.push("/");
      } else {
        alert("Login failed. No token received.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login
  const handleGoogleLogin = () => {
    window.location.href = "https://claireapi.onrender.com/auth/google";
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f4f1f0]">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className={`text-2xl font-semibold text-[#43825c] text-center mb-4 ${philosopher.className}`}>
          Welcome to Claire
        </h2>

        {user ? (
          <div className="text-center">
            <Image src={user.profilePicture || "/default-avatar.png"} alt="Profile" width={50} height={50} className="rounded-full mx-auto mb-3" />
            <p className="text-lg font-medium">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
            <Link href="/profile" className="block mt-4 text-yellow-600 font-medium">
              Go to Profile
            </Link>
          </div>
        ) : (
          <>
            <p className="text-center text-[#9f7d48] mb-6">
              Login to continue shopping for your perfect jewelry ✨
            </p>

            <button
              onClick={handleGoogleLogin}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition duration-300 flex items-center justify-center gap-2"
            >
              <Image src="/assets/google-icon.png" alt="Google" width={20} height={20} />
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

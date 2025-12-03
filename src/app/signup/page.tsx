"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Philosopher } from "next/font/google";
import Image from "next/image";

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
});

type User = {
  profilePicture?: string;
  name: string;
  email: string;
};

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null); // ✅ Used for redirect below

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const allUsersResponse = await axios.get("https://claireapi.onrender.com/usermail/users");
      const users = Array.isArray(allUsersResponse.data) ? allUsersResponse.data : [];
      const existingUser = users.find((u) => u.emailId?.email === email);

      if (existingUser) {
        alert("Email already in use. Redirecting to login...");
        router.push("/login"); // ✅ Add redirect here
        return;
      }

      await axios.post("https://claireapi.onrender.com/usermail", { email });
      await axios.post("https://claireapi.onrender.com/users/sendOtp", { email });

      router.push(`/verifyotp?email=${email}`);
    } catch (error) {
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if already logged in
    axios
      .get("https://claireapi.onrender.com/auth/me", { withCredentials: true })
      .then((res) => {
        if (res.data.user) {
          setUser(res.data.user);
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
      router.push("/"); // Redirect after login
    }
  }, [router]);

  // ✅ Optional: If user is already logged in, redirect away from signup
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const newUser = urlParams.get("newUser"); // 👈 capture newUser
    const email = urlParams.get("email"); // 👈 capture email

    if (token) {
      localStorage.setItem("token", token);

      if (newUser === "true" && email) {
        router.push(`/register?email=${email}`); // 👈 redirect to register page
      } else {
        router.push("/"); // 👈 else go to homepage
      }
    }
  }, [router]);
  const handleGoogleLogin = () => {
    window.location.href = "https://claireapi.onrender.com/auth/google";
  };

  // On any page where user clicks "Sign in with Google"
const currentUrl = window.location.href; // current page
const googleLoginUrl = `/auth/google?redirect=${encodeURIComponent(currentUrl)}`;


  return (
    <div className="flex justify-center items-center lg:py-0 lg:min-h-screen bg-[#f4f1f0]">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2
          className={`text-2xl font-semibold text-[#43825c] text-center mb-4 ${philosopher.className}`}
        >
          Join Claire Family
        </h2>
        <p className="text-center text-[#9f7d48] mb-6">
          Create an account to explore timeless jewelry ✨
        </p>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white hover:bg-[#43825c] border border-[#43825c] text-[#43825c] hover:text-white font-semibold py-3 rounded-lg transition duration-300 flex items-center justify-center gap-2"
        >
          <Image src="/assets/google-icon.svg" alt="Google" width={20} height={20} />
          <a href={googleLoginUrl}>Sign in with Google</a>

        </button>
        <h4 className="text-center text-[#9f7d48] my-4">or</h4>
        <form onSubmit={handleSignup}>
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

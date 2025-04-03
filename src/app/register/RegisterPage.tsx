"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const Register = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email"); // Get email from URL params

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!email) {
      router.push("/signup"); // Redirect if email is missing
    }
  }, [email, router]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("https://claireapi.onrender.com/users/register", {
        name,
        lastname,
        email, 
        password,
      });

      if (response.data.message === "User registered successfully!") {
        alert("Registration successful! Please log in.");
        router.push("/login");
      } else {
        setError(response.data.error || "Registration failed. Please try again.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || "Failed to register. Please try again.");
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };  

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f4f1f0]">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-semibold text-[#43825c] text-center mb-4">
          Register Your Account
        </h2>

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-[#43825c] font-medium mb-2">First Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your first name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-[#43825c] font-medium mb-2">Last Name</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your last name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-[#43825c] font-medium mb-2">Email</label>
            <input
              type="email"
              value={email || ""}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
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

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition duration-300"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

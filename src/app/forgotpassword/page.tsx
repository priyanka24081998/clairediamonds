"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; 
import { Philosopher } from "next/font/google";
  
const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
});


export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter(); 
 
  // ✅ Step 1: Request OTP
  const handleRequestOtp = async () => {
    try {
      setLoading(true);
      const res = await axios.post("https://claireapi.onrender.com/users/forgotpassword", { email });
      setMessage(res.data.message);
      setStep(2);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setMessage(error.response?.data?.message || "Something went wrong.");
        } else {
          setMessage("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
  };

  // ✅ Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      const res = await axios.post("https://claireapi.onrender.com/users/verifyotpreset", { email, otp });
      setMessage(res.data.message);
      setStep(3);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setMessage(error.response?.data?.message || "Something went wrong.");
        } else {
          setMessage("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
  };

  // ✅ Step 3: Reset Password
  const handleResetPassword = async () => {
    try {
      setLoading(true);
      const res = await axios.post("https://claireapi.onrender.com/users/resetpassword", { email, newPassword });
      setMessage(res.data.message);
      setStep(4);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setMessage(error.response?.data?.message || "Something went wrong.");
        } else {
          setMessage("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f4f1f0]">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className={`text-2xl font-bold text-[#43825c] text-center mb-4 ${philosopher.className}`}>
          {step === 1 ? "Forgot Password" : step === 2 ? "Verify OTP" : "Reset Password"}
        </h2>

        {message && <p className="text-center text-red-500">{message}</p>}

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border rounded mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleRequestOtp}
              className="w-full bg-yellow-500 mt-6 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition duration-300"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-2 border rounded mt-2"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-yellow-500 mt-6 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition duration-300"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full p-2 border rounded mt-2"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              onClick={handleResetPassword}
              className="w-full bg-yellow-500 mt-6 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition duration-300"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}

        {step === 4 && (
          <p className="text-center text-green-500">Password reset successfully! You can now log in.</p>
        )}
        
      </div>
    </div>
  );
}

"use client";
import React from "react";

const LoginButton: React.FC = () => {
  const handleGoogleLogin = () => {
    window.location.href = "https://claireapi.onrender.com/auth/google";
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="px-4 py-2 bg-[#9f7d48] text-white rounded-lg hover:bg-[#815e36]"
    >
      Sign in with Google
    </button>
  );
};

export default LoginButton;

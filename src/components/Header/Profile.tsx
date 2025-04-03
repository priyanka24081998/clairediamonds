"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode"; // Install using `npm install jwt-decode`
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

interface DecodedToken {
  email: string;
}

const Profile: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return; // If no token, user is not logged in

    try {
      const decoded: DecodedToken = jwtDecode(token);
      setEmail(decoded.email);
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="relative">
      {/* Profile Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-[#9f7d48] font-cinzel py-1 rounded-lg focus:outline-none"
      >
        {email ? (
          <div className="flex items-center justify-center text-white bg-[#9f7d48] w-10 h-10 rounded-full text-xl font-bold">
            {email.charAt(0).toUpperCase()}
          </div>
        ) : (
          <FaUserCircle className="text-4xl" />
        )}{" "}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#9f7d48] border border-gray-300 shadow-lg rounded-md z-200">
          <ul className="py-2 text-sm text-[#f4f1f0]">
            {email ? (
              <>
                <li className="px-4 py-2 text-center font-semibold">
                  {email?.split("@")[0].charAt(0).toUpperCase() +
                    email?.split("@")[0].slice(1)}
                </li>
                <hr className="border-[#f4f1f0]" />
                <li>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-[#f4f1f0] hover:rounded-[50px] hover:text-[#43825c]"
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/orders"
                    className="block px-4 py-2 hover:bg-[#f4f1f0] hover:rounded-[50px] hover:text-[#43825c]"
                  >
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 hover:bg-[#f4f1f0] hover:rounded-[50px] hover:text-[#43825c]"
                  >
                    Settings
                  </Link>
                </li>
                <hr className="border-[#f4f1f0]" />
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-[#f4f1f0] hover:rounded-[50px] hover:text-[#43825c]"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/signup"
                    className="block px-4 py-2 hover:bg-[#f4f1f0] hover:rounded-[50px] hover:text-[#43825c]"
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="block px-4 py-2 hover:bg-[#f4f1f0] hover:rounded-[50px] hover:text-[#43825c]"
                  >
                    Log In
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;

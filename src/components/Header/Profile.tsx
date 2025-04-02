"use client";

import { useState } from "react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

const Profile: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-[#9f7d48] font-cinzel py-1 rounded-lg focus:outline-none"
      >
        <FaUserCircle className="text-4xl" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#9f7d48] border border-gray-300 shadow-lg rounded-md z-200">
          <ul className="py-2 text-sm text-[#f4f1f0]">
            {/* <li>
              <Link href="/profile" className="block px-4 py-2 hover:bg-[#f4f1f0] hover:rounded-[50px] hover:text-[#43825c]">
                My Profile
              </Link>
            </li>
            <li>
              <Link href="/orders" className="block px-4 py-2 hover:bg-[#f4f1f0] hover:rounded-[50px] hover:text-[#43825c]">
                My Orders
              </Link>
            </li>
            <li>
              <Link href="/settings" className="block px-4 py-2 hover:bg-[#f4f1f0] hover:rounded-[50px] hover:text-[#43825c]">
                Settings
              </Link>
            </li>
            <hr className="border-[#f4f1f0]" /> */}
            <li>
              <Link href="/signup" className="block px-4 py-2 hover:bg-[#f4f1f0] hover:rounded-[50px] hover:text-[#43825c]">
                Sign Up
              </Link>
            </li>
            <li>
              <Link href="/login" className="block px-4 py-2 hover:bg-[#f4f1f0] hover:rounded-[50px] hover:text-[#43825c]">
                Log In
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;

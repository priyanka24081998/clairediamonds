// "use client";

// import { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/navigation";
// import { jwtDecode } from "jwt-decode";
// import Link from "next/link";
// import { FaUserCircle } from "react-icons/fa";

// interface DecodedToken {
//   email: string;
//   name?: string;
// }

// const Profile: React.FC = () => {
//   const router = useRouter();
//   const [isOpen, setIsOpen] = useState(false);
//   const [user, setUser] = useState<DecodedToken | null>(null);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Grab token from URL or localStorage
//   useEffect(() => {
//     const urlToken = new URLSearchParams(window.location.search).get("token");
//     const storedToken = localStorage.getItem("token");
//     const token = urlToken || storedToken;

//     if (token) {
//       try {
//         const decoded: DecodedToken = jwtDecode(token);
//         setUser(decoded);

//         if (urlToken) localStorage.setItem("token", token);
//       } catch (error) {
//         console.error("Invalid token:", error);
//         localStorage.removeItem("token");
//       }
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsOpen(false);
//     setTimeout(() => {
//       router.push("/");
//     }, 100);
//   };

//   const getInitial = () => {
//     if (!user) return "?";
//     const name = user.name || user.email?.split("@")[0] || "G";
//     return name?.charAt(0)?.toUpperCase() || "?";
//   };

//   return (
//     <div ref={dropdownRef} className="relative">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex items-center text-[#9f7d48] font-cinzel py-1 rounded-lg focus:outline-none"
//       >
//         {user ? (
//           <span className="text-2xl bg-[#9f7d48] text-white rounded-full w-10 h-10 flex items-center justify-center">
//             {getInitial()}
//           </span>
//         ) : (
//           <FaUserCircle className="text-4xl" />
//         )}
//       </button>

//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-48 bg-[#9f7d48] border border-gray-300 shadow-lg rounded-md z-500">
//           <ul className="py-2 text-sm text-[#f4f1f0]">
//             {user ? (
//               <>
//                 <li className="px-4 py-2 text-center font-semibold">
//                   {user.name ||
//                     (user.email
//                       ? user.email.split("@")[0].replace(/^./, c => c.toUpperCase())
//                       : "User")}
//                 </li>
//                 <hr className="border-[#f4f1f0]" />
//                 <li>
//                   <Link
//                     href="/profile"
//                     className="block px-4 py-2 hover:bg-[#f4f1f0] hover:rounded-[50px] hover:text-[#43825c]"
//                   >
//                     My Profile
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/orders"
//                     className="block px-4 py-2 hover:bg-[#f4f1f0] hover:rounded-[50px] hover:text-[#43825c]"
//                   >
//                     My Orders
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/settings"
//                     className="block px-4 py-2 hover:bg-[#f4f1f0] hover:rounded-[50px] hover:text-[#43825c]"
//                   >
//                     Settings
//                   </Link>
//                 </li>
//                 <hr className="border-[#f4f1f0]" />
//                 <li>
//                   <button
//                     onClick={handleLogout}
//                     className="w-full text-left px-4 py-2 hover:bg-[#f4f1f0] hover:rounded-[50px] hover:text-[#43825c]"
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li>
//                   <Link
//                     href="/signup"
//                     className="block px-4 py-2 hover:bg-[#f4f1f0] hover:rounded-[50px] hover:text-[#43825c]"
//                   >
//                     Sign Up
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/login"
//                     className="block px-4 py-2 hover:bg-[#f4f1f0] hover:rounded-[50px] hover:text-[#43825c]"
//                   >
//                     Log In
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;

"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

interface User {
  email: string;
  name?: string;
}

const Profile: React.FC = () => {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage initially
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Listen to storage changes from other tabs/windows
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "user") {
        const newUser = e.newValue ? JSON.parse(e.newValue) : null;
        setUser(newUser);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null); // immediately remove user
    setIsOpen(false);
    router.push("/"); // redirect
  };

  const getInitial = () => {
    if (!user) return "?";
    const name = user.name || user.email?.split("@")[0] || "G";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-[#9f7d48] font-cinzel py-1 rounded-lg focus:outline-none"
      >
        {user ? (
          <span className="text-2xl bg-[#9f7d48] text-white rounded-full w-10 h-10 flex items-center justify-center">
            {getInitial()}
          </span>
        ) : (
          <FaUserCircle className="text-4xl" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#9f7d48] border border-gray-300 shadow-lg rounded-md z-50">
          <ul className="py-2 text-sm text-[#f4f1f0]">
            {user ? (
              <>
                <li className="px-4 py-2 text-center font-semibold">
                  {user.name ||
                    (user.email
                      ? user.email.split("@")[0].replace(/^./, (c) => c.toUpperCase())
                      : "User")}
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


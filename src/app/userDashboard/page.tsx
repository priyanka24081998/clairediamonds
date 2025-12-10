"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    email: string;
    name?: string;
}

type MenuOption = "profile" | "orders" | "address";

const UserDashboard: React.FC = () => {
    const router = useRouter();
    const [user, setUser] = useState<DecodedToken | null>(null);
    const [activeMenu, setActiveMenu] = useState<MenuOption>("profile");

    // Check token on mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login"); // redirect if not logged in
            return;
        }
        try {
            const decoded: DecodedToken = jwtDecode(token);
            setUser(decoded);
        } catch (error) {
            console.error("Invalid token", error);
            localStorage.removeItem("token");
            router.push("/login");
        }
    }, [router]);

    const renderContent = () => {
        switch (activeMenu) {
            case "profile":
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
                        <p>Name: {user?.name || "N/A"}</p>
                        <p>Email: {user?.email}</p>
                        {/* Add more profile info or form to edit */}
                    </div>
                );
            case "orders":
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">My Orders</h2>
                        <p>Here you can see all your orders.</p>
                        {/* Fetch and display user orders */}
                    </div>
                );
            case "address":
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">My Address</h2>
                        <p>Manage your saved addresses here.</p>
                        {/* Add address form or list */}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-[#9f7d48] text-white flex flex-col">
                <div className="p-6 font-bold text-xl border-b border-gray-300">
                    {`${user?.name || "User"}'s Dashboard`}
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <button
                        className={`w-full text-left px-4 py-2 rounded hover:bg-[#f4f1f0] hover:text-[#43825c] ${activeMenu === "profile" ? "bg-white text-[#43825c]" : ""
                            }`}
                        onClick={() => setActiveMenu("profile")}
                    >
                        Profile
                    </button>
                    <button
                        className={`w-full text-left px-4 py-2 rounded hover:bg-[#f4f1f0] hover:text-[#43825c] ${activeMenu === "orders" ? "bg-white text-[#43825c]" : ""
                            }`}
                        onClick={() => setActiveMenu("orders")}
                    >
                        Orders
                    </button>
                    <button
                        className={`w-full text-left px-4 py-2 rounded hover:bg-[#f4f1f0] hover:text-[#43825c] ${activeMenu === "address" ? "bg-white text-[#43825c]" : ""
                            }`}
                        onClick={() => setActiveMenu("address")}
                    >
                        Address
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                {renderContent()}
            </main>
        </div>
    );
};

export default UserDashboard;

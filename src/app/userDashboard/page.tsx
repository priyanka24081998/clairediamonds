"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  email: string;
  name?: string;
  userId?: string;
}

type MenuOption = "profile" | "orders" | "address";

interface OrderProduct {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  metal: string;
  size: string;
}

interface ShippingInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
}

interface UserOrder {
  _id: string;
  products: OrderProduct[];
  total: number;
  shipping: ShippingInfo;
  paypalOrderId: string;
  paypalStatus: string;
  createdAt: string;
}

const API_BASE = "https://claireapi.onrender.com";

const UserDashboard: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [activeMenu, setActiveMenu] = useState<MenuOption>("profile");
  const [orders, setOrders] = useState<UserOrder[]>([]);

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
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

  // Fetch user orders when activeMenu is "orders"
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.userId) return;
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/order/user-orders/${user.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data: UserOrder[] = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching user orders:", err);
      }
    };

    if (activeMenu === "orders") {
      fetchOrders();
    }
  }, [activeMenu, user]);

  const renderContent = () => {
    switch (activeMenu) {
      case "profile":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>
            <p>Name: {user?.name || "N/A"}</p>
            <p>Email: {user?.email}</p>
          </div>
        );
      case "orders":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Orders</h2>
            {orders.length === 0 && <p>No orders found.</p>}
            {orders.map((order) => (
              <div
                key={order._id}
                className="mb-4 p-4 border rounded-lg bg-white"
              >
                <p>
                  <strong>Order ID:</strong> {order.paypalOrderId}
                </p>
                <p>
                  <strong>Status:</strong> {order.paypalStatus}
                </p>
                <p>
                  <strong>Total:</strong> ${order.total.toFixed(2)}
                </p>
                <p>
                  <strong>Ordered At:</strong>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                <div className="mt-2">
                  <strong>Products:</strong>
                  <ul className="ml-4">
                    {order.products.map((p) => (
                      <li key={p._id}>
                        {p.name} ({p.metal}, Size: {p.size}) x {p.quantity} - $
                        {p.price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-2">
                  <strong>Shipping:</strong>
                  <p>
                    {order.shipping.name}, {order.shipping.address},{" "}
                    {order.shipping.city}, {order.shipping.state},{" "}
                    {order.shipping.pincode}
                  </p>
                  <p>Phone: {order.shipping.phone}</p>
                  <p>Email: {order.shipping.email}</p>
                </div>
              </div>
            ))}
          </div>
        );
      case "address":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Address</h2>
            <p>Manage your saved addresses here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-[#9f7d48] text-white flex flex-col">
        <div className="p-6 font-bold text-xl border-b border-gray-300">
          {`${user?.name || "User"}'s Dashboard`}
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            className={`w-full text-left px-4 py-2 rounded hover:bg-[#f4f1f0] hover:text-[#43825c] ${
              activeMenu === "profile"
                ? "bg-white text-[#43825c]"
                : ""
            }`}
            onClick={() => setActiveMenu("profile")}
          >
            Profile
          </button>
          <button
            className={`w-full text-left px-4 py-2 rounded hover:bg-[#f4f1f0] hover:text-[#43825c] ${
              activeMenu === "orders" ? "bg-white text-[#43825c]" : ""
            }`}
            onClick={() => setActiveMenu("orders")}
          >
            Orders
          </button>
          <button
            className={`w-full text-left px-4 py-2 rounded hover:bg-[#f4f1f0] hover:text-[#43825c] ${
              activeMenu === "address" ? "bg-white text-[#43825c]" : ""
            }`}
            onClick={() => setActiveMenu("address")}
          >
            Address
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8">{renderContent()}</main>
    </div>
  );
};

export default UserDashboard;

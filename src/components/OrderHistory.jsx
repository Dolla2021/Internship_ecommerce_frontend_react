import React, { useEffect, useState } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // This should be replaced by an authenticated API call in production
    const fetchOrders = async () => {
      setLoading(true);
      setError("");
      try {
        const resp = await fetch("http://localhost:8000/api/orders/user", {
          credentials: "include",
        });
        if (!resp.ok) throw new Error("Failed to load order history");
        const data = await resp.json();
        setOrders(data.orders || []);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && orders.length === 0 && <p>No orders found.</p>}
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="border p-4 rounded-lg shadow bg-white">
            <div className="flex justify-between mb-2">
              <div>
                <div className="font-semibold">
                  Order #{order._id.substring(0, 8)}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </div>
              </div>
              <div>
                <span
                  className={`px-2 py-1 rounded ${
                    order.status === "delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
            <div>
              <div className="font-medium mb-2">Items:</div>
              <ul className="list-disc pl-5">
                {order.items.map((item) => (
                  <li key={item.productId}>
                    {item.name} (x{item.quantity}) - ${item.price}
                  </li>
                ))}
              </ul>
              <div className="mt-2 font-semibold">
                Total: ${order.totalAmount}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
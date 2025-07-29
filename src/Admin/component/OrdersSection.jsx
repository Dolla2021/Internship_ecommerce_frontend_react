import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const OrdersSection = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/orders');
    setOrders(response.data);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching orders:', error);
    setLoading(false);
  }
};


  const filteredOrders = orders.filter((order) => {
    if (filter === 'All') return true;
    return order.status === filter;
  });

  const statusClasses = {
    Completed: 'bg-green-100 text-green-600',
    Pending: 'bg-yellow-100 text-yellow-600',
    Cancelled: 'bg-red-100 text-red-600',
  };

  const tabs = ['All', 'Completed', 'Pending', 'Cancelled'];

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Orders</h2>
        <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">+ Create Order</button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`pb-2 font-medium ${
              filter === tab
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-50 text-left text-sm text-gray-600">
              <th className="px-6 py-3">
                <input type="checkbox" />
              </th>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Product Name</th>
              <th className="px-6 py-3">Address</th>
              <th className="px-6 py-3">Order Date</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Payment Method</th>
              <th className="px-6 py-3">Delivery Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input type="checkbox" />
                </td>
                <td className="px-6 py-4 font-medium text-gray-800">#{order.order_id}</td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <img
                    src={order.product_image || 'https://via.placeholder.com/40'}
                    alt="Product"
                    className="w-10 h-10 object-cover rounded"
                  />
                  <span>{order.product_name}</span>
                </td>
                <td className="px-6 py-4">{order.address}</td>
                <td className="px-6 py-4">{order.order_date}</td>
                <td className="px-6 py-4">${order.price}</td>
                <td className="px-6 py-4">{order.payment_method}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusClasses[order.status] || 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-2 text-lg">
                  <button className="text-gray-500 hover:text-indigo-600">
                    <FaEye />
                  </button>
                  <button className="text-gray-500 hover:text-green-600">
                    <FaEdit />
                  </button>
                  <button className="text-gray-500 hover:text-red-600">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersSection;

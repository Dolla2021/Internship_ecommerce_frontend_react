// AdminPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import OrdersSection from './component/OrdersSection';
import ProductsSection from './component/ProductsSection';
import AnalyticsSection from './component/AnalyticsSection';
import CustomersSection from './component/CustomersSection';
import { products as importedProducts } from '../data/products'; // Import product data
import {
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaChartLine,
  FaPlus,
  FaBars,
  FaTimes,
  FaSearch,
} from 'react-icons/fa';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PieController,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PieController,
  Title,
  Tooltip,
  Legend
);
const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const chartRef = useRef(null);
  // Initialize products state with imported products data.
  const [products] = useState(importedProducts);
  const [orders, setOrders] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  // If you later decide to fetch orders from an API, you can keep this effect.
  useEffect(() => {
    // Fetching orders from API (or you can replace this with your static orders data)
    fetch('http://localhost:8000/api/orders')
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error('Error fetching orders:', error));
  }, []);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const salesChartData = {
    labels: ['2025-07-20', '2025-07-21', '2025-07-22', '2025-07-23', '2025-07-24', '2025-07-25'],
    datasets: [
      {
        label: 'Sales ($)',
        data: [1200, 1900, 3000, 2500, 4000, 5432],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
      },
    ],
  };
  const orderStatusChartData = {
    labels: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    datasets: [
      {
        label: 'Orders',
        data: [
          orders.filter((o) => o.status === 'Pending').length,
          orders.filter((o) => o.status === 'Shipped').length,
          orders.filter((o) => o.status === 'Delivered').length,
          orders.filter((o) => o.status === 'Cancelled').length,
        ],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
      },
    ],
  };
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        <nav className="flex flex-col gap-y-2 px-4">
          {['dashboard', 'products', 'orders', 'customers', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setIsSidebarOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-left ${
                activeTab === tab
                  ? 'bg-indigo-100 text-indigo-600 font-medium'
                  : 'text-gray-600'
              }`}
            >
              {tab === 'dashboard' && <FaChartLine />}
              {tab === 'products' && <FaBox />}
              {tab === 'orders' && <FaShoppingCart />}
              {tab === 'customers' && <FaUsers />}
              {tab === 'analytics' && <FaChartLine />}
              <span className="capitalize">{tab}</span>
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6 md:ml-64">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
              <FaPlus className="mr-1" /> Add Product
            </button>
            <img
              src="https://via.placeholder.com/30"
              className="rounded-full border-2 border-indigo-500"
              alt="Admin Avatar"
            />
            <button className="md:hidden text-gray-600" onClick={toggleSidebar}>
              {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
        {activeTab === 'dashboard' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <FaChartLine className="text-indigo-500 text-3xl" />
                  <div>
                    <p className="text-sm text-gray-500">Total Sales</p>
                    <p className="text-2xl font-bold text-gray-900">$5,432</p>
                    <p className="text-green-500 text-sm">↑ +15%</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <FaShoppingCart className="text-indigo-500 text-3xl" />
                  <div>
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">50</p>
                    <p className="text-red-500 text-sm">↓ -5%</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <FaUsers className="text-indigo-500 text-3xl" />
                  <div>
                    <p className="text-sm text-gray-500">Total Customers</p>
                    <p className="text-2xl font-bold text-gray-900">245</p>
                    <p className="text-green-500 text-sm">↑ +10%</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg md:col-span-2">
                <h2 className="text-lg font-semibold mb-2">Sales Trend</h2>
                <Bar data={salesChartData} options={{ responsive: true }} />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-lg font-semibold mb-2">Orders by Status</h2>
                <Pie data={orderStatusChartData} options={{ responsive: true }} />
              </div>
            </div>
            {/* Best Product & Top Selling Products */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white p-6 rounded-xl shadow-lg col-span-1">
                <h2 className="text-lg font-semibold mb-4">Best Product</h2>
                <div className="space-y-4">
                  <img
                    src="https://via.placeholder.com/300x150"
                    alt="Best Product"
                    className="rounded-lg w-full object-cover"
                  />
                  <h3 className="text-gray-800 font-semibold">Apple Airpods</h3>
                  <p className="text-sm text-gray-500">24 Jun 2022</p>
                  <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
                    Buy Now
                  </button>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg md:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Top Selling Products</h2>
                  <div className="flex gap-2 text-sm">
                    <button className="px-2 py-1 border rounded hover:bg-gray-100">All</button>
                    <button className="px-2 py-1 border rounded hover:bg-gray-100">1M</button>
                    <button className="px-2 py-1 border rounded hover:bg-gray-100">6M</button>
                    <button className="px-2 py-1 border rounded hover:bg-gray-100">1Y</button>
                  </div>
                </div>
                <div className="space-y-3">
                 {products
                    .sort((a, b) => (b.orders || 0) - (a.orders || 0)) // Sort by orders in descending order
                    .slice(0, 5) // Take only top 10 products
                    .map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between gap-4 p-2 hover:bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            className="w-10 h-10 rounded object-cover"
                            alt={item.name}
                          />
                          <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-xs text-gray-500">24 Jun 2022</p>
                          </div>
                        </div>
                        <p className="text-sm font-medium">${item.price}</p>
                        <p className="text-sm font-medium">{item.orders} Orders</p>
                        <p>
                          {item.stock > 0 ? (
                            <span className="text-green-600 text-sm">In stock</span>
                          ) : (
                            <span className="text-red-500 text-sm">Out of stock</span>
                          )}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </>
        )}
        {activeTab === 'products' && <ProductsSection products={products} />}
        {activeTab === 'orders' && <OrdersSection orders={orders} />}
        {activeTab === 'customers' && <CustomersSection />}
        {activeTab === 'analytics' && (
          <AnalyticsSection
            salesChartData={salesChartData}
            orderStatusChartData={orderStatusChartData}
          />
        )}
      </main>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};
export default AdminPage;
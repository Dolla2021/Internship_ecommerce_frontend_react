import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
const AnalyticsSection = () => {
  const [salesData, setSalesData] = useState({
    labels: [],
    datasets: []
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchAnalytics();
  }, []);
  const fetchAnalytics = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/analytics/sales');
      const data = response.data;
      
     setSalesData({
  labels: data.map(item => item.date),
  datasets: [{
    label: 'Sales',
    data: data.map(item => item.amount),
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setLoading(false);
    }
  };
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
          <Line data={salesData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="text-sm text-blue-600">Total Orders</h4>
              <p className="text-2xl font-bold">123</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="text-sm text-green-600">Revenue</h4>
              <p className="text-2xl font-bold">$12,345</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="text-sm text-yellow-600">Customers</h4>
              <p className="text-2xl font-bold">456</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="text-sm text-purple-600">Products</h4>
              <p className="text-2xl font-bold">789</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AnalyticsSection;
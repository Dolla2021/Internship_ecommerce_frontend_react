
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const CustomersSection = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const customersPerPage = 10;
  useEffect(() => {
    fetchCustomers();
  }, []);
  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/customers');
      setCustomers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setLoading(false);
    }
  };
  // Search functionality
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Sorting functionality
  const sortCustomers = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };
  const getSortedCustomers = () => {
    const sorted = [...filteredCustomers].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  };
  // Pagination
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = getSortedCustomers().slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Customers Management</h2>
      
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <table className="min-w-full">
          <thead>
            <tr>
              <th 
                className="px-6 py-3 border-b text-left cursor-pointer hover:bg-gray-50"
                onClick={() => sortCustomers('id')}
              >
                ID {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 border-b text-left cursor-pointer hover:bg-gray-50"
                onClick={() => sortCustomers('name')}
              >
                Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 border-b text-left cursor-pointer hover:bg-gray-50"
                onClick={() => sortCustomers('email')}
              >
                Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 border-b text-left cursor-pointer hover:bg-gray-50"
                onClick={() => sortCustomers('orders_count')}
              >
                Orders {sortConfig.key === 'orders_count' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-6 py-3 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer) => (
              <tr key={customer.id}>
                <td className="px-6 py-4 border-b">{customer.id}</td>
                <td className="px-6 py-4 border-b">{customer.name}</td>
                <td className="px-6 py-4 border-b">{customer.email}</td>
                <td className="px-6 py-4 border-b">{customer.orders_count}</td>
                <td className="px-6 py-4 border-b">
                  <button className="text-blue-500 hover:text-blue-700 mr-2">View Details</button>
                  <button className="text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="mt-4 flex justify-center">
          <nav className="flex items-center gap-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border disabled:opacity-50"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-1 rounded border ${
                  currentPage === index + 1 ? 'bg-blue-500 text-white' : ''
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default CustomersSection;
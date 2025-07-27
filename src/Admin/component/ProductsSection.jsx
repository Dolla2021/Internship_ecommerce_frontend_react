
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const ProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories] = useState(['T-Shirt', 'Nike Shoes', 'Begs', 'Mobile phone', 'Watch']);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState({ min: 500, max: 5000 });
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const productsPerPage = 9;
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };
  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
    setCurrentPage(1); // Reset to first page when filter changes
  };
  const handlePriceRangeChange = (e, type) => {
    setPriceRange(prev => ({
      ...prev,
      [type]: Number(e.target.value)
    }));
    setCurrentPage(1);
  };
  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };
  // Filter products based on all criteria
  const filteredProducts = products
    .filter(product => 
      (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
      (product.price >= priceRange.min && product.price <= priceRange.max) &&
      (searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortConfig.key === 'price') {
        return sortConfig.direction === 'asc' ? a.price - b.price : b.price - a.price;
      }
      return sortConfig.direction === 'asc' 
        ? a[sortConfig.key].localeCompare(b[sortConfig.key])
        : b[sortConfig.key].localeCompare(a[sortConfig.key]);
    });
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  if (loading) return <div>Loading...</div>;
  return (
    <div className="flex gap-6">
      {/* Sidebar Filter */}
      <aside className="w-64 bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-bold mb-4">Filter</h3>
        
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        {/* Categories */}
        <div className="mb-6">
          <h4 className="font-medium mb-2">Categories</h4>
          {categories.map((cat) => (
            <label key={cat} className="block mb-1 text-sm">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryToggle(cat)}
              />
              {cat}
            </label>
          ))}
        </div>
        {/* Price Range */}
        <div className="mb-6">
          <h4 className="font-medium mb-2">Price Range</h4>
          <div className="flex gap-2 mb-2">
            <input
              type="number"
              value={priceRange.min}
              onChange={(e) => handlePriceRangeChange(e, 'min')}
              className="w-1/2 p-1 border rounded"
            />
            <input
              type="number"
              value={priceRange.max}
              onChange={(e) => handlePriceRangeChange(e, 'max')}
              className="w-1/2 p-1 border rounded"
            />
          </div>
          <input
            type="range"
            className="w-full"
            min={500}
            max={5000}
            value={priceRange.max}
            onChange={(e) => handlePriceRangeChange(e, 'max')}
          />
        </div>
      </aside>
      {/* Products Grid */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-600">
            Showing {paginatedProducts.length} of {filteredProducts.length} products
          </p>
          <div className="flex gap-4">
            <select
              onChange={(e) => handleSort(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="category">Sort by Category</option>
            </select>
            <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-600">
              + Add Product
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paginatedProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md">
              <img
                src={product.image || 'https://via.placeholder.com/300x200'}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="font-semibold text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              <div className="text-yellow-500 text-sm mb-1">★★★★★</div>
              <p className="text-lg font-bold text-gray-900">
                ${product.price}
                {product.oldPrice && (
                  <span className="text-sm text-gray-400 line-through ml-2">${product.oldPrice}</span>
                )}
              </p>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 border border-gray-300 text-sm py-1 rounded hover:bg-gray-100">
                  Edit
                </button>
                <button className="flex-1 bg-red-500 text-white text-sm py-1 rounded hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-full mx-1 text-sm ${
                currentPage === page
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProductsSection;
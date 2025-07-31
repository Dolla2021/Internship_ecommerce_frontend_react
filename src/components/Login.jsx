import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/api/login', formData);
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      setFormData({ email: '', password: '' });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  ">
      <div className=" rounded-3xl shadow-lg flex flex-col md:flex-row w-full max-w-3xl overflow-hidden\">
        {/* Left Illustration */}
        <div className="md:w-1/2 flex items-center justify-center bg-blue-200 p-8">
          <div>
            <img
              src="https://www.serverbasket.ae/wp-content/uploads/2021/04/Linux-Dedicated-Server-Dubai.png"
              alt="Welcome"
              className="w-72 mx-auto"
            />
            <h2 className="text-2xl font-bold text-center mt-4 text-blue-700">Welcome</h2>
          </div>
        </div>
        {/* Right Login Form */}
        <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-2 text-center">Login</h3>
          <p className="text-gray-500 text-center mb-6">Please login to continue</p>
          {error && <p className="text-red-500 text-center mb-2">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="username"
                required
              />
            </div>
            <div>
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-500" />
                Keep Me Logged In
              </label>
              <a href="/reset-password" className="text-blue-500 hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'LOGIN'}
            </button>
          </form>
          <div className="flex items-center my-4">
            <hr className="flex-1 border-gray-300" />
            <span className="mx-2 text-gray-400 text-sm">Or</span>
            <hr className="flex-1 border-gray-300" />
          </div>
          <div className="flex justify-center gap-4 mb-4">
            <button className="p-2 rounded-full border hover:bg-blue-50" title="Login with Facebook">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" alt="fb" className="w-6 h-6" />
            </button>
            <button className="p-2 rounded-full border hover:bg-blue-50" title="Login with Google">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="google" className="w-6 h-6" />
            </button>
            <button className="p-2 rounded-full border hover:bg-blue-50" title="Login with Twitter">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg" alt="twitter" className="w-6 h-6" />
            </button>
          </div>
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-500 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
  export default Login;
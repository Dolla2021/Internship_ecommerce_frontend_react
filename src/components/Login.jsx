import React, { useState } from 'react';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    // Handle login logic here (e.g., API call)
    console.log('Logging in:', { email, password });
    // Reset form
    setEmail('');
    setPassword('');
  };
  return (
    <section className="bg-white">
      <div className="container px-6 py-10 mx-auto">
        <div className="flex justify-center">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            {/* Left Side Image (Optional) */}
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
              style={{ backgroundImage: "url('https://thumbs.dreamstime.com/z/grunge-headphone-music-city-6981478.jpg?w=400')" }}
            ></div>
            {/* Login Form */}
            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">Login to Your Account</h3>
              {error && <p className="text-red-500 text-center">{error}</p>}
              <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <p className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
                    Forgot Password? <a href="/reset-password">Reset it here</a>
                  </p>
                </div>
                <div className="text-center">
                  <p className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
                    Don't have an account? <a href="/register">Register here</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
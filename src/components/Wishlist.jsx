// components/Wishlist.jsx
import { useContext } from 'react';
import { WishlistContext } from './WishlistContext';
const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-lg text-gray-600 text-center">Your wishlist is empty.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 border-b border-gray-300 text-left">Image</th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">Product Name</th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">Price</th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">
                    <img src={item.image} alt={item.name} className="h-20 w-20 object-cover rounded" />
                  </td>
                  <td className="py-3 px-4 text-gray-900">{item.name}</td>
                  <td className="py-3 px-4 text-gray-700">{item.price}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="bg-red-600 text-white font-semibold py-1 px-3 rounded hover:bg-red-700 transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default Wishlist;
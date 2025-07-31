
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import avatarPlaceholder from '../assets/image1.jpg'; // Use your own placeholder image
import { toast } from 'react-toastify';
const UserProfilePage = () => {
  // Original profile data (typically this would come from an API)
  const initialUser = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '012 345 678',
    avatar: '',
  };
  const initialAddress = {
    street: '123 Main St',
    city: 'Phnom Penh',
    country: 'Cambodia',
    zip: '12000',
  };
  // States for profile, address, and editing
  const [user, setUser] = useState(initialUser);
  const [address, setAddress] = useState(initialAddress);
  // Backup states to restore if changes are canceled
  const [backupUser, setBackupUser] = useState(initialUser);
  const [backupAddress, setBackupAddress] = useState(initialAddress);
  
  const [editMode, setEditMode] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(initialUser.avatar);
  const [saving, setSaving] = useState(false);
  // When editing is enabled, backup current state in case the user cancels
  useEffect(() => {
    if (editMode) {
      setBackupUser(user);
      setBackupAddress(address);
    }
  }, [editMode, user, address]);
  // Handle input changes for user data
  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  // Handle address field changes
  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
  // Handle avatar changes and preview the image
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, avatar: file });
      setAvatarPreview(URL.createObjectURL(file));
    }
  };
  // Validate required fields before saving
  const validateProfile = () => {
    // Basic validation: name, phone, street, city, country, zip shouldn't be empty
    if (!user.name || !user.phone) {
      toast.error('Name and phone must not be empty.');
      return false;
    }
    if (!address.street || !address.city || !address.country || !address.zip) {
      toast.error('All address fields must be filled.');
      return false;
    }
    return true;
  };
  // Save changes (simulate API call)
  const saveChanges = async () => {
    if (!validateProfile()) return;
    
    setSaving(true);
    try {
      // Simulate a delay for an API request
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // TODO: Submit changes to your backend via API
      console.log('Saving data...', user, address);
      toast.success('Profile updated successfully!');
      setEditMode(false);
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };
  // Cancel editing and restore the original state
  const cancelChanges = () => {
    setUser(backupUser);
    setAddress(backupAddress);
    setAvatarPreview(backupUser.avatar || '');
    setEditMode(false);
    toast.info('Changes canceled');
  };
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">User Profile</h2>
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Avatar + Name */}
        <div className="flex items-center gap-4">
          <img
            src={avatarPreview || avatarPlaceholder}
            alt="User Avatar"
            className="w-20 h-20 rounded-full object-cover border"
          />
          <div>
            <h3 className="text-xl font-semibold">{user.name || 'No Name'}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        {/* Editable Fields */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              disabled={!editMode}
              className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring ${editMode ? 'bg-white' : 'bg-gray-100'}`}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleInputChange}
              disabled={!editMode}
              className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring ${editMode ? 'bg-white' : 'bg-gray-100'}`}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full bg-gray-100 px-3 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Profile Picture</label>
            <input
              type="file"
              onChange={handleAvatarChange}
              disabled={!editMode}
              className="w-full text-sm text-gray-600"
            />
          </div>
        </div>
        {/* Address Fields */}
        <div>
          <h4 className="text-lg font-semibold mt-4 mb-2">Shipping Address</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={address.street}
              onChange={handleAddressChange}
              disabled={!editMode}
              className={`border px-3 py-2 rounded-md w-full ${editMode ? 'bg-white' : 'bg-gray-100'}`}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={address.city}
              onChange={handleAddressChange}
              disabled={!editMode}
              className={`border px-3 py-2 rounded-md w-full ${editMode ? 'bg-white' : 'bg-gray-100'}`}
            />
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              value={address.zip}
              onChange={handleAddressChange}
              disabled={!editMode}
              className={`border px-3 py-2 rounded-md w-full ${editMode ? 'bg-white' : 'bg-gray-100'}`}
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={address.country}
              onChange={handleAddressChange}
              disabled={!editMode}
              className={`border px-3 py-2 rounded-md w-full ${editMode ? 'bg-white' : 'bg-gray-100'}`}
            />
          </div>
        </div>
        {/* Buttons */}
        <div className="flex justify-between items-center pt-4">
          <Link to="/orders" className="text-purple-600 font-semibold hover:underline">
            View Order History →
          </Link>
          {editMode ? (
            <div className="space-x-2">
              <button
                onClick={cancelChanges}
                disabled={saving}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={saveChanges}
                disabled={saving}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default UserProfilePage;
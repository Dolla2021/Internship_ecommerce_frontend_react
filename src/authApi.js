const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());

// Mock database
const users = [
  { id: 1, username: 'admin', password: '$2a$10$hashedpassword', role: 'admin' }, // Password is hashed
  { id: 2, username: 'user', password: '$2a$10$hashedpassword', role: 'user' },  // Password is hashed
];

const cart = []; // Mock cart database
const wishlist = []; // Mock wishlist database

// Secret key for JWT
const JWT_SECRET = 'SCTFE2VjNrAh2hkWZpEF9CZEchxyVnAo3HYIXwDjQcyQBW3BfWRrIGBdbjXv5hPo';

// Routes

// Register a new user
app.post('/api/register', async (req, res) => {
  const { username, password, role } = req.body;

  const existingUser = users.find((u) => u.username === username);
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, username, password: hashedPassword, role: role || 'user' };
  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully' });
});

// Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

// Middleware to verify JWT
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Cart APIs
app.get('/api/cart', authenticate, (req, res) => {
  const userCart = cart.filter((item) => item.userId === req.user.id);
  res.json(userCart);
});

app.post('/api/cart', authenticate, (req, res) => {
  const { productId, quantity } = req.body;
  const existingItem = cart.find((item) => item.userId === req.user.id && item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ userId: req.user.id, productId, quantity });
  }

  res.json({ message: 'Item added to cart' });
});

app.put('/api/cart/:productId', authenticate, (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  const item = cart.find((item) => item.userId === req.user.id && item.productId === parseInt(productId));
  if (!item) return res.status(404).json({ message: 'Item not found in cart' });

  item.quantity = quantity;
  res.json({ message: 'Cart updated successfully' });
});

app.delete('/api/cart/:productId', authenticate, (req, res) => {
  const { productId } = req.params;

  const index = cart.findIndex((item) => item.userId === req.user.id && item.productId === parseInt(productId));
  if (index === -1) return res.status(404).json({ message: 'Item not found in cart' });

  cart.splice(index, 1);
  res.json({ message: 'Item removed from cart' });
});

// Wishlist APIs
app.get('/api/wishlist', authenticate, (req, res) => {
  const userWishlist = wishlist.filter((item) => item.userId === req.user.id);
  res.json(userWishlist);
});

app.post('/api/wishlist', authenticate, (req, res) => {
  const { productId } = req.body;

  const existingItem = wishlist.find((item) => item.userId === req.user.id && item.productId === productId);
  if (existingItem) return res.status(400).json({ message: 'Item already in wishlist' });

  wishlist.push({ userId: req.user.id, productId });
  res.json({ message: 'Item added to wishlist' });
});

app.delete('/api/wishlist/:productId', authenticate, (req, res) => {
  const { productId } = req.params;

  const index = wishlist.findIndex((item) => item.userId === req.user.id && item.productId === parseInt(productId));
  if (index === -1) return res.status(404).json({ message: 'Item not found in wishlist' });

  wishlist.splice(index, 1);
  res.json({ message: 'Item removed from wishlist' });
});

// Start the server

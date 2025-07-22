import React from 'react';

const OrderHistory = () => {
  const orders = [
    { id: 1, name: 'Sandqvist', size: '35 L', quantity: 2, price: 110.99 },
    { id: 2, name: 'Sandqvist', size: '30 L', quantity: 1, price: 159.99 },
    { id: 3, name: 'Sandqvist', size: '25 L', quantity: 1, price: 89.99 },
  ];

  const subtotal = orders.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  <div class="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">

  <div>
    <h2 class="text-xl font-semibold mb-4">Shopping Cart</h2>
    <div class="space-y-4">
    
      <div class="flex justify-between items-center border-b pb-4">
        <div>
          <h3 class="font-medium">Sandqvist (35 L)</h3>
          <p class="text-sm text-gray-500">Quantity: 2</p>
        </div>
        <span class="font-bold">$110.99</span>
      </div>

      <div class="flex justify-between items-center border-b pb-4">
        <div>
          <h3 class="font-medium">Sandqvist (30 L)</h3>
          <p class="text-sm text-gray-500">Quantity: 1</p>
        </div>
        <span class="font-bold">$159.99</span>
      </div>

      <div class="flex justify-between items-center border-b pb-4">
        <div>
          <h3 class="font-medium">Sandqvist (25 L)</h3>
          <p class="text-sm text-gray-500">Quantity: 1</p>
        </div>
        <span class="font-bold">$89.99</span>
      </div>

      <div class="flex justify-between pt-4 font-semibold">
        <span>Subtotal</span>
        <span>$470.98</span>
      </div>
      <div class="flex justify-between text-green-600">
        <span>Shipping</span>
        <span>Free</span>
      </div>
      <div class="flex justify-between font-bold text-lg mt-2">
        <span>Total</span>
        <span>$470.98</span>
      </div>
    </div>
  </div>

 
  <div>
    <h2 class="text-xl font-semibold mb-4">Payment Information</h2>
    <form class="space-y-4">
      <div>
        <label class="block text-sm font-medium">Name on Card</label>
        <input type="text" value="John Carter" class="w-full p-2 border rounded mt-1" />
      </div>

      <div>
        <label class="block text-sm font-medium">Card Number</label>
        <input type="text" value="**** **** **** 2153" class="w-full p-2 border rounded mt-1" />
      </div>

      <div class="flex gap-4">
        <div class="w-1/2">
          <label class="block text-sm font-medium">Expiration Date</label>
          <input type="text" value="05/2020" class="w-full p-2 border rounded mt-1" />
        </div>
        <div class="w-1/2">
          <label class="block text-sm font-medium">CVV</label>
          <input type="text" value="156" class="w-full p-2 border rounded mt-1" />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Payment Method</label>
        <select class="w-full p-2 border rounded">
          <option selected>Credit Card</option>
          <option>PayPal</option>
        </select>
      </div>

      <button class="w-full bg-black text-white py-2 rounded hover:bg-gray-800">Check Out</button>
    </form>
  </div>
</div>

};

export default OrderHistory;

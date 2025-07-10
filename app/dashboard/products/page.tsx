'use client';

import { useCart } from '@/context/CartContext';
import { useOrders } from '@/context/OrderContext';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
};

const allProducts: Product[] = [
  {
    id: 1,
    name: 'Dell Inspiron Laptop',
    image: '/laptop.png',
    price: 52999,
    originalPrice: 59999,
  },
  {
    id: 2,
    name: 'Samsung Galaxy M14',
    image: '/mobile.png',
    price: 13499,
    originalPrice: 14999,
  },
  {
    id: 3,
    name: 'Sony Wireless Headphones',
    image: '/headphones.png',
    price: 3999,
    originalPrice: 4999,
  },
  {
    id: 4,
    name: 'HP Printer',
    image: '/printer.png',
    price: 7499,
    originalPrice: 8999,
  },
  {
    id: 5,
    name: 'Logitech Mouse',
    image: '/mouse.png',
    price: 499,
    originalPrice: 1099,
  }
];

export default function ProductsPage() {
  const { cart, addToCart, clearCart } = useCart();
  const { addToOrders } = useOrders();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [notification, setNotification] = useState<{show: boolean, productName: string} | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1
    });
    
    setNotification({ show: true, productName: product.name });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCheckout = () => {
    addToOrders(cart.map(item => ({
      productId: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
      date: new Date().toISOString(),
      status: 'pending'
    })));
    
    clearCart();
    setShowCheckoutModal(false);
  };

  const filteredProducts = allProducts
    .filter(product => 
      maxPrice ? product.price <= maxPrice : true
    )
    .filter(product =>
      searchQuery
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    );

  return (
    <>
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg flex items-center z-50">
          <span>Added {notification.productName} to cart!</span>
          <Link 
            href="/dashboard/orders" 
            className="ml-4 bg-white text-green-500 px-2 py-1 rounded text-sm hover:bg-green-50"
          >
            View Orders
          </Link>
        </div>
      )}

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="p-2 border rounded w-full sm:w-64"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="p-2 border rounded w-full sm:w-48"
          onChange={(e) => {
            const value = e.target.value;
            setMaxPrice(value === '' ? null : parseInt(value));
          }}
        >
          <option value="">All Prices</option>
          <option value="500">₹500 or less</option>
          <option value="1000">₹1000 or less</option>
          <option value="5000">₹5000 or less</option>
          <option value="10000">₹10000 or less</option>
        </select>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded shadow hover:shadow-lg">
              <div className="w-full h-40 relative mb-2">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-lg font-bold text-blue-600">₹{product.price}</span>
                <span className="line-through text-gray-400">₹{product.originalPrice}</span>
                <span className="text-green-600 font-medium">
                  {Math.round(100 - (product.price / product.originalPrice) * 100)}% OFF
                </span>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-3 w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition"
              >
                🛒 Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg text-center">
          <p className="text-gray-600">No products found matching your criteria</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setMaxPrice(null);
            }}
            className="mt-4 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Checkout Floating Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 z-40">
          <button 
            onClick={() => setShowCheckoutModal(true)}
            className="bg-orange-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-orange-700 flex items-center"
          >
            <span className="mr-2">🛒</span>
            Checkout ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </button>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Order</h3>
            <ul className="mb-4 max-h-60 overflow-y-auto">
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between py-2 border-b">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between font-bold mb-6">
              <span>Total:</span>
              <span>₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
            </div>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowCheckoutModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <Link
                href="/dashboard/orders"
                onClick={handleCheckout}
                className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
              >
                Confirm Order
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
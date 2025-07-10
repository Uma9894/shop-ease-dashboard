'use client';

import { useOrders } from '@/context/OrderContext';
import Image from 'next/image';
import Link from 'next/link';

export default function OrdersPage() {
  const { orders } = useOrders();

  return (
    <>
      <h1 className="text-3xl font-bold text-orange-800 mb-6">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center">
          <p className="text-gray-600 mb-4">You haven't placed any orders yet</p>
          <Link 
            href="/dashboard/products" 
            className="inline-block bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center">
                <div>
                  <p className="font-semibold">Order #{order.id.slice(0, 8)}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  order.status === 'completed' ? 'bg-green-100 text-green-800' :
                  order.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {order.status}
                </span>
              </div>

              <div className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-16">
                    <Image
                      src={order.image}
                      alt={order.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{order.name}</p>
                    <p className="text-sm text-gray-600">Qty: {order.quantity}</p>
                  </div>
                  <p className="font-semibold">₹{order.price * order.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
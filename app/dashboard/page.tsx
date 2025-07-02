'use client';

import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-orange-50 text-gray-800 shadow-md min-h-screen p-6 space-y-8">
        {/* Logo / Title */}
        <div className="text-3xl font-bold text-orange-600 font-serif tracking-wide">
          ShopEase
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex flex-col space-y-4 text-sm font-medium">
          <Link href="/dashboard" className="px-4 py-2 rounded-lg hover:bg-orange-100 hover:text-orange-600 transition">
            Dashboard Home
          </Link>
          <Link href="/dashboard/products" className="px-4 py-2 rounded-lg hover:bg-orange-100 hover:text-orange-600 transition">
            Products
          </Link>
          <Link href="/dashboard/categories" className="px-4 py-2 rounded-lg hover:bg-orange-100 hover:text-orange-600 transition">
            Categories
          </Link>
          <Link href="/dashboard/orders" className="px-4 py-2 rounded-lg hover:bg-orange-100 hover:text-orange-600 transition">
            Orders
          </Link>
          <Link href="/dashboard/customers" className="px-4 py-2 rounded-lg hover:bg-orange-100 hover:text-orange-600 transition">
            Customers
          </Link>
          <Link href="/dashboard/reports" className="px-4 py-2 rounded-lg hover:bg-orange-100 hover:text-orange-600 transition">
            Reports
          </Link>
          <Link href="/" className="px-4 py-2 rounded-lg text-orange-600 font-semibold bg-orange-100 hover:bg-orange-200 transition">
            ← Back to Home
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-gray-50">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">Welcome to ShopEase Admin Dashboard</h1>
        <p className="text-gray-700 text-base">
          Here you can manage your products, orders, and customers all in one place.
        </p>
      </main>
    </div>
  );
}

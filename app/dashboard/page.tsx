'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Customer {
  id: number;
  name: string;
  email: string;
  amount: number;
  status: 'active' | 'pending' | 'inactive';
  lastPurchase: string;
}

export default function DashboardPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'pending' | 'inactive'>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState<Omit<Customer, 'id'>>({
    name: '',
    email: '',
    amount: 0,
    status: 'active',
    lastPurchase: new Date().toISOString().split('T')[0]
  });

  // Fetch customers from API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch('/api/customers');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Add new customer
  const handleAddCustomer = async () => {
    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCustomer),
      });

      if (response.ok) {
        const addedCustomer = await response.json();
        setCustomers([...customers, addedCustomer]);
        setShowAddForm(false);
        setNewCustomer({
          name: '',
          email: '',
          amount: 0,
          status: 'active',
          lastPurchase: new Date().toISOString().split('T')[0]
        });
      }
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  // Update customer status
  const updateCustomerStatus = async (id: number, newStatus: 'active' | 'pending' | 'inactive') => {
    try {
      const response = await fetch(`/api/customers/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setCustomers(customers.map(customer => 
          customer.id === id ? { ...customer, status: newStatus } : customer
        ));
      }
    } catch (error) {
      console.error('Error updating customer status:', error);
    }
  };

  const filteredCustomers = activeTab === 'all' 
    ? customers 
    : customers.filter(customer => customer.status === activeTab);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-emerald-100 text-emerald-800';
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'inactive': return 'bg-rose-100 text-rose-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-orange-500 to-amber-600 text-white shadow-xl min-h-screen p-6 space-y-8">
        <div className="text-3xl font-bold font-serif tracking-wide">
          ShopEase
        </div>

        <nav className="flex flex-col space-y-2 text-sm font-medium">
          <Link href="/dashboard" className="px-4 py-3 rounded-lg hover:bg-white/20 transition flex items-center gap-3">
            <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">🏠</span>
            Dashboard Home
          </Link>
          <Link href="/dashboard/products" className="px-4 py-3 rounded-lg hover:bg-white/20 transition flex items-center gap-3">
            <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">🛍️</span>
            Products
          </Link>
          <Link href="/dashboard/categories" className="px-4 py-3 rounded-lg hover:bg-white/20 transition flex items-center gap-3">
            <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">📦</span>
            Categories
          </Link>
          <Link href="/dashboard/orders" className="px-4 py-3 rounded-lg hover:bg-white/20 transition flex items-center gap-3">
            <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">📝</span>
            Orders
          </Link>
          <Link href="/dashboard/customers" className="px-4 py-3 rounded-lg bg-white/30 transition flex items-center gap-3">
            <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-amber-600">👥</span>
            Customers
          </Link>
          <Link href="/dashboard/reports" className="px-4 py-3 rounded-lg hover:bg-white/20 transition flex items-center gap-3">
            <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">📊</span>
            Reports
          </Link>
          <Link href="/" className="px-4 py-3 rounded-lg mt-8 hover:bg-white/20 transition flex items-center gap-3 border border-white/30">
            <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-amber-600">←</span>
            Back to Home
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-amber-800 mb-2">Customer Management</h1>
              <p className="text-amber-600">Manage your customers and view their purchase history</p>
            </div>
            <button 
              onClick={() => setShowAddForm(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <span>+</span> Add Customer
            </button>
          </div>

          {/* Add Customer Form */}
          {showAddForm && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-6 border-l-4 border-amber-400">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Customer</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <input
                    type="number"
                    value={newCustomer.amount}
                    onChange={(e) => setNewCustomer({...newCustomer, amount: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={newCustomer.status}
                    onChange={(e) => setNewCustomer({...newCustomer, status: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCustomer}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg"
                  disabled={!newCustomer.name || !newCustomer.email}
                >
                  Add Customer
                </button>
              </div>
            </div>
          )}

          {/* Interactive tabs */}
          <div className="flex space-x-2 mb-6">
            {['all', 'active', 'pending', 'inactive'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-white text-amber-800 hover:bg-amber-100'
                }`}
              >
                {tab}
                {tab !== 'all' && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-white/20">
                    {customers.filter(c => c.status === tab).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Customer cards */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-5 animate-pulse">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-full mt-4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCustomers.map((customer) => (
                <div key={customer.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border-l-4 border-amber-400">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-800">{customer.name}</h3>
                    <select
                      value={customer.status}
                      onChange={(e) => updateCustomerStatus(customer.id, e.target.value as any)}
                      className={`text-xs px-2 py-1 rounded-full ${getStatusColor(customer.status)}`}
                    >
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{customer.email}</p>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <p className="text-xs text-gray-500">Last purchase</p>
                      <p className="text-sm font-medium">{new Date(customer.lastPurchase).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Total spent</p>
                      <p className="text-lg font-bold text-amber-600">
                        ${customer.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <button className="text-xs bg-amber-100 text-amber-800 hover:bg-amber-200 px-3 py-1 rounded-full transition">
                      View
                    </button>
                    <button className="text-xs bg-gray-100 text-gray-800 hover:bg-gray-200 px-3 py-1 rounded-full transition">
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stats summary */}
          {!loading && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border-t-4 border-emerald-400">
                <p className="text-sm text-gray-500">Active Customers</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {customers.filter(c => c.status === 'active').length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border-t-4 border-amber-400">
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-amber-600">
                  {customers.filter(c => c.status === 'pending').length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border-t-4 border-rose-400">
                <p className="text-sm text-gray-500">Inactive</p>
                <p className="text-2xl font-bold text-rose-600">
                  {customers.filter(c => c.status === 'inactive').length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border-t-4 border-amber-600">
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-amber-800">
                  ${customers.reduce((sum, customer) => sum + customer.amount, 0).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
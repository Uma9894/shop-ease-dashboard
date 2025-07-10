'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem } from './CartContext';

export type Order = {
  id: string;
  date: string;
  items: CartItem[];
  status: 'pending' | 'completed' | 'cancelled';
  // Removed individual item properties since they're now in CartItem[]
};

type OrderContextType = {
  orders: Order[];
  addOrder: (items: CartItem[]) => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (items: CartItem[]) => {
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      items,
      date: new Date().toISOString(),
      status: 'pending',
      // No need for individual item properties here
    };
    setOrders(prev => [...prev, newOrder]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
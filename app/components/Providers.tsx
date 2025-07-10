// components/Providers.tsx
'use client';

import { CartProvider } from '@/context/CartContext';
import { OrderProvider } from '@/context/OrderContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <OrderProvider>
        {children}
      </OrderProvider>
    </CartProvider>
  );
}
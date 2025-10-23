'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OrderButton({ productId }: { productId: number }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  async function handleOrder() {
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('http://10.1.101.59:3000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', 
        body: JSON.stringify({
          items: [{ product_id: productId }],
        }),
      });

      if (res.status === 401) {
        setMessage('Please login first.');
        router.replace('/login');
        return;
      }

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to create order');
      }

      setMessage('✅ Order placed successfully!');
    } catch (err: any) {
      console.error(err);
      setMessage('❌ Failed to place order.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4">
      <button
        onClick={handleOrder}
        disabled={loading}
        className="border rounded-full px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Ordering...' : 'Order Now'}
      </button>
      {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
    </div>
  );
}

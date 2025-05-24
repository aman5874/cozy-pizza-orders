
import { useState, useEffect } from 'react';
import { pizzaOrders, PizzaOrder } from '@/data/pizzaOrders';

export const usePizzaOrders = () => {
  const [orders, setOrders] = useState<PizzaOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate potential error (uncomment to test error state)
        // if (Math.random() > 0.8) {
        //   throw new Error('Failed to fetch orders');
        // }
        
        setOrders(pizzaOrders);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching pizza orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const refetch = () => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        await new Promise(resolve => setTimeout(resolve, 500));
        setOrders(pizzaOrders);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  };

  return { orders, loading, error, refetch };
};

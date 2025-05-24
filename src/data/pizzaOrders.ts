
export interface PizzaOrder {
  id: string;
  customerName: string;
  pizzaType: string;
  quantity: number;
  orderDate: string;
  status: 'Pending' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  total: number;
}

export const pizzaOrders: PizzaOrder[] = [
  {
    id: 'PZA001',
    customerName: 'John Doe',
    pizzaType: 'Margherita',
    quantity: 2,
    orderDate: '2024-01-24 14:30',
    status: 'Delivered',
    total: 24.99
  },
  {
    id: 'PZA002',
    customerName: 'Jane Smith',
    pizzaType: 'Pepperoni',
    quantity: 1,
    orderDate: '2024-01-24 15:15',
    status: 'Out for Delivery',
    total: 18.50
  },
  {
    id: 'PZA003',
    customerName: 'Mike Johnson',
    pizzaType: 'Veggie Supreme',
    quantity: 3,
    orderDate: '2024-01-24 15:45',
    status: 'Preparing',
    total: 42.75
  },
  {
    id: 'PZA004',
    customerName: 'Sarah Wilson',
    pizzaType: 'Hawaiian',
    quantity: 1,
    orderDate: '2024-01-24 16:00',
    status: 'Pending',
    total: 19.99
  },
  {
    id: 'PZA005',
    customerName: 'David Brown',
    pizzaType: 'Meat Lovers',
    quantity: 2,
    orderDate: '2024-01-24 16:20',
    status: 'Preparing',
    total: 35.98
  },
  {
    id: 'PZA006',
    customerName: 'Emily Davis',
    pizzaType: 'BBQ Chicken',
    quantity: 1,
    orderDate: '2024-01-24 16:35',
    status: 'Delivered',
    total: 21.50
  },
  {
    id: 'PZA007',
    customerName: 'Tom Anderson',
    pizzaType: 'Four Cheese',
    quantity: 2,
    orderDate: '2024-01-24 17:10',
    status: 'Out for Delivery',
    total: 32.00
  },
  {
    id: 'PZA008',
    customerName: 'Lisa Miller',
    pizzaType: 'Buffalo Chicken',
    quantity: 1,
    orderDate: '2024-01-24 17:25',
    status: 'Cancelled',
    total: 22.99
  },
  {
    id: 'PZA009',
    customerName: 'Robert Taylor',
    pizzaType: 'Margherita',
    quantity: 3,
    orderDate: '2024-01-24 17:40',
    status: 'Pending',
    total: 37.47
  },
  {
    id: 'PZA010',
    customerName: 'Amanda White',
    pizzaType: 'Pepperoni',
    quantity: 1,
    orderDate: '2024-01-24 18:00',
    status: 'Preparing',
    total: 18.50
  }
];

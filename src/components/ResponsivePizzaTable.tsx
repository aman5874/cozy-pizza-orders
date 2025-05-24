
import { PizzaOrder } from '@/data/pizzaOrders';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

interface ResponsivePizzaTableProps {
  orders: PizzaOrder[];
  sortField: keyof PizzaOrder;
  sortDirection: 'asc' | 'desc';
  onSort: (field: keyof PizzaOrder) => void;
}

const ResponsivePizzaTable = ({ orders, sortField, sortDirection, onSort }: ResponsivePizzaTableProps) => {
  const statusColors = {
    'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'Preparing': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Out for Delivery': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'Delivered': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Cancelled': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  };

  const SortButton = ({ field, label }: { field: keyof PizzaOrder; label: string }) => (
    <Button
      variant="ghost"
      size="sm"
      className="h-auto p-0 font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
      onClick={() => onSort(field)}
    >
      {label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 px-4">
                <SortButton field="id" label="Order ID" />
              </th>
              <th className="text-left py-4 px-4">
                <SortButton field="customerName" label="Customer" />
              </th>
              <th className="text-left py-4 px-4">
                <SortButton field="pizzaType" label="Pizza Type" />
              </th>
              <th className="text-left py-4 px-4">
                <SortButton field="quantity" label="Qty" />
              </th>
              <th className="text-left py-4 px-4">
                <SortButton field="total" label="Total" />
              </th>
              <th className="text-left py-4 px-4">
                <SortButton field="orderDate" label="Order Date" />
              </th>
              <th className="text-left py-4 px-4">
                <SortButton field="status" label="Status" />
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                <td className="py-4 px-4 font-medium text-foreground">{order.id}</td>
                <td className="py-4 px-4 text-foreground">{order.customerName}</td>
                <td className="py-4 px-4 text-foreground">{order.pizzaType}</td>
                <td className="py-4 px-4 text-foreground">{order.quantity}</td>
                <td className="py-4 px-4 text-foreground font-semibold">${order.total.toFixed(2)}</td>
                <td className="py-4 px-4 text-muted-foreground text-sm">
                  <div>{new Date(order.orderDate).toLocaleDateString()}</div>
                  <div>{new Date(order.orderDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </td>
                <td className="py-4 px-4">
                  <Badge className={statusColors[order.status]} variant="secondary">
                    {order.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-foreground">#{order.id}</div>
                <Badge className={statusColors[order.status]} variant="secondary">
                  {order.status}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Customer:</span>
                  <span className="font-medium text-foreground">{order.customerName}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Pizza:</span>
                  <span className="text-foreground">{order.pizzaType}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Quantity:</span>
                  <span className="text-foreground">{order.quantity}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total:</span>
                  <span className="font-bold text-lg text-foreground">${order.total.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t border-border">
                  <span className="text-sm text-muted-foreground">Order Date:</span>
                  <div className="text-right text-sm text-muted-foreground">
                    <div>{new Date(order.orderDate).toLocaleDateString()}</div>
                    <div>{new Date(order.orderDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ResponsivePizzaTable;

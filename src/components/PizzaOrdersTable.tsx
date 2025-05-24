
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { pizzaOrders, PizzaOrder } from '@/data/pizzaOrders';
import { ArrowUpDown, Filter, Search } from 'lucide-react';

const PizzaOrdersTable = () => {
  const [sortField, setSortField] = useState<keyof PizzaOrder>('orderDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const statusColors = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Preparing': 'bg-blue-100 text-blue-800',
    'Out for Delivery': 'bg-purple-100 text-purple-800',
    'Delivered': 'bg-green-100 text-green-800',
    'Cancelled': 'bg-red-100 text-red-800'
  };

  const uniqueStatuses = ['all', ...Array.from(new Set(pizzaOrders.map(order => order.status)))];

  const filteredAndSortedOrders = useMemo(() => {
    let filtered = pizzaOrders.filter(order => {
      const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
      const matchesSearch = 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.pizzaType.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });

    return filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'orderDate') {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [sortField, sortDirection, filterStatus, searchTerm]);

  const handleSort = (field: keyof PizzaOrder) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <span className="text-2xl mr-2">🍕</span>
            Pizza Orders
          </span>
          <span className="text-sm font-normal text-gray-500">
            {filteredAndSortedOrders.length} orders
          </span>
        </CardTitle>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search orders, customers, or pizza types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {uniqueStatuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                {[
                  { key: 'id', label: 'Order ID' },
                  { key: 'customerName', label: 'Customer' },
                  { key: 'pizzaType', label: 'Pizza Type' },
                  { key: 'quantity', label: 'Qty' },
                  { key: 'total', label: 'Total' },
                  { key: 'orderDate', label: 'Order Date' },
                  { key: 'status', label: 'Status' }
                ].map((column) => (
                  <th key={column.key} className="text-left py-3 px-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 font-medium text-gray-700 hover:text-gray-900"
                      onClick={() => handleSort(column.key as keyof PizzaOrder)}
                    >
                      {column.label}
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{order.id}</td>
                  <td className="py-3 px-4 text-gray-700">{order.customerName}</td>
                  <td className="py-3 px-4 text-gray-700">{order.pizzaType}</td>
                  <td className="py-3 px-4 text-gray-700">{order.quantity}</td>
                  <td className="py-3 px-4 text-gray-700">${order.total.toFixed(2)}</td>
                  <td className="py-3 px-4 text-gray-700">
                    {new Date(order.orderDate).toLocaleDateString()} {new Date(order.orderDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredAndSortedOrders.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No orders found matching your criteria.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PizzaOrdersTable;


import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PizzaOrder } from '@/data/pizzaOrders';
import { Filter, Search, RefreshCw } from 'lucide-react';
import { usePizzaOrders } from '@/hooks/usePizzaOrders';
import ResponsivePizzaTable from '@/components/ResponsivePizzaTable';
import PizzaOrdersLoadingSkeleton from '@/components/PizzaOrdersLoadingSkeleton';
import ErrorDisplay from '@/components/ErrorDisplay';
import { useToast } from '@/hooks/use-toast';

const PizzaOrdersTable = () => {
  const { orders, loading, error, refetch } = usePizzaOrders();
  const { toast } = useToast();
  const [sortField, setSortField] = useState<keyof PizzaOrder>('orderDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const uniqueStatuses = useMemo(() => 
    ['all', ...Array.from(new Set(orders.map(order => order.status)))], 
    [orders]
  );

  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders.filter(order => {
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
  }, [orders, sortField, sortDirection, filterStatus, searchTerm]);

  const handleSort = (field: keyof PizzaOrder) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    
    toast({
      title: "Table sorted",
      description: `Sorted by ${field} in ${sortDirection === 'asc' ? 'descending' : 'ascending'} order`,
    });
  };

  const handleRefresh = () => {
    refetch();
    toast({
      title: "Refreshing orders",
      description: "Fetching the latest pizza orders...",
    });
  };

  // Loading state
  if (loading) {
    return <PizzaOrdersLoadingSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <ErrorDisplay 
        error={error} 
        onRetry={refetch}
        title="Failed to load pizza orders"
      />
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-4">
        <CardTitle className="flex items-center justify-between flex-wrap gap-2">
          <span className="flex items-center gap-2">
            <span className="text-2xl">🍕</span>
            <span>Pizza Orders</span>
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="gap-2"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <span className="text-sm font-normal text-muted-foreground">
              {filteredAndSortedOrders.length} orders
            </span>
          </div>
        </CardTitle>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search orders, customers, or pizza types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-input bg-background rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
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
        {filteredAndSortedOrders.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-medium mb-2">No orders found</h3>
            <p>Try adjusting your search criteria or filters.</p>
          </div>
        ) : (
          <ResponsivePizzaTable
            orders={filteredAndSortedOrders}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default PizzaOrdersTable;

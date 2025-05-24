
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import DashboardLayout from '@/components/DashboardLayout';
import { DashboardSkeleton } from '@/components/LoadingSkeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, ShoppingCart, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { 
      name: 'Total Orders', 
      value: '127', 
      icon: ShoppingCart, 
      color: 'bg-blue-500',
      change: '+12%',
      href: '/pizza-orders'
    },
    { 
      name: 'Active Customers', 
      value: '89', 
      icon: Users, 
      color: 'bg-green-500',
      change: '+8%',
      href: '/customer-management'
    },
    { 
      name: 'Revenue Today', 
      value: '$2,450', 
      icon: TrendingUp, 
      color: 'bg-orange-500',
      change: '+15%',
      href: '/analytics'
    },
    { 
      name: 'Avg Delivery Time', 
      value: '28 min', 
      icon: Clock, 
      color: 'bg-purple-500',
      change: '-5%',
      href: '/pizza-orders'
    },
  ];

  const recentOrders = [
    { id: 'PZA123', customer: 'John Doe', status: 'Preparing', time: '5 min ago', amount: '$24.99' },
    { id: 'PZA124', customer: 'Jane Smith', status: 'Out for Delivery', time: '12 min ago', amount: '$31.50' },
    { id: 'PZA125', customer: 'Mike Johnson', status: 'Delivered', time: '25 min ago', amount: '$18.75' },
    { id: 'PZA126', customer: 'Sarah Wilson', status: 'Preparing', time: '8 min ago', amount: '$42.30' },
  ];

  const quickActions = [
    { name: 'View All Orders', href: '/pizza-orders', color: 'bg-blue-500' },
    { name: 'Manage Menu', href: '/menu-management', color: 'bg-green-500' },
    { name: 'View Analytics', href: '/analytics', color: 'bg-orange-500' },
    { name: 'Customer List', href: '/customer-management', color: 'bg-purple-500' },
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardSkeleton />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-8 text-white shadow-lg">
          <h1 className="text-3xl font-bold mb-2">
            Hello, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}! 👋
          </h1>
          <p className="text-orange-100 text-lg">
            Welcome back to your pizza dashboard. Here's what's happening today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Link key={stat.name} to={stat.href}>
              <Card className="transition-all hover:shadow-lg hover:scale-105 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className={`p-3 rounded-lg ${stat.color} group-hover:scale-110 transition-transform`}>
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recent Orders */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2 text-orange-500" />
                  Recent Orders
                </CardTitle>
              </div>
              <Link to="/pizza-orders">
                <Button variant="outline" size="sm">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                        order.status === 'Out for Delivery' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      }`}>
                        {order.status}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">{order.time}</p>
                      <p className="text-sm font-medium">{order.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions & Performance */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action) => (
                  <Link key={action.name} to={action.href}>
                    <Button variant="outline" className="w-full justify-start hover:scale-105 transition-transform">
                      <div className={`w-3 h-3 rounded-full ${action.color} mr-3`}></div>
                      {action.name}
                      <ArrowRight className="ml-auto h-4 w-4" />
                    </Button>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Today's Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                  Today's Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Orders Completed</span>
                    <span className="font-bold">42/45</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full transition-all duration-1000" style={{ width: '93%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Customer Satisfaction</span>
                    <span className="font-bold">4.8/5.0</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full transition-all duration-1000" style={{ width: '96%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">On-time Delivery</span>
                    <span className="font-bold">95%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full transition-all duration-1000" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

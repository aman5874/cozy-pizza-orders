
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { DatePickerWithRange } from '@/components/DateRangePicker';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Package, Users, Pizza } from 'lucide-react';

const Analytics = () => {
  const [dateRange, setDateRange] = useState<any>(null);

  const salesData = [
    { month: 'Jan', revenue: 4200, orders: 142 },
    { month: 'Feb', revenue: 5800, orders: 198 },
    { month: 'Mar', revenue: 7200, orders: 245 },
    { month: 'Apr', revenue: 6500, orders: 220 },
    { month: 'May', revenue: 8900, orders: 312 },
    { month: 'Jun', revenue: 9200, orders: 328 },
  ];

  const pizzaData = [
    { name: 'Margherita', orders: 145, revenue: 2175 },
    { name: 'Pepperoni', orders: 132, revenue: 2376 },
    { name: 'Hawaiian', orders: 98, revenue: 1764 },
    { name: 'Meat Lovers', orders: 87, revenue: 1827 },
    { name: 'Veggie Supreme', orders: 76, revenue: 1368 },
  ];

  const pieData = [
    { name: 'Margherita', value: 30, color: '#ef4444' },
    { name: 'Pepperoni', value: 25, color: '#f97316' },
    { name: 'Hawaiian', value: 20, color: '#eab308' },
    { name: 'Meat Lovers', value: 15, color: '#22c55e' },
    { name: 'Others', value: 10, color: '#6366f1' },
  ];

  const kpis = [
    {
      title: 'Total Revenue',
      value: '$42,350',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Total Orders',
      value: '1,445',
      change: '+8.2%',
      trend: 'up',
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: 'Active Customers',
      value: '892',
      change: '-2.1%',
      trend: 'down',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Avg Order Value',
      value: '$29.31',
      change: '+5.7%',
      trend: 'up',
      icon: Pizza,
      color: 'text-orange-600'
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
            <p className="text-muted-foreground">
              Comprehensive insights into your pizza business performance
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            <Button variant="outline">Export PDF</Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <Card key={kpi.title} className="transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {kpi.trend === 'up' ? (
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                  )}
                  <span className={kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                    {kpi.change}
                  </span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Monthly revenue over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="revenue" stroke="#ef4444" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pizza Sales Distribution</CardTitle>
                  <CardDescription>Most popular pizza types</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sales" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales Performance</CardTitle>
                <CardDescription>Orders and revenue by month</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#3b82f6" name="Orders" />
                    <Bar dataKey="revenue" fill="#ef4444" name="Revenue ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Pizzas</CardTitle>
                <CardDescription>Best selling pizzas by orders and revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pizzaData.map((pizza, index) => (
                    <div key={pizza.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-medium">{pizza.name}</h3>
                          <p className="text-sm text-muted-foreground">{pizza.orders} orders</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${pizza.revenue.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>New Customers</span>
                    <span className="font-bold">142</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Returning Customers</span>
                    <span className="font-bold">750</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Customer Retention Rate</span>
                    <span className="font-bold text-green-600">84.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average Order Frequency</span>
                    <span className="font-bold">2.3 orders/month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Satisfaction</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Overall Rating</span>
                    <span className="font-bold">4.8/5.0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>5 Star Reviews</span>
                    <span className="font-bold">78%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>4 Star Reviews</span>
                    <span className="font-bold">18%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Response Rate</span>
                    <span className="font-bold">95%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;

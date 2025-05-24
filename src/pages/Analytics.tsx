
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { DatePickerWithRange } from '@/components/DateRangePicker';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, ChefHat, FileText, Target, Star, Zap } from 'lucide-react';

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
    { name: 'Margherita', value: 30, fill: 'hsl(var(--primary))' },
    { name: 'Pepperoni', value: 25, fill: 'hsl(24 74% 58%)' },
    { name: 'Hawaiian', value: 20, fill: 'hsl(47 96% 61%)' },
    { name: 'Meat Lovers', value: 15, fill: 'hsl(142 76% 36%)' },
    { name: 'Others', value: 10, fill: 'hsl(262 83% 58%)' },
  ];

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--primary))",
    },
    orders: {
      label: "Orders",
      color: "hsl(221.2 83.2% 53.3%)",
    },
  };

  const pieChartConfig = {
    margherita: {
      label: "Margherita",
      color: "hsl(var(--primary))",
    },
    pepperoni: {
      label: "Pepperoni", 
      color: "hsl(24 74% 58%)",
    },
    hawaiian: {
      label: "Hawaiian",
      color: "hsl(47 96% 61%)",
    },
    meatLovers: {
      label: "Meat Lovers",
      color: "hsl(142 76% 36%)",
    },
    others: {
      label: "Others",
      color: "hsl(262 83% 58%)",
    },
  };

  const kpis = [
    {
      title: 'Total Revenue',
      value: '$42,350',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-emerald-600 dark:text-emerald-400'
    },
    {
      title: 'Total Orders',
      value: '1,445',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Active Customers',
      value: '892',
      change: '-2.1%',
      trend: 'down',
      icon: Users,
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      title: 'Avg Order Value',
      value: '$29.31',
      change: '+5.7%',
      trend: 'up',
      icon: ChefHat,
      color: 'text-orange-600 dark:text-orange-400'
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
            <p className="text-muted-foreground mt-2">
              Comprehensive insights into your pizza business performance
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <Card key={kpi.title} className="relative overflow-hidden group hover:shadow-lg transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                <div className={`p-2 rounded-lg bg-background/50 ${kpi.color}`}>
                  <kpi.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{kpi.value}</div>
                <div className="flex items-center text-sm">
                  {kpi.trend === 'up' ? (
                    <TrendingUp className="mr-2 h-4 w-4 text-emerald-500" />
                  ) : (
                    <TrendingDown className="mr-2 h-4 w-4 text-red-500" />
                  )}
                  <span className={`font-medium ${kpi.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                    {kpi.change}
                  </span>
                  <span className="ml-1 text-muted-foreground">from last month</span>
                </div>
              </CardContent>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Card>
          ))}
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="gap-2">
              <Target className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="sales" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Sales
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-2">
              <ChefHat className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="customers" className="gap-2">
              <Users className="h-4 w-4" />
              Customers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="overflow-hidden">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Revenue Trend
                  </CardTitle>
                  <CardDescription>Monthly revenue over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <ChartContainer config={chartConfig} className="h-80">
                    <LineChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                      <XAxis 
                        dataKey="month" 
                        className="text-muted-foreground"
                        tick={{ fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        className="text-muted-foreground"
                        tick={{ fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="var(--color-revenue)"
                        strokeWidth={3}
                        dot={{ fill: "var(--color-revenue)", strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-2">
                    <ChefHat className="h-5 w-5 text-primary" />
                    Pizza Sales Distribution
                  </CardTitle>
                  <CardDescription>Most popular pizza types</CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <ChartContainer config={pieChartConfig} className="h-80">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        innerRadius={40}
                        dataKey="value"
                        paddingAngle={2}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sales" className="space-y-6">
            <Card className="overflow-hidden">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Sales Performance
                </CardTitle>
                <CardDescription>Orders and revenue by month</CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <ChartContainer config={chartConfig} className="h-96">
                  <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                    <XAxis 
                      dataKey="month" 
                      className="text-muted-foreground"
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      className="text-muted-foreground"
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar 
                      dataKey="orders" 
                      fill="var(--color-orders)" 
                      radius={[4, 4, 0, 0]}
                      name="Orders" 
                    />
                    <Bar 
                      dataKey="revenue" 
                      fill="var(--color-revenue)" 
                      radius={[4, 4, 0, 0]}
                      name="Revenue ($)" 
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  Top Performing Pizzas
                </CardTitle>
                <CardDescription>Best selling pizzas by orders and revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pizzaData.map((pizza, index) => (
                    <div key={pizza.name} className="flex items-center justify-between p-4 border rounded-xl hover:bg-accent/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-base">{pizza.name}</h3>
                          <p className="text-sm text-muted-foreground">{pizza.orders} orders</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">${pizza.revenue.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Customer Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">New Customers</span>
                    <span className="font-bold text-lg">142</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Returning Customers</span>
                    <span className="font-bold text-lg">750</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Customer Retention Rate</span>
                    <span className="font-bold text-lg text-emerald-600 dark:text-emerald-400">84.2%</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Average Order Frequency</span>
                    <span className="font-bold text-lg">2.3 orders/month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    Customer Satisfaction
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Overall Rating</span>
                    <span className="font-bold text-lg">4.8/5.0</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">5 Star Reviews</span>
                    <span className="font-bold text-lg">78%</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">4 Star Reviews</span>
                    <span className="font-bold text-lg">18%</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Response Rate</span>
                    <span className="font-bold text-lg">95%</span>
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

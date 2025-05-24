
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Mail, Phone, MapPin, Calendar, Star, TrendingUp, Users, Heart } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
  loyaltyPoints: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  avatar?: string;
  favoriteItems: string[];
}

const CustomerManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const [customers] = useState<Customer[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, New York, NY 10001',
      joinDate: '2023-01-15',
      totalOrders: 42,
      totalSpent: 1247.50,
      lastOrder: '2024-01-20',
      loyaltyPoints: 1247,
      tier: 'Gold',
      favoriteItems: ['Margherita Pizza', 'Caesar Salad', 'Garlic Bread']
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 987-6543',
      address: '456 Oak Ave, Brooklyn, NY 11201',
      joinDate: '2023-03-22',
      totalOrders: 28,
      totalSpent: 892.30,
      lastOrder: '2024-01-18',
      loyaltyPoints: 892,
      tier: 'Silver',
      favoriteItems: ['Pepperoni Pizza', 'Buffalo Wings']
    },
    {
      id: '3',
      name: 'Mike Davis',
      email: 'mike.davis@email.com',
      phone: '+1 (555) 456-7890',
      address: '789 Pine St, Manhattan, NY 10002',
      joinDate: '2023-06-10',
      totalOrders: 67,
      totalSpent: 2156.80,
      lastOrder: '2024-01-22',
      loyaltyPoints: 2156,
      tier: 'Platinum',
      favoriteItems: ['Meat Lovers Pizza', 'BBQ Wings', 'Chocolate Cake']
    },
    {
      id: '4',
      name: 'Emily Wilson',
      email: 'emily.w@email.com',
      phone: '+1 (555) 321-0987',
      address: '321 Elm St, Queens, NY 11375',
      joinDate: '2023-11-05',
      totalOrders: 15,
      totalSpent: 456.75,
      lastOrder: '2024-01-19',
      loyaltyPoints: 456,
      tier: 'Bronze',
      favoriteItems: ['Veggie Supreme Pizza', 'Greek Salad']
    }
  ]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Bronze': return 'bg-amber-600';
      case 'Silver': return 'bg-gray-400';
      case 'Gold': return 'bg-yellow-500';
      case 'Platinum': return 'bg-purple-600';
      default: return 'bg-gray-400';
    }
  };

  const customerStats = {
    total: customers.length,
    newThisMonth: customers.filter(c => new Date(c.joinDate).getMonth() === new Date().getMonth()).length,
    avgOrderValue: customers.reduce((sum, c) => sum + (c.totalSpent / c.totalOrders), 0) / customers.length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Customer Management</h1>
            <p className="text-muted-foreground">
              Manage customer relationships and track loyalty
            </p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Mail className="mr-2 h-4 w-4" />
            Send Newsletter
          </Button>
        </div>

        {/* Customer Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customerStats.total}</div>
              <p className="text-xs text-muted-foreground">
                +{customerStats.newThisMonth} new this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${customerStats.avgOrderValue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Per customer order
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customer Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${customerStats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Total lifetime value
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loyalty Members</CardTitle>
              <Heart className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.filter(c => c.tier !== 'Bronze').length}</div>
              <p className="text-xs text-muted-foreground">
                Silver+ tier customers
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="list" className="space-y-4">
          <TabsList>
            <TabsTrigger value="list">Customer List</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="loyalty">Loyalty Program</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            <div className="grid gap-4">
              {filteredCustomers.map((customer) => (
                <Card key={customer.id} className="transition-all hover:shadow-md cursor-pointer"
                      onClick={() => setSelectedCustomer(customer)}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={customer.avatar} />
                          <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{customer.name}</h3>
                          <p className="text-sm text-muted-foreground flex items-center">
                            <Mail className="mr-1 h-3 w-3" />
                            {customer.email}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center">
                            <Phone className="mr-1 h-3 w-3" />
                            {customer.phone}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={`${getTierColor(customer.tier)} text-white`}>
                            {customer.tier}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {customer.loyaltyPoints} pts
                          </span>
                        </div>
                        <p className="text-sm font-medium">{customer.totalOrders} orders</p>
                        <p className="text-lg font-bold text-green-600">${customer.totalSpent.toFixed(2)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Tiers Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {['Platinum', 'Gold', 'Silver', 'Bronze'].map((tier) => {
                    const count = customers.filter(c => c.tier === tier).length;
                    const percentage = (count / customers.length) * 100;
                    return (
                      <div key={tier} className="flex items-center justify-between">
                        <span className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${getTierColor(tier)} mr-2`}></div>
                          {tier}
                        </span>
                        <span className="font-medium">{count} ({percentage.toFixed(1)}%)</span>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Customers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customers
                      .sort((a, b) => b.totalSpent - a.totalSpent)
                      .slice(0, 5)
                      .map((customer, index) => (
                        <div key={customer.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">
                              {index + 1}
                            </div>
                            <span className="font-medium">{customer.name}</span>
                          </div>
                          <span className="font-bold text-green-600">${customer.totalSpent.toFixed(2)}</span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="loyalty" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Loyalty Program Overview</CardTitle>
                <CardDescription>
                  Reward your loyal customers with points and tier benefits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-4">
                  {['Bronze', 'Silver', 'Gold', 'Platinum'].map((tier, index) => (
                    <Card key={tier} className="text-center">
                      <CardContent className="pt-6">
                        <div className={`w-12 h-12 rounded-full ${getTierColor(tier)} mx-auto mb-4 flex items-center justify-center`}>
                          <Star className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-semibold">{tier}</h3>
                        <p className="text-sm text-muted-foreground">
                          {index === 0 && '0-499 points'}
                          {index === 1 && '500-999 points'}
                          {index === 2 && '1000-1999 points'}
                          {index === 3 && '2000+ points'}
                        </p>
                        <p className="text-xs mt-2">
                          {index === 0 && '5% discount'}
                          {index === 1 && '10% discount'}
                          {index === 2 && '15% discount + free delivery'}
                          {index === 3 && '20% discount + free delivery + priority support'}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Customer Detail Dialog */}
        <Dialog open={!!selectedCustomer} onOpenChange={(open) => !open && setSelectedCustomer(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Customer Details</DialogTitle>
              <DialogDescription>
                Complete information about {selectedCustomer?.name}
              </DialogDescription>
            </DialogHeader>
            {selectedCustomer && (
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedCustomer.avatar} />
                    <AvatarFallback className="text-lg">
                      {selectedCustomer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-bold">{selectedCustomer.name}</h2>
                    <Badge className={`${getTierColor(selectedCustomer.tier)} text-white`}>
                      {selectedCustomer.tier} Member
                    </Badge>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <p className="flex items-center">
                          <Mail className="mr-2 h-4 w-4" />
                          {selectedCustomer.email}
                        </p>
                        <p className="flex items-center">
                          <Phone className="mr-2 h-4 w-4" />
                          {selectedCustomer.phone}
                        </p>
                        <p className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4" />
                          {selectedCustomer.address}
                        </p>
                        <p className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          Joined {new Date(selectedCustomer.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Order Statistics</h4>
                      <div className="space-y-2 text-sm">
                        <p>Total Orders: <span className="font-medium">{selectedCustomer.totalOrders}</span></p>
                        <p>Total Spent: <span className="font-medium text-green-600">${selectedCustomer.totalSpent.toFixed(2)}</span></p>
                        <p>Loyalty Points: <span className="font-medium">{selectedCustomer.loyaltyPoints}</span></p>
                        <p>Last Order: <span className="font-medium">{new Date(selectedCustomer.lastOrder).toLocaleDateString()}</span></p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Favorite Items</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCustomer.favoriteItems.map((item, index) => (
                      <Badge key={index} variant="outline">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default CustomerManagement;

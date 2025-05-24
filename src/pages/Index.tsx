
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Users, TrendingUp, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-8">
              <span className="text-3xl">🍕</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Pizza Dashboard
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Manage your pizza orders, track deliveries, and monitor your business performance all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3">
                  Get Started
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-3">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything you need to manage your pizza business
          </h2>
          <p className="text-xl text-gray-600">
            Powerful features to streamline your operations and delight your customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: ShoppingCart,
              title: 'Order Management',
              description: 'Track and manage all pizza orders from a single dashboard with real-time updates.',
              color: 'bg-blue-500'
            },
            {
              icon: Users,
              title: 'Customer Insights',
              description: 'Get detailed insights about your customers and their ordering patterns.',
              color: 'bg-green-500'
            },
            {
              icon: TrendingUp,
              title: 'Analytics & Reports',
              description: 'Monitor your business performance with comprehensive analytics and reports.',
              color: 'bg-orange-500'
            },
            {
              icon: Shield,
              title: 'Secure & Reliable',
              description: 'Built with security in mind, ensuring your data is always protected.',
              color: 'bg-purple-500'
            }
          ].map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to streamline your pizza business?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Join thousands of pizza businesses already using our dashboard.
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="px-8 py-3">
              Start Your Journey
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;

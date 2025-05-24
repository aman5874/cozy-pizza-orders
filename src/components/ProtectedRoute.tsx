
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { PizzaLoader } from '@/components/ui/pizza-loader';
import { GlassCard } from '@/components/ui/glass-card';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pizza-50 via-orange-50 to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <GlassCard className="p-12 text-center max-w-md mx-auto">
          <div className="space-y-6">
            <div className="flex justify-center">
              <PizzaLoader size="lg" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-display font-semibold text-foreground">
                Welcome to PizzaFlow
              </h2>
              <p className="text-muted-foreground">
                Preparing your delicious dashboard...
              </p>
            </div>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-pizza-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-pizza-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-pizza-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </GlassCard>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

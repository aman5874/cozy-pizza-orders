
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedSkeleton } from '@/components/ui/enhanced-skeleton';

const PizzaOrdersLoadingSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <EnhancedSkeleton className="h-8 w-40" variant="shimmer" />
          <EnhancedSkeleton className="h-6 w-20" variant="shimmer" />
        </CardTitle>
        
        {/* Filters Skeleton */}
        <div className="flex flex-col sm:flex-row gap-4">
          <EnhancedSkeleton className="h-10 flex-1" variant="shimmer" />
          <EnhancedSkeleton className="h-10 w-32" variant="shimmer" />
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Desktop Table Skeleton */}
        <div className="hidden md:block">
          <div className="space-y-4">
            {/* Table Header */}
            <div className="flex space-x-4 pb-3 border-b border-border">
              {Array.from({ length: 7 }).map((_, i) => (
                <EnhancedSkeleton key={i} className="h-5 flex-1" variant="shimmer" />
              ))}
            </div>
            
            {/* Table Rows */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex space-x-4 py-3 border-b border-border/50">
                {Array.from({ length: 7 }).map((_, j) => (
                  <EnhancedSkeleton 
                    key={j} 
                    className="h-5 flex-1" 
                    variant="shimmer"
                    style={{ animationDelay: `${j * 0.1}s` }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Cards Skeleton */}
        <div className="md:hidden space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <EnhancedSkeleton className="h-6 w-20" variant="shimmer" />
                  <EnhancedSkeleton className="h-6 w-16" variant="shimmer" />
                </div>
                
                {Array.from({ length: 5 }).map((_, j) => (
                  <div key={j} className="flex justify-between items-center">
                    <EnhancedSkeleton className="h-4 w-16" variant="shimmer" />
                    <EnhancedSkeleton className="h-4 w-24" variant="shimmer" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PizzaOrdersLoadingSkeleton;

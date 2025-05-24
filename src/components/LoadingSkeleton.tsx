
import { EnhancedSkeleton } from "@/components/ui/enhanced-skeleton";
import { GlassCard } from "@/components/ui/glass-card";

export const DashboardSkeleton = () => (
  <div className="space-y-8 animate-fade-in">
    {/* Header Skeleton */}
    <GlassCard className="p-8">
      <EnhancedSkeleton className="h-10 w-80 mb-3" variant="shimmer" shape="rounded" />
      <EnhancedSkeleton className="h-6 w-96" variant="shimmer" />
    </GlassCard>

    {/* Stats Cards Skeleton */}
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <GlassCard key={i} className="p-6 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center space-x-4">
            <EnhancedSkeleton 
              className="h-14 w-14" 
              variant="pulse" 
              shape="circle" 
            />
            <div className="space-y-2 flex-1">
              <EnhancedSkeleton className="h-4 w-20" variant="shimmer" />
              <EnhancedSkeleton className="h-8 w-16" variant="shimmer" />
            </div>
          </div>
        </GlassCard>
      ))}
    </div>

    {/* Charts Skeleton */}
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {Array.from({ length: 2 }).map((_, i) => (
        <GlassCard key={i} className="p-6">
          <EnhancedSkeleton className="h-8 w-32 mb-6" variant="shimmer" shape="rounded" />
          <div className="space-y-4">
            <EnhancedSkeleton className="h-64 w-full" variant="wave" shape="rounded" />
          </div>
        </GlassCard>
      ))}
    </div>

    {/* Table Skeleton */}
    <GlassCard className="p-6">
      <EnhancedSkeleton className="h-8 w-40 mb-6" variant="shimmer" shape="rounded" />
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <EnhancedSkeleton className="h-12 w-12" shape="circle" variant="pulse" />
            <div className="flex-1 space-y-2">
              <EnhancedSkeleton className="h-4 w-24" variant="shimmer" />
              <EnhancedSkeleton className="h-3 w-32" variant="shimmer" />
            </div>
            <EnhancedSkeleton className="h-8 w-20" variant="shimmer" shape="rounded" />
          </div>
        ))}
      </div>
    </GlassCard>
  </div>
);

export const TableSkeleton = () => (
  <div className="space-y-6 animate-fade-in">
    <div className="flex justify-between items-center">
      <EnhancedSkeleton className="h-10 w-48" variant="shimmer" shape="rounded" />
      <EnhancedSkeleton className="h-12 w-32" variant="pulse" shape="rounded" />
    </div>
    
    <GlassCard className="overflow-hidden">
      {/* Table Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex space-x-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <EnhancedSkeleton key={i} className="h-5 w-24" variant="shimmer" />
          ))}
        </div>
      </div>
      
      {/* Table Rows */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="p-6 border-b border-white/5 last:border-b-0 hover:bg-white/5">
          <div className="flex space-x-6 items-center">
            {Array.from({ length: 5 }).map((_, j) => (
              <EnhancedSkeleton 
                key={j} 
                className="h-5 w-24" 
                variant="shimmer"
                style={{ animationDelay: `${j * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      ))}
    </GlassCard>
  </div>
);

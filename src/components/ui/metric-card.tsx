
import React, { useEffect, useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { GlassCard } from './glass-card';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: 'up' | 'down' | 'neutral';
  };
  icon?: LucideIcon;
  color?: 'pizza' | 'green' | 'blue' | 'purple' | 'amber';
  className?: string;
  animateValue?: boolean;
}

export const MetricCard = ({
  title,
  value,
  change,
  icon: Icon,
  color = 'pizza',
  className,
  animateValue = true,
}: MetricCardProps) => {
  const [displayValue, setDisplayValue] = useState(animateValue ? 0 : value);

  const colorClasses = {
    pizza: 'from-pizza-500 to-orange-500',
    green: 'from-green-500 to-emerald-500',
    blue: 'from-blue-500 to-cyan-500',
    purple: 'from-purple-500 to-violet-500',
    amber: 'from-amber-500 to-yellow-500',
  };

  const iconColorClasses = {
    pizza: 'text-pizza-500',
    green: 'text-green-500',
    blue: 'text-blue-500',
    purple: 'text-purple-500',
    amber: 'text-amber-500',
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return '↗️';
      case 'down':
        return '↘️';
      default:
        return '➡️';
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-muted-foreground';
    }
  };

  useEffect(() => {
    if (animateValue && typeof value === 'number') {
      const duration = 1500;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [value, animateValue]);

  return (
    <GlassCard className={cn("p-6 group", className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-2 flex-1">
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>
          <div className="flex items-baseline space-x-2">
            <p className="text-3xl font-bold font-display bg-gradient-to-r bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              <span className={`bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent`}>
                {animateValue && typeof value === 'number' ? displayValue : value}
              </span>
            </p>
            {change && (
              <div className={cn(
                "flex items-center space-x-1 text-sm font-medium px-2 py-1 rounded-full",
                "bg-white/10 backdrop-blur-sm",
                getTrendColor(change.trend)
              )}>
                <span>{getTrendIcon(change.trend)}</span>
                <span>{Math.abs(change.value)}%</span>
              </div>
            )}
          </div>
        </div>
        
        {Icon && (
          <div className={cn(
            "p-3 rounded-2xl transition-all duration-300",
            "bg-gradient-to-br from-white/10 to-white/5",
            "group-hover:scale-110 group-hover:rotate-6",
            "border border-white/20"
          )}>
            <Icon className={cn("h-6 w-6", iconColorClasses[color])} />
          </div>
        )}
      </div>
      
      {/* Animated bottom border */}
      <div className={cn(
        "absolute bottom-0 left-0 h-1 bg-gradient-to-r transition-all duration-700",
        "scale-x-0 group-hover:scale-x-100 origin-left",
        colorClasses[color]
      )} />
    </GlassCard>
  );
};

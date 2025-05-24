
import React, { useState } from 'react';
import { Bell, X, CheckCircle, AlertCircle, Info, Zap } from 'lucide-react';
import { GlassCard } from './glass-card';
import { PremiumButton } from './premium-button';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'pizza';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'pizza',
    title: 'New Order Alert!',
    message: 'Large Pepperoni Pizza ordered by John D.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
  },
  {
    id: '2',
    type: 'success',
    title: 'Daily Goal Achieved!',
    message: 'You\'ve reached your daily sales target of $2,500',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false,
  },
  {
    id: '3',
    type: 'warning',
    title: 'Low Stock Alert',
    message: 'Mozzarella cheese is running low (12 units left)',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: true,
  },
];

export const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'pizza':
        return <Zap className="h-5 w-5 text-pizza-500" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative h-12 w-12 rounded-2xl transition-all duration-300",
          "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md",
          "border border-white/20 shadow-glass",
          "hover:scale-110 hover:bg-white/20 hover:shadow-glow",
          "active:scale-95 group overflow-hidden"
        )}
      >
        <div className="relative z-10 flex items-center justify-center h-full">
          <Bell className="h-5 w-5 text-foreground transition-transform duration-300 group-hover:rotate-12" />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse-glow">
              <span className="text-xs font-bold text-white">{unreadCount}</span>
            </div>
          )}
        </div>
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 top-16 w-96 z-50 animate-scale-in">
          <GlassCard className="overflow-hidden max-h-96">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="font-semibold text-lg">Notifications</h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <PremiumButton
                    size="sm"
                    variant="glass"
                    onClick={markAllAsRead}
                  >
                    Mark all read
                  </PremiumButton>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-4 border-b border-white/5 last:border-b-0 cursor-pointer transition-all duration-200",
                      "hover:bg-white/5",
                      !notification.read && "bg-pizza-500/5 border-l-4 border-l-pizza-500"
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-sm text-foreground">
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-pizza-500 rounded-full ml-2 mt-1 animate-pulse" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {notification.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </GlassCard>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

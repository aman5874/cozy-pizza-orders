
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FABAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color?: string;
}

interface FloatingActionButtonProps {
  actions?: FABAction[];
  mainIcon?: React.ReactNode;
  mainAction?: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export const FloatingActionButton = ({
  actions = [],
  mainIcon = <Plus className="h-6 w-6" />,
  mainAction,
  position = 'bottom-right',
}: FloatingActionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = {
    'bottom-right': 'fixed bottom-6 right-6',
    'bottom-left': 'fixed bottom-6 left-6',
    'top-right': 'fixed top-6 right-6',
    'top-left': 'fixed top-6 left-6',
  };

  const handleMainClick = () => {
    if (actions.length > 0) {
      setIsOpen(!isOpen);
    } else {
      mainAction?.();
    }
  };

  return (
    <div className={cn(positionClasses[position], "z-50")}>
      <div className="relative">
        {/* Action buttons */}
        {actions.length > 0 && isOpen && (
          <div className="absolute bottom-16 right-0 space-y-3 animate-scale-in">
            {actions.map((action, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="bg-black/80 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {action.label}
                </span>
                <button
                  onClick={() => {
                    action.onClick();
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-12 h-12 rounded-full shadow-lg transition-all duration-300",
                    "bg-white dark:bg-gray-800 hover:scale-110 active:scale-95",
                    "flex items-center justify-center",
                    "hover:shadow-glow animate-float"
                  )}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {action.icon}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Main FAB */}
        <button
          onClick={handleMainClick}
          className={cn(
            "w-16 h-16 rounded-full shadow-float transition-all duration-300",
            "bg-gradient-to-r from-pizza-500 to-orange-500 text-white",
            "hover:scale-110 hover:shadow-glow-lg active:scale-95",
            "flex items-center justify-center group",
            "border-4 border-white/20"
          )}
        >
          <div className="transition-transform duration-300">
            {isOpen ? (
              <X className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90" />
            ) : (
              <div className="transition-transform duration-300 group-hover:rotate-180">
                {mainIcon}
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-xs -z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};


import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative h-10 w-10 rounded-lg transition-all duration-200",
        "bg-secondary hover:bg-accent",
        "border border-border",
        "hover:scale-105 active:scale-95"
      )}
    >
      <div className="flex items-center justify-center h-full">
        {theme === 'light' ? (
          <Moon className="h-4 w-4 text-foreground transition-transform duration-200" />
        ) : (
          <Sun className="h-4 w-4 text-foreground transition-transform duration-200" />
        )}
      </div>
      
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};

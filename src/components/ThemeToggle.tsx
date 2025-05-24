
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative h-12 w-12 rounded-2xl transition-all duration-300",
        "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md",
        "border border-white/20 shadow-glass",
        "hover:scale-110 hover:bg-white/20 hover:shadow-glow",
        "active:scale-95 group overflow-hidden"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
      
      <div className="relative z-10 flex items-center justify-center h-full">
        {theme === 'light' ? (
          <Moon className="h-5 w-5 text-slate-700 dark:text-slate-300 transition-transform duration-300 group-hover:rotate-12" />
        ) : (
          <Sun className="h-5 w-5 text-amber-500 transition-transform duration-300 group-hover:rotate-180 group-hover:scale-110" />
        )}
      </div>
      
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};

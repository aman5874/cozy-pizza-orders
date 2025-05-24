
import { cn } from "@/lib/utils"

interface PizzaLoaderProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export const PizzaLoader = ({ size = "md", className }: PizzaLoaderProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  }

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      {/* Pizza base */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 animate-pizza-spin">
        {/* Pizza toppings */}
        <div className="absolute top-2 left-2 w-2 h-2 bg-red-500 rounded-full opacity-80"></div>
        <div className="absolute top-3 right-2 w-1.5 h-1.5 bg-green-600 rounded-full opacity-80"></div>
        <div className="absolute bottom-2 left-3 w-1.5 h-1.5 bg-red-600 rounded-full opacity-80"></div>
        <div className="absolute bottom-3 right-3 w-2 h-2 bg-yellow-600 rounded-full opacity-80"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-500 rounded-full opacity-80"></div>
      </div>
      
      {/* Spinning ring */}
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-pizza-500 animate-spin"></div>
    </div>
  )
}

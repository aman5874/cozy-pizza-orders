
import * as React from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  blur?: "none" | "sm" | "md" | "lg" | "xl"
  opacity?: "low" | "medium" | "high"
  withBorder?: boolean
  withShadow?: boolean
  hover?: boolean
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ 
    className, 
    blur = "md", 
    opacity = "medium", 
    withBorder = true, 
    withShadow = true,
    hover = true,
    ...props 
  }, ref) => {
    const blurClasses = {
      none: "",
      sm: "backdrop-blur-sm",
      md: "backdrop-blur-md",
      lg: "backdrop-blur-lg",
      xl: "backdrop-blur-xl"
    }

    const opacityClasses = {
      low: "bg-white/5 dark:bg-black/5",
      medium: "bg-white/10 dark:bg-black/10",
      high: "bg-white/20 dark:bg-black/20"
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-3xl transition-all duration-300",
          blurClasses[blur],
          opacityClasses[opacity],
          withBorder && "border border-white/20 dark:border-white/10",
          withShadow && "shadow-glass",
          hover && "hover:bg-white/15 dark:hover:bg-black/15 hover:scale-[1.02] hover:shadow-glow",
          className
        )}
        {...props}
      />
    )
  }
)
GlassCard.displayName = "GlassCard"

export { GlassCard }

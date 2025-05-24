
import { cn } from "@/lib/utils"

interface EnhancedSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "shimmer" | "pulse"
  shape?: "rectangle" | "circle" | "rounded"
}

function EnhancedSkeleton({
  className,
  variant = "shimmer",
  shape = "rectangle",
  ...props
}: EnhancedSkeletonProps) {
  const shapeClasses = {
    rectangle: "rounded-md",
    circle: "rounded-full",
    rounded: "rounded-xl"
  }

  const variantClasses = {
    default: "bg-muted",
    shimmer: "bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer",
    pulse: "animate-pulse bg-muted"
  }

  return (
    <div
      className={cn(
        "transition-opacity duration-200",
        variantClasses[variant],
        shapeClasses[shape],
        className
      )}
      {...props}
    />
  )
}

export { EnhancedSkeleton }


import { cn } from "@/lib/utils"

interface EnhancedSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "shimmer" | "pulse" | "wave"
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
    rounded: "rounded-2xl"
  }

  const variantClasses = {
    default: "animate-pulse bg-muted",
    shimmer: "bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer",
    pulse: "animate-pulse bg-gradient-to-r from-muted to-muted/60",
    wave: "animate-bounce-gentle bg-muted"
  }

  return (
    <div
      className={cn(
        variantClasses[variant],
        shapeClasses[shape],
        className
      )}
      {...props}
    />
  )
}

export { EnhancedSkeleton }

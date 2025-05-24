
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const premiumButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-pizza-500 to-pizza-600 text-white shadow-lg hover:shadow-glow hover:scale-105 active:scale-95",
        glass: "bg-white/10 backdrop-blur-sm border border-white/20 text-foreground hover:bg-white/20 shadow-glass",
        neumorphism: "bg-background shadow-neumorphism hover:shadow-none active:shadow-inner",
        floating: "bg-white dark:bg-gray-800 shadow-float hover:shadow-glow hover:-translate-y-1",
        glow: "bg-gradient-to-r from-pizza-500 to-orange-500 text-white shadow-glow hover:shadow-glow-lg animate-pulse-glow",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-xl px-4",
        lg: "h-14 rounded-3xl px-8 text-base",
        icon: "h-12 w-12 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface PremiumButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof premiumButtonVariants> {
  asChild?: boolean
  withRipple?: boolean
}

const PremiumButton = React.forwardRef<HTMLButtonElement, PremiumButtonProps>(
  ({ className, variant, size, asChild = false, withRipple = true, onClick, ...props }, ref) => {
    const [ripples, setRipples] = React.useState<Array<{ x: number; y: number; id: number }>>([])
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (withRipple) {
        const rect = event.currentTarget.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        const newRipple = { x, y, id: Date.now() }
        
        setRipples(prev => [...prev, newRipple])
        
        setTimeout(() => {
          setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
        }, 600)
      }
      
      onClick?.(event)
    }

    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(premiumButtonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {withRipple && (
          <div className="absolute inset-0 overflow-hidden">
            {ripples.map((ripple) => (
              <div
                key={ripple.id}
                className="absolute w-1 h-1 bg-white/30 rounded-full animate-ripple"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                }}
              />
            ))}
          </div>
        )}
        <div className="relative z-10 flex items-center gap-2">
          {props.children}
        </div>
        {variant === "default" && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
        )}
      </Comp>
    )
  }
)
PremiumButton.displayName = "PremiumButton"

export { PremiumButton, premiumButtonVariants }

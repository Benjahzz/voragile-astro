
import { cn } from "@/libs/utils";
import { type VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import type { LucideIcon } from "lucide-react";


const buttonVariants = cva(
    "w-full flex items-center justify-center gap-1 rounded-sm px-4 py-2 transition-colors duration-200 z-10 relative disabled:cursor-not-allowed disabled:opacity-80",
    {
      variants: {
        variant: {
          default: "bg-primary text-white hover:bg-opacity-80",
          secondary:
            "bg-secondary text-colorText hover:opacity-80 hover:border-opacity-80 transition-opacity duration-200 border border-colorText  ",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    }
  )

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,VariantProps<typeof buttonVariants> {
    icon?: LucideIcon
}

const Button = forwardRef<HTMLButtonElement,ButtonProps>(({
    className,
    children,
    disabled,
    type = "button",
    variant,
    icon: Icon,
    ...props
},ref) => {
    return (
        <button ref={ref} className={cn(buttonVariants({variant,className}))} {...props} disabled={disabled}>
            {children}
        </button>
    )
})

Button.displayName = "Button"

export default Button;
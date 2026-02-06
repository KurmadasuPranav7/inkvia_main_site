import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-2 border-foreground shadow-comic hover:shadow-comic-lg hover:-translate-y-1 active:translate-y-0 active:shadow-comic-sm",
        destructive: "bg-destructive text-destructive-foreground border-2 border-foreground shadow-comic hover:shadow-comic-lg hover:-translate-y-1",
        outline: "border-2 border-foreground bg-background text-foreground shadow-comic-sm hover:bg-secondary hover:shadow-comic hover:-translate-y-1",
        secondary: "bg-secondary text-secondary-foreground border-2 border-foreground shadow-comic-sm hover:shadow-comic hover:-translate-y-1",
        ghost: "text-foreground hover:bg-secondary hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        comic: "bg-comic-yellow text-foreground border-2 border-foreground shadow-comic font-bold hover:shadow-comic-lg hover:-translate-y-1 active:translate-y-0 active:shadow-comic-sm",
        accent: "bg-accent text-accent-foreground border-2 border-foreground shadow-comic hover:shadow-comic-lg hover:-translate-y-1",
        mint: "bg-comic-mint text-foreground border-2 border-foreground shadow-comic hover:shadow-comic-lg hover:-translate-y-1",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

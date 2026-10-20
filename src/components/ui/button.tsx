import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-main focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer select-none",
  {
    variants: {
      variant: {
        // NOL 1차 버튼: primary-main (#4154FF) -> hover #2432AD
        primary:
          "bg-primary-main text-static-white hover:bg-primary-presshover active:bg-primary-presshover shadow-sm",
        default:
          "bg-primary-main text-static-white hover:bg-primary-presshover active:bg-primary-presshover shadow-sm",
        // NOL 2차 버튼: primary-weak (#F5F6FF) 면 + primary-main 글자
        secondary:
          "bg-primary-weak text-primary-main hover:bg-primary-weak1 active:bg-primary-weak1",
        // NOL 아웃라인: 1px neutral-weak2/3 선
        outline:
          "border border-neutral-weak2 bg-static-white text-neutral-main hover:bg-neutral-weak1 hover:border-neutral-weak3",
        ghost:
          "text-neutral-main hover:bg-neutral-weak1 hover:text-neutral-main",
        // 알약형 칩 / 배너 CTA
        pill:
          "rounded-full bg-primary-weak text-primary-main border border-primary-weak2 hover:bg-primary-weak1",
        neutralPill:
          "rounded-full bg-neutral-weak text-neutral-main hover:bg-neutral-weak1",
        link:
          "text-primary-main underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 rounded-[12px] text-sm",
        sm: "h-9 px-3.5 rounded-[8px] text-xs font-medium",
        lg: "h-12 px-6 rounded-[16px] text-base font-bold",
        xl: "h-14 px-8 rounded-[16px] text-base font-bold",
        icon: "h-10 w-10 rounded-[12px]",
        iconSm: "h-8 w-8 rounded-[8px]",
        pill: "h-9 px-4 rounded-full text-xs font-semibold",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

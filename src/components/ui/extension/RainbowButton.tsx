"use client";

import React, { useState } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const rainbowButtonVariants = cva(
    cn(
        "relative cursor-pointer group transition-all overflow-hidden",
        "inline-flex items-center justify-center gap-2 shrink-0",
        "rounded-full outline-none focus-visible:ring-[3px] aria-invalid:border-destructive",
        "text-sm font-medium whitespace-nowrap",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0"
    ),
    {
        variants: {
            variant: {
                default:
                    "border-0 bg-[#0c0a09] text-primary-foreground [border:calc(0.125rem)_solid_transparent]",
                outline:
                    "border border-input bg-background text-accent-foreground",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-full px-3 text-xs",
                lg: "h-11 rounded-full px-8",
                icon: "size-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

interface RainbowButtonProps
    extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof rainbowButtonVariants> {
    asChild?: boolean
}

const RainbowButton = React.forwardRef<HTMLButtonElement, RainbowButtonProps>(
    ({ className, variant, size, asChild = false, children, ...props }, ref) => {
        const [isHovered, setIsHovered] = useState(false);
        const [isActive, setIsActive] = useState(false);
        const Comp = asChild ? Slot : "button"

        return (
            <Comp
                data-slot="button"
                className={cn(rainbowButtonVariants({ variant, size, className }))}
                ref={ref}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => { setIsHovered(false); setIsActive(false); }}
                onMouseDown={() => setIsActive(true)}
                onMouseUp={() => setIsActive(false)}
                {...props}
            >
                {/* Rainbow border gradient - spinning conic gradient */}
                <span
                    className={cn(
                        "absolute inset-0 rounded-full transition-opacity duration-500 pointer-events-none",
                        isHovered ? "opacity-80" : "opacity-0"
                    )}
                    style={{
                        padding: "2px",
                        background: isHovered
                            ? "conic-gradient(from 0deg, #F5A623, #D97706, #B45309, #F5A623, #D97706, #B45309, #F5A623)"
                            : "transparent",
                    }}
                >
                    <span
                        className={cn(
                            "absolute inset-0 rounded-full animate-[spin_4s_linear_infinite]",
                            !isHovered && "hidden"
                        )}
                        style={{
                            background: "conic-gradient(from 0deg, #F5A623, #D97706, #B45309, #F5A623, #D97706, #B45309, #F5A623)",
                        }}
                    />
                    <span className="relative block h-full w-full rounded-full bg-[#0c0a09] z-10" />
                </span>

                {/* Enhanced Hover glow effect */}
                <span
                    className={cn(
                        "absolute -inset-1 rounded-full opacity-0 blur-xl transition-all duration-700 pointer-events-none",
                        "bg-[conic-gradient(from_0deg,#F5A623,#D97706,#B45309,#F5A623,#D97706,#B45309,#F5A623)]",
                        isHovered ? "opacity-20 scale-110" : "opacity-0 scale-100"
                    )}
                />

                {/* Content */}
                <span
                    className={cn(
                        "relative z-10 transition-transform duration-200",
                        isHovered && "scale-105",
                        isActive && "scale-95"
                    )}
                >
                    {children}
                </span>
            </Comp>
        )
    }
)

RainbowButton.displayName = "RainbowButton"

export { RainbowButton, rainbowButtonVariants, type RainbowButtonProps }

"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Search } from "lucide-react";

export interface SmartInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    containerClassName?: string;
    icon?: React.ReactNode;
}

export const SmartInput = React.forwardRef<HTMLInputElement, SmartInputProps>(
    ({ className, containerClassName, icon, ...props }, ref) => {
        const [focused, setFocused] = useState(false);

        return (
            <div
                className={cn(
                    "relative flex items-center w-full max-w-md mx-auto transition-all duration-300 ease-out",
                    focused ? "scale-105" : "scale-100",
                    containerClassName
                )}
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full bg-gradient-to-r from-balisan-amber/20 to-purple-500/20 blur-lg transition-opacity duration-300",
                        focused ? "opacity-100" : "opacity-0"
                    )}
                />
                <div className="relative w-full">
                    <input
                        ref={ref}
                        type="text"
                        className={cn(
                            "w-full px-5 py-3 pl-12 rounded-full border-2 border-transparent bg-white/5 backdrop-blur-md",
                            "text-foreground placeholder:text-muted-foreground/50",
                            "focus:outline-none focus:border-balisan-amber/50 focus:bg-white/10",
                            "shadow-[0_0_20px_-10px_rgba(0,0,0,0.1)] transition-all duration-300",
                            "hover:bg-white/10",
                            className
                        )}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        {...props}
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {icon || <Search className="w-5 h-5" />}
                    </div>
                </div>
            </div>
        );
    }
);

SmartInput.displayName = "SmartInput";

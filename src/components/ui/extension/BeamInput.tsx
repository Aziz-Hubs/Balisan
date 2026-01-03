"use client";

import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { BorderBeam } from "@/components/ui/extension/BorderBeam"

export interface BeamInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    containerClassName?: string
    beamClassName?: string
}

const BeamInput = React.forwardRef<HTMLInputElement, BeamInputProps>(
    ({ className, containerClassName, beamClassName, ...props }, ref) => {
        const [isFocused, setIsFocused] = React.useState(false)

        return (
            <div className={cn("relative group", containerClassName)}>
                <Input
                    ref={ref}
                    className={cn(
                        "border-zinc-200 dark:border-zinc-800 transition-colors focus:border-transparent dark:focus:border-transparent",
                        className
                    )}
                    onFocus={(e) => {
                        setIsFocused(true)
                        props.onFocus?.(e)
                    }}
                    onBlur={(e) => {
                        setIsFocused(false)
                        props.onBlur?.(e)
                    }}
                    {...props}
                />
                {isFocused && (
                    <div className="absolute inset-0 rounded-md pointer-events-none overflow-hidden">
                        <BorderBeam
                            className={cn("from-amber-500 via-yellow-500 to-transparent", beamClassName)}
                            duration={3}
                            size={300}
                        />
                    </div>
                )}
            </div>
        )
    }
)
BeamInput.displayName = "BeamInput"

export { BeamInput }

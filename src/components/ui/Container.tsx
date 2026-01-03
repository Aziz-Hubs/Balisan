import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface ContainerProps {
    children: ReactNode
    className?: string
    clean?: boolean
}

export function Container({ children, className, clean = false }: ContainerProps) {
    return (
        <div
            className={cn(
                "mx-auto w-full max-w-7xl",
                !clean && "px-4 sm:px-6 lg:px-8",
                className
            )}
        >
            {children}
        </div>
    )
}

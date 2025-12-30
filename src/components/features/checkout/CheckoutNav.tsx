"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Check, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
    { label: "Information", href: "/checkout/information" },
    { label: "Shipping", href: "/checkout/shipping" },
    { label: "Payment", href: "/checkout/payment" },
    { label: "Success", href: "/checkout/confirmation" },
]

export function CheckoutNav() {
    const pathname = usePathname()
    const currentStepIndex = steps.findIndex(step => pathname.includes(step.href))

    return (
        <nav className="flex items-center justify-center space-x-2 md:space-x-8 mb-12">
            {steps.map((step, index) => {
                const isCompleted = index < currentStepIndex
                const isActive = index === currentStepIndex

                return (
                    <div key={step.label} className="flex items-center">
                        <div className="flex items-center gap-2 group">
                            <div className={cn(
                                "h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                                isCompleted ? "bg-primary text-white" :
                                    isActive ? "bg-primary text-white ring-4 ring-primary/20" :
                                        "bg-muted text-muted-foreground"
                            )}>
                                {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                            </div>
                            <span className={cn(
                                "hidden md:inline font-medium text-sm transition-colors",
                                isActive ? "text-primary" : "text-muted-foreground"
                            )}>
                                {step.label}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <ChevronRight className="h-4 w-4 ml-2 md:ml-8 text-muted-foreground/30" />
                        )}
                    </div>
                )
            })}
        </nav>
    )
}

"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Package, Truck, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Confetti } from "@/components/ui/confetti"

export default function ConfirmationPage() {
    return (
        <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <Confetti manualstart={false} />

            <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>

            <div className="space-y-3">
                <h1 className="text-4xl font-display font-bold">Cheers to that!</h1>
                <p className="text-xl text-muted-foreground">Order #BAL-2025-0842 has been placed successfully.</p>
            </div>

            <p className="max-w-md text-muted-foreground leading-relaxed">
                We've sent a confirmation email to <span className="text-foreground font-medium">email@example.com</span> with your order details and tracking link.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg mt-8">
                <div className="p-6 border rounded-2xl bg-muted/30 text-left space-y-3">
                    <div className="flex items-center gap-2 text-primary">
                        <Package className="h-5 w-5" />
                        <span className="font-bold">Preparation</span>
                    </div>
                    <p className="text-sm text-muted-foreground italic">Expected within 30 mins</p>
                </div>
                <div className="p-6 border rounded-2xl bg-muted/30 text-left space-y-3">
                    <div className="flex items-center gap-2 text-primary">
                        <Truck className="h-5 w-5" />
                        <span className="font-bold">Delivery</span>
                    </div>
                    <p className="text-sm text-muted-foreground italic">Arriving in ~90 mins</p>
                </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="h-12 px-8" asChild>
                    <Link href="/shop">
                        Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-8" asChild>
                    <Link href="/account/orders">
                        View Order History
                    </Link>
                </Button>
            </div>
        </div>
    )
}

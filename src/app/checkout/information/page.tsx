"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function InformationPage() {
    const router = useRouter()

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section className="space-y-4">
                <h3 className="text-xl font-bold">Contact Information</h3>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="email@example.com" />
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="marketing" />
                    <Label htmlFor="marketing" className="text-sm text-muted-foreground font-normal">
                        Keep me up to date on news and exclusive offers
                    </Label>
                </div>
            </section>

            <section className="space-y-4">
                <h3 className="text-xl font-bold">Shipping Address</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="First Name" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Last Name" />
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="Street Address" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                    <Input id="apartment" placeholder="Apt, Suite, Unit" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="City" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" placeholder="State/Province" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" placeholder="ZIP" />
                    </div>
                </div>
            </section>

            <div className="flex items-center justify-between pt-6">
                <Button variant="ghost" asChild>
                    <Link href="/cart">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Return to Cart
                    </Link>
                </Button>
                <Button size="lg" onClick={() => router.push("/checkout/shipping")} className="h-12 px-8">
                    Continue to Shipping
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

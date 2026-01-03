"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, Truck, Zap, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useCheckoutStore } from "@/lib/stores/checkout"

const shippingMethods = [
    { id: "standard", label: "Standard Shipping", price: 0, time: "3-5 business days", icon: Truck },
    { id: "express", label: "Express Shipping", price: 15, time: "1-2 business days", icon: Zap },
    { id: "local", label: "Local Pickup", price: 0, time: "Available in 2 hours", icon: ShoppingBag },
]

export default function ShippingPage() {
    const router = useRouter()
    const { contactInfo, shippingAddress, shippingMethod, setShippingMethod } = useCheckoutStore()
    const [selectedMethod, setSelectedMethod] = React.useState(shippingMethod.id)

    const handleContinue = () => {
        const method = shippingMethods.find(m => m.id === selectedMethod)
        if (method) {
            setShippingMethod({ id: method.id, price: method.price })
            router.push("/checkout/payment")
        }
    }

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section className="border rounded-2xl p-6 bg-background space-y-4">
                <div className="flex justify-between items-center pb-4 border-b">
                    <div className="text-sm">
                        <span className="text-muted-foreground mr-4">Contact</span>
                        <span className="font-medium text-foreground">{contactInfo.email || "email@example.com"}</span>
                    </div>
                    <Link href="/checkout/information" className="text-xs font-bold text-primary hover:underline uppercase tracking-wider">Change</Link>
                </div>
                <div className="flex justify-between items-center pt-2">
                    <div className="text-sm">
                        <span className="text-muted-foreground mr-4">Ship to</span>
                        <span className="font-medium text-foreground">
                            {shippingAddress.address ?
                                `${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.zip}` :
                                "123 Luxury Ave, CA 90210..."}
                        </span>
                    </div>
                    <Link href="/checkout/information" className="text-xs font-bold text-primary hover:underline uppercase tracking-wider">Change</Link>
                </div>
            </section>

            <section className="space-y-6">
                <div className="flex flex-col">
                    <h3 className="text-xl font-bold">Shipping Method</h3>
                    <p className="text-sm text-muted-foreground mt-1">Select your preferred delivery speed.</p>
                </div>

                <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="grid gap-4">
                    {shippingMethods.map((method) => (
                        <Label
                            key={method.id}
                            htmlFor={method.id}
                            className={`flex items-center justify-between p-6 border-2 rounded-2xl cursor-pointer transition-all ${selectedMethod === method.id ? "border-primary bg-primary/5 ring-4 ring-primary/10" : "hover:border-muted-foreground/30"
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${selectedMethod === method.id ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                                    }`}>
                                    <method.icon className="h-5 w-5" />
                                </div>
                                <div className="space-y-1">
                                    <p className="font-bold">{method.label}</p>
                                    <p className="text-xs text-muted-foreground">{method.time}</p>
                                </div>
                            </div>
                            <span className="font-bold text-primary">
                                {method.price === 0 ? "FREE" : `$${method.price.toFixed(2)}`}
                            </span>
                        </Label>
                    ))}
                </RadioGroup>
            </section>

            <div className="flex items-center justify-between pt-6">
                <Button variant="ghost" asChild>
                    <Link href="/checkout/information">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Information
                    </Link>
                </Button>
                <Button size="lg" onClick={handleContinue} className="h-12 px-8">
                    Continue to Payment
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

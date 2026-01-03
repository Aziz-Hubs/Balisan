"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useCheckoutStore } from "@/lib/stores/checkout"
import { useCartStore, selectSubtotal } from "@/lib/stores/cart"
import { PaymentForm } from "@/components/features/checkout/PaymentForm"
import { createOrder } from "@/actions/checkout"
import { toast } from "sonner"
import { formatPrice } from "@/lib/utils"

export default function PaymentPage() {
    const router = useRouter()
    const [isProcessing, setIsProcessing] = React.useState(false)
    const [isPaymentValid, setIsPaymentValid] = React.useState(false)

    const { contactInfo, shippingAddress, shippingMethod, resetCheckout } = useCheckoutStore()
    const { items, clearCart } = useCartStore()
    const subtotal = useCartStore(selectSubtotal)

    // Derived State
    const shippingCost = shippingMethod.price
    const tax = subtotal * 0.16 // Jordan Sales Tax 16%
    const total = subtotal + shippingCost + tax

    const handleCompleteOrder = async () => {
        if (!isPaymentValid) {
            toast.error("Please enter valid payment details.")
            return
        }

        setIsProcessing(true)

        try {
            const result = await createOrder({
                items,
                shippingAddress,
                billingAddress: shippingAddress, // Default to shipping for now
                paymentStatus: 'paid',
                subtotal,
                shippingCost,
                tax,
                total
            })

            if (result.success && result.orderId) {
                clearCart()
                resetCheckout()
                toast.success("Order placed successfully!")
                router.push("/checkout/confirmation")
            } else {
                toast.error("Failed to process order. Please try again.")
            }
        } catch (error) {
            console.error(error)
            toast.error("An unexpected error occurred.")
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section className="border rounded-2xl p-6 bg-background space-y-4">
                <div className="flex justify-between items-center pb-4 border-b">
                    <div className="text-sm">
                        <span className="text-muted-foreground mr-4">Contact</span>
                        <span className="font-medium text-foreground">{contactInfo.email || "email@example.com"}</span>
                    </div>
                    <Link href="/checkout/information" className="text-xs font-bold text-primary hover:underline uppercase tracking-wider">Change</Link>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                    <div className="text-sm">
                        <span className="text-muted-foreground mr-4">Ship to</span>
                        <span className="font-medium text-foreground">
                            {shippingAddress.address ?
                                `${shippingAddress.address}, ${shippingAddress.city}` :
                                "123 Luxury Ave..."}
                        </span>
                    </div>
                    <Link href="/checkout/information" className="text-xs font-bold text-primary hover:underline uppercase tracking-wider">Change</Link>
                </div>
                <div className="flex justify-between items-center pt-2">
                    <div className="text-sm">
                        <span className="text-muted-foreground mr-4">Method</span>
                        <span className="font-medium text-foreground">
                            {shippingMethod.id === 'standard' ? 'Standard Shipping • FREE' :
                                shippingMethod.id === 'express' ? 'Express Shipping • $15.00' :
                                    'Local Pickup • FREE'}
                        </span>
                    </div>
                    <Link href="/checkout/shipping" className="text-xs font-bold text-primary hover:underline uppercase tracking-wider">Change</Link>
                </div>
            </section>

            <section className="space-y-6">
                <div className="flex flex-col">
                    <h3 className="text-xl font-bold">Payment</h3>
                    <p className="text-sm text-muted-foreground mt-1">All transactions are secure and encrypted.</p>
                </div>

                <PaymentForm onChange={setIsPaymentValid} />
            </section>

            <section className="bg-muted/30 p-4 rounded-xl space-y-2 lg:hidden">
                <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span>Tax (16%)</span>
                    <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                </div>
            </section>

            <div className="flex items-center justify-between pt-6">
                <Button variant="ghost" asChild disabled={isProcessing}>
                    <Link href="/checkout/shipping">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Shipping
                    </Link>
                </Button>
                <Button
                    size="lg"
                    onClick={handleCompleteOrder}
                    className="h-12 px-8 min-w-[200px]"
                    disabled={isProcessing || !isPaymentValid}
                >
                    {isProcessing ? "Processing..." : `Pay ${formatPrice(total)}`}
                    {!isProcessing && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
            </div>
        </div>
    )
}

"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Lock, CreditCard } from "lucide-react"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const paymentSchema = z.object({
    name: z.string().min(2, "Cardholder name is required"),
    number: z.string()
        .min(19, "Card number must be 16 digits") // 16 digits + 3 spaces
        .max(19, "Card number must be 16 digits"),
    expiry: z.string()
        .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Invalid expiry date (MM/YY)"),
    cvv: z.string()
        .min(3, "CVV must be 3 digits")
        .max(4, "CVV must be 3 or 4 digits"),
})

type PaymentFormValues = z.infer<typeof paymentSchema>

interface PaymentFormProps {
    onChange: (valid: boolean) => void
}

export function PaymentForm({ onChange }: PaymentFormProps) {
    const form = useForm<PaymentFormValues>({
        resolver: zodResolver(paymentSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            number: "",
            expiry: "",
            cvv: "",
        },
    })

    // Propagate validity to parent
    React.useEffect(() => {
        const subscription = form.watch(() => {
            // We use a small timeout to allow validator to run after value change
            // Or rely on formState.isValid. However, isValid inside watch or effect updates lazily.
            // Let's rely on form.formState.isValid but ensure we trigger it.
        })
        return () => subscription.unsubscribe()
    }, [form.watch])

    // Specific effect to report validity
    const { isValid } = form.formState
    React.useEffect(() => {
        onChange(isValid)
    }, [isValid, onChange])


    // Input formatters
    const formatCardNumber = (value: string) => {
        return value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().substring(0, 19)
    }

    const formatExpiry = (value: string) => {
        return value.replace(/\D/g, '').replace(/^(\d{2})(\d{0,2})/, '$1/$2').trim().substring(0, 5)
    }

    const formatCVV = (value: string) => {
        return value.replace(/\D/g, '').substring(0, 4)
    }

    return (
        <Form {...form}>
            <form className="border rounded-2xl overflow-hidden bg-background/50 backdrop-blur-sm shadow-sm transition-all hover:shadow-md">
                <div className="bg-muted/30 p-4 border-b flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-primary" />
                        <span className="font-bold text-sm">Card Details</span>
                    </div>
                    <div className="flex gap-2 opacity-80">
                        {/* Brand Icons Simulation */}
                        <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center text-[10px] bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-sm">VISA</div>
                        <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center text-[10px] bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-sm">MC</div>
                    </div>
                </div>

                <div className="p-6 space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cardholder Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="John Doe"
                                        {...field}
                                        className="bg-transparent"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Card Number</FormLabel>
                                <div className="relative">
                                    <FormControl>
                                        <Input
                                            placeholder="0000 0000 0000 0000"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(formatCardNumber(e.target.value))
                                            }}
                                            className="bg-transparent pl-10"
                                        />
                                    </FormControl>
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 bg-primary/10 rounded-full flex items-center justify-center pointer-events-none">
                                        <Lock className="h-3 w-3 text-primary" />
                                    </div>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="expiry"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Expiration (MM/YY)</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="MM / YY"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(formatExpiry(e.target.value))
                                            }}
                                            className="bg-transparent"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="cvv"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CVV</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="123"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(formatCVV(e.target.value))
                                            }}
                                            className="bg-transparent"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="p-4 bg-muted/20 border-t text-xs text-center text-muted-foreground flex items-center justify-center gap-2">
                    <Lock className="w-3 h-3" />
                    <p>Secured by <strong>Tap Payments</strong> (Simulated)</p>
                </div>
            </form>
        </Form>
    )
}

"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useCheckoutStore } from "@/lib/stores/checkout"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    marketingConsent: z.boolean(),
    firstName: z.string().min(2, { message: "First name is required." }),
    lastName: z.string().min(2, { message: "Last name is required." }),
    address: z.string().min(5, { message: "Address is required." }),
    apartment: z.string().optional(),
    city: z.string().min(2, { message: "City is required." }),
    state: z.string().min(2, { message: "State/Province is required." }),
    zip: z.string().min(4, { message: "ZIP code is required." }),
})

export default function InformationPage() {
    const router = useRouter()
    const { contactInfo, shippingAddress, setContactInfo, setShippingAddress } = useCheckoutStore()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: contactInfo.email,
            marketingConsent: contactInfo.marketingConsent ?? false,
            firstName: shippingAddress.firstName,
            lastName: shippingAddress.lastName,
            address: shippingAddress.address,
            apartment: shippingAddress.apartment,
            city: shippingAddress.city,
            state: shippingAddress.state,
            zip: shippingAddress.zip,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setContactInfo({
            email: values.email,
            marketingConsent: values.marketingConsent
        })
        setShippingAddress({
            firstName: values.firstName,
            lastName: values.lastName,
            address: values.address,
            apartment: values.apartment,
            city: values.city,
            state: values.state,
            zip: values.zip,
            country: 'JO'
        })
        router.push("/checkout/shipping")
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <section className="space-y-4">
                        <h3 className="text-xl font-bold">Contact Information</h3>
                        <div className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="email@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="marketingConsent"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-2 space-y-0 text-sm text-muted-foreground font-normal">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel>
                                        Keep me up to date on news and exclusive offers
                                    </FormLabel>
                                </FormItem>
                            )}
                        />
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-bold">Shipping Address</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="First Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Last Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Street Address" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="apartment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Apartment, suite, etc. (optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Apt, Suite, Unit" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input placeholder="City" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>State</FormLabel>
                                        <FormControl>
                                            <Input placeholder="State/Province" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="zip"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ZIP Code</FormLabel>
                                        <FormControl>
                                            <Input placeholder="ZIP" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </section>

                    <div className="flex items-center justify-between pt-6">
                        <Button variant="ghost" asChild type="button">
                            <Link href="/cart">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Return to Cart
                            </Link>
                        </Button>
                        <Button size="lg" type="submit" className="h-12 px-8">
                            Continue to Shipping
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

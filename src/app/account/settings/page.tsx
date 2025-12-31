"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useAuthStore } from "@/lib/stores/auth"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Separator } from "@/components/ui/separator"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

// Zod Schema
const profileSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters."),
    lastName: z.string().min(2, "Last name must be at least 2 characters."),
    email: z.string().email(),
    phone: z.string().min(10, "Phone number must be at least 10 digits."),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export default function SettingsPage() {
    const { user } = useAuthStore()

    // Default values derivation
    const defaultValues: Partial<ProfileFormValues> = {
        email: user?.email || "",
        firstName: user?.name ? user.name.split(" ")[0] : "",
        lastName: user?.name ? user.name.split(" ").slice(1).join(" ") : "",
        phone: "",
    }

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues,
        mode: "onChange",
    })

    // Reset form when user loads
    useEffect(() => {
        if (user) {
            form.reset({
                email: user.email,
                firstName: user.name.split(" ")[0],
                lastName: user.name.split(" ").slice(1).join(" ") || "",
                phone: "", // We don't store phone yet
            })
        }
    }, [user, form])

    async function onSubmit(data: ProfileFormValues) {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        toast.success("Profile updated", {
            description: "Your personal details have been saved successfully.",
        })
        console.log("Updated Profile:", data)
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Account Settings</h3>
                <p className="text-sm text-muted-foreground">
                    Update your personal information and preferences.
                </p>
            </div>
            <Separator />

            <Card>
                <CardHeader>
                    <CardTitle>Personal Details</CardTitle>
                    <CardDescription>
                        Manage your name and contact information.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid gap-4 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="John"
                                                    {...field}
                                                    className="focus-visible:ring-amber-500"
                                                />
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
                                                <Input
                                                    placeholder="Doe"
                                                    {...field}
                                                    className="focus-visible:ring-amber-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="john.doe@example.com"
                                                    {...field}
                                                    disabled
                                                    className="bg-muted text-muted-foreground"
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Contact support to change your email address.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="+1 (555) 000-0000"
                                                    {...field}
                                                    className="focus-visible:ring-amber-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    className="bg-amber-600 hover:bg-amber-700 text-white"
                                    disabled={form.formState.isSubmitting}
                                >
                                    {form.formState.isSubmitting && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
